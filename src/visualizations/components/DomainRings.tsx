"use client";

import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore, type MouseEvent } from "react";
import { useReducedMotion } from "@/hooks";
import type { Domain } from "@/curriculum/metadata";
import { cn } from "@/lib";

export interface DomainRing {
  domain: Domain;
  label: string;
  /** Shown on hover/focus, never the only way the description is available. */
  description: string;
  href: string;
  /** Named in the accessible label so the nesting is not carried by the picture alone. */
  containsLabel?: string;
}

export interface DomainRingsProps {
  rings: DomainRing[];
  className?: string;
}

/**
 * The AI ⊃ ML ⊃ DL hierarchy drawn as containment rather than as a sequence:
 * each field literally sits inside the one it is a part of.
 *
 * The rings are siblings, not nested elements — a button cannot contain a
 * button. Stacking order does the work instead: each smaller ring is painted
 * over the larger one, and because border-radius clips hit-testing, a click
 * lands on the innermost ring under the pointer. That reproduces the nesting
 * for the mouse without nesting the markup.
 *
 * Each ring is a real link: it works with JavaScript disabled, opens in a new
 * tab on a modified click, and only intercepts a plain click to run a short
 * exit animation first — navigation itself is never blocked on that
 * animation finishing.
 */

// Diameter as a share of the outer ring, and where each label sits within its
// own band. Written out rather than computed so the bands stay legible.
const RING_GEOMETRY = [
  { size: "100%", labelTop: "7%", depth: 4 },
  { size: "68%", labelTop: "10%", depth: 7 },
  { size: "40%", labelTop: "50%", depth: 11 },
] as const;

const ringStyles: Record<Domain, string> = {
  ai: "border-ai/25 bg-ai/[0.04] hover:border-ai/50 hover:bg-ai/[0.07]",
  ml: "border-ml/25 bg-ml/[0.05] hover:border-ml/50 hover:bg-ml/[0.09]",
  dl: "border-dl/30 bg-dl/[0.07] hover:border-dl/55 hover:bg-dl/[0.12]",
  math: "",
  data: "",
  genai: "",
  responsible: "",
  mlops: "",
  research: "",
};

const labelStyles: Record<Domain, string> = {
  ai: "text-ai-text",
  ml: "text-ml-text",
  dl: "text-dl-text",
  math: "",
  data: "",
  genai: "",
  responsible: "",
  mlops: "",
  research: "",
};

/** How long the exit animation plays before the route actually changes. */
const EXIT_SECONDS = 0.22;

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeToHoverSupport(callback: () => void) {
  const query = window.matchMedia(HOVER_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getHoverSupport() {
  return window.matchMedia(HOVER_QUERY).matches;
}

/**
 * `useSyncExternalStore` rather than an effect that calls `setState`: the
 * parallax this gates on is unavailable during SSR (no `window`), and a
 * false-then-true render there is exactly what this hook exists to do
 * without a hydration mismatch or a cascading render.
 */
function useSupportsHover() {
  return useSyncExternalStore(
    subscribeToHoverSupport,
    getHoverSupport,
    () => false,
  );
}

interface RingLinkProps {
  ring: DomainRing;
  geometry: (typeof RING_GEOMETRY)[number];
  isInnermost: boolean;
  isHovered: boolean;
  isLeaving: boolean;
  isObscured: boolean;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  onHoverChange: (domain: Domain | null) => void;
  onNavigate: (domain: Domain) => void;
}

function RingLink({
  ring,
  geometry,
  isInnermost,
  isHovered,
  isLeaving,
  isObscured,
  pointerX,
  pointerY,
  onHoverChange,
  onNavigate,
}: RingLinkProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const x = useTransform(pointerX, (value) => value * geometry.depth);
  const y = useTransform(pointerY, (value) => value * geometry.depth);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      reducedMotion ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    onNavigate(ring.domain);
    window.setTimeout(() => router.push(ring.href), EXIT_SECONDS * 1000);
  }

  return (
    <motion.div
      style={{
        width: geometry.size,
        height: geometry.size,
        x: reducedMotion ? 0 : x,
        y: reducedMotion ? 0 : y,
      }}
      animate={
        isLeaving
          ? { scale: 1.05, opacity: 0 }
          : isObscured
            ? { scale: 0.98, opacity: 0.3 }
            : { scale: 1, opacity: 1 }
      }
      transition={{ duration: EXIT_SECONDS }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Link
        href={ring.href}
        onClick={handleClick}
        onMouseEnter={() => onHoverChange(ring.domain)}
        onMouseLeave={() => onHoverChange(null)}
        onFocus={() => onHoverChange(ring.domain)}
        onBlur={() => onHoverChange(null)}
        aria-label={
          ring.containsLabel
            ? `${ring.label}, which contains ${ring.containsLabel}`
            : ring.label
        }
        className={cn(
          "focus-ring absolute inset-0 block cursor-pointer rounded-full border",
          "duration-fast ease-smooth transition-colors",
          "motion-safe:transition-transform motion-safe:hover:scale-[1.012] motion-safe:active:scale-[0.994]",
          ringStyles[ring.domain],
        )}
      >
        <span
          style={{ top: geometry.labelTop }}
          className={cn(
            "absolute left-1/2 flex -translate-x-1/2 items-center gap-1",
            isInnermost && "-translate-y-1/2",
            "text-center text-sm font-medium tracking-tight sm:text-base",
            labelStyles[ring.domain],
          )}
        >
          {ring.label}
          <ArrowUpRight
            aria-hidden
            className={cn(
              "size-3.5 opacity-0 transition-opacity duration-150",
              isHovered && "opacity-70",
            )}
          />
        </span>
      </Link>
    </motion.div>
  );
}

export function DomainRings({ rings, className }: DomainRingsProps) {
  const [hovered, setHovered] = useState<Domain | null>(null);
  const [leaving, setLeaving] = useState<Domain | null>(null);
  const supportsHover = useSupportsHover();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
    if (!supportsHover) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const activeDescription = rings.find(
    (r) => r.domain === hovered,
  )?.description;

  return (
    <div className={cn("space-y-6", className)}>
      <div
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="relative mx-auto aspect-square w-full max-w-[min(86vw,34rem)]"
      >
        {rings.map((ring, index) => {
          const geometry = RING_GEOMETRY[index] ?? RING_GEOMETRY.at(-1)!;

          return (
            <RingLink
              key={ring.domain}
              ring={ring}
              geometry={geometry}
              isInnermost={index === rings.length - 1}
              isHovered={hovered === ring.domain}
              isLeaving={leaving === ring.domain}
              isObscured={leaving !== null && leaving !== ring.domain}
              pointerX={pointerX}
              pointerY={pointerY}
              onHoverChange={setHovered}
              onNavigate={setLeaving}
            />
          );
        })}
      </div>

      {/* Fixed height so the caption appearing on hover never shifts the layout. */}
      <div
        aria-hidden
        className="flex h-5 items-center justify-center text-center"
      >
        <AnimatePresence mode="wait">
          {activeDescription && (
            <motion.p
              key={hovered}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-foreground-muted text-sm"
            >
              {activeDescription}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
