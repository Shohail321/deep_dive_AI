"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { Badge, Button, ConceptLabel } from "@/components/ui";
import {
  domainSchema,
  type AuthoringStatus,
  type Domain,
} from "@/curriculum/metadata";
import { DomainRings } from "@/visualizations/components/DomainRings";

export interface DomainConceptSummary {
  id: string;
  title: string;
  status: AuthoringStatus;
}

export interface DomainSummary {
  domain: Domain;
  title: string;
  shortTitle: string;
  summary: string;
  learningObjectives: string[];
  status: AuthoringStatus;
  concepts: DomainConceptSummary[];
}

const statusTone = {
  planned: "neutral",
  drafting: "warning",
  review: "info",
  complete: "success",
} as const;

const statusLabel: Record<AuthoringStatus, string> = {
  planned: "Planned",
  drafting: "Drafting",
  review: "In review",
  complete: "Complete",
};

const domainColor: Record<Domain, string> = {
  ai: "var(--color-ai)",
  ml: "var(--color-ml)",
  dl: "var(--color-dl)",
};

/**
 * Owns which domain is open, and keeps that in the URL so the ring a learner
 * opened can be linked to and closed with the browser's Back button. The
 * rings themselves stay a presentational visualization.
 */
export function DomainExplorer({ domains }: { domains: DomainSummary[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requested = searchParams.get("domain");
  const parsed = domainSchema.safeParse(requested);
  const selectedDomain = parsed.success ? parsed.data : null;
  const selected = domains.find((d) => d.domain === selectedDomain) ?? null;

  const openedDomain = useRef<Domain | null>(selectedDomain);

  /**
   * Where focus should land once the next view mounts.
   *
   * It cannot be done in an effect keyed on the selection: `mode="wait"`
   * holds the incoming view back until the outgoing one has finished
   * leaving, so at selection time the element to focus does not exist yet.
   * The views claim this on mount instead. It starts null so a deep link
   * renders without yanking focus out of the page.
   */
  const pendingFocus = useRef<
    { type: "panel" } | { type: "ring"; domain: Domain } | null
  >(null);

  const select = useCallback(
    (domain: Domain | null) => {
      if (domain) {
        pendingFocus.current = { type: "panel" };
        openedDomain.current = domain;
      } else if (openedDomain.current) {
        pendingFocus.current = { type: "ring", domain: openedDomain.current };
      }

      router.push(domain ? `/?domain=${domain}` : "/", { scroll: false });
    },
    [router],
  );

  const focusPanelHeading = useCallback((node: HTMLHeadingElement | null) => {
    if (node && pendingFocus.current?.type === "panel") {
      pendingFocus.current = null;
      node.focus();
    }
  }, []);

  const registerRing = useCallback(
    (domain: Domain, node: HTMLButtonElement | null) => {
      const pending = pendingFocus.current;
      if (node && pending?.type === "ring" && pending.domain === domain) {
        pendingFocus.current = null;
        node.focus();
      }
    },
    [],
  );

  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") select(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, select]);

  const rings = domains.map((domain, index) => ({
    domain: domain.domain,
    label: domain.title,
    containsLabel: domains[index + 1]?.title,
  }));

  const transition = { duration: 0.45 };

  return (
    /* Reduced motion is handled inside Motion rather than by branching on the
       preference here: the server cannot know the preference, so any render
       that depends on it disagrees with the client's first render and fails
       hydration. MotionConfig drops transform and layout animations for these
       users while both sides still render identical markup. */
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-[34rem] sm:min-h-[38rem]">
        <p className="sr-only">
          {domains.map((d) => d.title).join(" contains ")}. Select a field to
          read more about it.
        </p>

        {/* "wait" keeps exactly one view mounted: the outgoing one leaves before
          the next arrives, so assistive technology never sees both.

          No `initial={false}`: it suppresses the entry state on the client
          only, while the server still renders it — which is a hydration
          mismatch on the style attribute. Letting the entry animation run on
          first paint costs nothing and keeps both sides identical. */}
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="rings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <DomainRings
                rings={rings}
                onSelect={select}
                registerRef={registerRing}
              />
            </motion.div>
          ) : (
            <motion.section
              key="detail"
              aria-label={selected.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="relative mx-auto max-w-2xl"
            >
              {/* The opened ring, expanded into an ambient halo. A hard-edged
                  circle here reads as a shape dropped on top of the prose;
                  a soft one carries the domain's colour without competing
                  with anything the learner is trying to read. */}
              <motion.div
                aria-hidden
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={transition}
                style={{
                  background: `radial-gradient(circle, color-mix(in oklab, ${domainColor[selected.domain]} 16%, transparent), transparent 70%)`,
                }}
                className="absolute -top-48 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full"
              />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Badge tone={selected.domain}>{selected.shortTitle}</Badge>
                  <h2
                    ref={focusPanelHeading}
                    tabIndex={-1}
                    className="text-3xl font-semibold tracking-tight focus:outline-none"
                  >
                    {selected.title}
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => select(null)}>
                  Close
                </Button>
              </div>

              <p className="text-foreground-secondary mt-4 text-base leading-relaxed">
                {selected.summary}
              </p>

              {selected.learningObjectives.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-foreground-muted text-2xs font-medium tracking-wide uppercase">
                    What you will be able to do
                  </h3>
                  <ul className="text-foreground-secondary mt-3 space-y-2 text-sm">
                    {selected.learningObjectives.map((objective) => (
                      <li key={objective} className="flex gap-3">
                        <span aria-hidden className="text-foreground-muted">
                          —
                        </span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-foreground-muted text-2xs font-medium tracking-wide uppercase">
                  Concepts in this field
                </h3>
                <ul className="mt-3 flex flex-wrap items-center gap-2">
                  {selected.concepts.map((concept) => (
                    <li key={concept.id}>
                      <ConceptLabel domain={selected.domain}>
                        {concept.title}
                      </ConceptLabel>
                    </li>
                  ))}
                </ul>
                <p className="text-foreground-muted mt-4 text-xs">
                  <Badge tone={statusTone[selected.status]}>
                    {statusLabel[selected.status]}
                  </Badge>{" "}
                  <span className="ml-1 align-middle">
                    Lessons and visualizations for these concepts are still
                    being written.
                  </span>
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
