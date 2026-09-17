"use client";

import { Clock, Gauge } from "lucide-react";
import type { ReactNode } from "react";
import { BottomSheet, Drawer, InfoCallout, LinkButton } from "@/components/ui";
import type { Concept, ConceptId } from "@/curriculum/metadata";
import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib";
import { getIncompletePrerequisites } from "./nodeState";
import { WhereAmI } from "./WhereAmI";
import type { SelectedConceptDetail } from "./useKnowledgeMapState";
import type { ConceptGraph } from "@/curriculum/graph";
import type { ProgressStore } from "@/progress";

export interface ConceptPanelProps {
  detail: SelectedConceptDetail;
  graph: ConceptGraph;
  progress?: ProgressStore;
  onClose: () => void;
  onNavigate: (id: ConceptId) => void;
}

function ConceptChips({
  concepts,
  onNavigate,
}: {
  concepts: Concept[];
  onNavigate: (id: ConceptId) => void;
}) {
  if (concepts.length === 0) {
    return <p className="text-foreground-muted text-sm">None</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {concepts.map((concept) => (
        <li key={concept.id}>
          <button
            type="button"
            onClick={() => onNavigate(concept.id)}
            className={cn(
              "focus-ring border-border bg-surface-raised hover:border-border-strong rounded-full border px-3 py-1 text-xs",
              "duration-fast ease-smooth transition-colors",
            )}
          >
            {concept.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-foreground-muted text-2xs font-medium tracking-wide uppercase">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ConceptPanelBody({
  detail,
  graph,
  progress,
  onNavigate,
}: {
  detail: SelectedConceptDetail;
  graph: ConceptGraph;
  progress?: ProgressStore;
  onNavigate: (id: ConceptId) => void;
}) {
  const { concept } = detail;
  const lockedBecause = getIncompletePrerequisites(
    concept,
    progress,
    graph.byId,
  );

  return (
    <div>
      <WhereAmI
        path={detail.ancestorPath}
        onNavigate={onNavigate}
        className="mb-4"
      />

      <p className="text-foreground-secondary text-sm leading-relaxed">
        {concept.summary}
      </p>

      <div className="text-foreground-secondary mt-4 flex flex-wrap items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 capitalize">
          <Gauge aria-hidden className="size-4" />
          {concept.difficulty}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock aria-hidden className="size-4" />
          {concept.estimatedMinutes} min
        </span>
      </div>

      {lockedBecause.length > 0 && (
        <InfoCallout tone="warning" title="Not yet unlocked" className="mt-4">
          Finish{" "}
          {lockedBecause.map((prereq, index) => (
            <span key={prereq.id}>
              {index > 0 && ", "}
              <button
                type="button"
                onClick={() => onNavigate(prereq.id)}
                className="focus-ring underline underline-offset-2"
              >
                {prereq.title}
              </button>
            </span>
          ))}{" "}
          first.
        </InfoCallout>
      )}

      {concept.learningObjectives.length > 0 && (
        <Section title="What you will be able to do">
          <ul className="text-foreground-secondary space-y-2 text-sm">
            {concept.learningObjectives.map((objective) => (
              <li key={objective} className="flex gap-3">
                <span aria-hidden className="text-foreground-muted">
                  —
                </span>
                {objective}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Prerequisites">
        <ConceptChips concepts={detail.prerequisites} onNavigate={onNavigate} />
      </Section>

      <Section title="Related concepts">
        <ConceptChips concepts={detail.related} onNavigate={onNavigate} />
      </Section>

      <Section title="Recommended next">
        <ConceptChips
          concepts={detail.recommendedNext}
          onNavigate={onNavigate}
        />
      </Section>
    </div>
  );
}

/**
 * Selecting a node opens this, but never navigates anywhere by itself —
 * "Start Learning" is the one deliberate action that does. It links to the
 * concept's real place in `/domains/[domain]`, the honest destination that
 * exists today; a dedicated lesson route is future work this panel does not
 * pretend already exists.
 */
export function ConceptPanel({
  detail,
  graph,
  progress,
  onClose,
  onNavigate,
}: ConceptPanelProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { concept } = detail;

  const footer = (
    <LinkButton
      href={`/domains/${concept.domain}#${concept.id}`}
      variant="accent"
      fullWidth={isMobile}
    >
      Start Learning
    </LinkButton>
  );

  const body = (
    <ConceptPanelBody
      detail={detail}
      graph={graph}
      progress={progress}
      onNavigate={onNavigate}
    />
  );

  if (isMobile) {
    return (
      <BottomSheet
        title={concept.title}
        open
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        footer={footer}
      >
        {body}
      </BottomSheet>
    );
  }

  return (
    <Drawer
      title={concept.title}
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      footer={footer}
    >
      {body}
    </Drawer>
  );
}
