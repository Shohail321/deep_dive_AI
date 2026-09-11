"use client";

import { motion } from "motion/react";
import type { Domain } from "@/curriculum/metadata";
import { cn } from "@/lib";

export interface DomainRing {
  domain: Domain;
  label: string;
  /** Named in the accessible label so the nesting is not carried by the picture alone. */
  containsLabel?: string;
}

export interface DomainRingsProps {
  rings: DomainRing[];
  onSelect: (domain: Domain) => void;
  registerRef?: (domain: Domain, node: HTMLButtonElement | null) => void;
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
 */

// Diameter as a share of the outer ring, and where each label sits within its
// own band. Written out rather than computed so the bands stay legible.
const RING_GEOMETRY = [
  { size: "100%", labelTop: "7%" },
  { size: "68%", labelTop: "10%" },
  { size: "40%", labelTop: "50%" },
] as const;

const ringStyles: Record<Domain, string> = {
  ai: "border-ai/25 bg-ai/[0.04] hover:border-ai/50 hover:bg-ai/[0.07]",
  ml: "border-ml/25 bg-ml/[0.05] hover:border-ml/50 hover:bg-ml/[0.09]",
  dl: "border-dl/30 bg-dl/[0.07] hover:border-dl/55 hover:bg-dl/[0.12]",
};

const labelStyles: Record<Domain, string> = {
  ai: "text-ai-text",
  ml: "text-ml-text",
  dl: "text-dl-text",
};

export function DomainRings({
  rings,
  onSelect,
  registerRef,
  className,
}: DomainRingsProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[min(86vw,34rem)]",
        className,
      )}
    >
      {rings.map((ring, index) => {
        const geometry = RING_GEOMETRY[index] ?? RING_GEOMETRY.at(-1)!;
        const isInnermost = index === rings.length - 1;

        return (
          <motion.button
            key={ring.domain}
            type="button"

            ref={(node) => {
              registerRef?.(ring.domain, node);
            }}
            onClick={() => onSelect(ring.domain)}
            aria-label={
              ring.containsLabel
                ? `${ring.label}, which contains ${ring.containsLabel}`
                : ring.label
            }
            style={{ width: geometry.size, height: geometry.size }}
            whileHover={{ scale: 1.012 }}
            whileTap={{ scale: 0.994 }}
            className={cn(
              "focus-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "duration-base ease-smooth rounded-full border transition-colors",
              "cursor-pointer",
              ringStyles[ring.domain],
            )}
          >
            <span
              style={{ top: geometry.labelTop }}
              className={cn(
                "absolute left-1/2 -translate-x-1/2",
                isInnermost && "-translate-y-1/2",
                "text-center text-sm font-medium tracking-tight sm:text-base",
                labelStyles[ring.domain],
              )}
            >
              {ring.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
