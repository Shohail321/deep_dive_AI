"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  CheckCircle2,
  ChevronDown,
  Crosshair,
  Lock,
  Sparkles,
} from "lucide-react";
import { Badge, IconButton } from "@/components/ui";
import type { Concept, Domain } from "@/curriculum/metadata";
import { cn } from "@/lib";
import type { NodeVisualState } from "./nodeState";

export interface ConceptNodeData extends Record<string, unknown> {
  concept: Concept;
  visualState: NodeVisualState;
  expanded: boolean;
  hasChildren: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onFocus: () => void;
}

const domainBorder: Partial<Record<Domain, string>> = {
  ai: "border-l-ai",
  ml: "border-l-ml",
  dl: "border-l-dl",
};

const masteryStyles: Record<NodeVisualState["mastery"], string> = {
  unexplored: "border-border bg-graph-node",
  completed: "border-success/40 bg-graph-node",
  mastered: "border-mastery-mastered/60 bg-graph-node",
};

const relationRing: Record<NodeVisualState["relation"], string> = {
  none: "",
  selected: "ring-accent-solid ring-2 ring-offset-2 ring-offset-background",
  prerequisite: "ring-warning ring-2 ring-offset-2 ring-offset-background",
  related: "ring-info ring-2 ring-offset-2 ring-offset-background",
};

const relationLabel: Record<NodeVisualState["relation"], string> = {
  none: "",
  selected: "Selected",
  prerequisite: "Prerequisite",
  related: "Related",
};

const relationBadgeTone = {
  selected: "ai",
  prerequisite: "warning",
  related: "info",
} as const;

/**
 * A concept in the map. The node body selects (opens the concept panel);
 * the chevron is a separate control that only expands or collapses — the
 * two are deliberately different gestures, per the map's own rule that a
 * click never navigates or drills down by itself.
 *
 * Mastery (unexplored/completed/mastered) and relation-to-selection
 * (selected/prerequisite/related) are independent channels, not one
 * seven-way state: a node can be mastered *and* a prerequisite of whatever
 * is currently selected at the same time, and both remain visible —
 * mastery as the border colour and a corner icon, relation as a ring plus a
 * text badge, since colour alone is never this app's only signal.
 *
 * The select action is a `<button>` that fills the card (`absolute
 * inset-0`) rather than the card itself carrying `role="button"`: a
 * focusable icon button living inside an element the accessibility tree
 * already exposes as a button is ambiguous for assistive tech (axe's
 * `nested-interactive` check). The Focus and expand controls, painted
 * after it, stay independent siblings instead of descendants of the first.
 */
export function ConceptNode({ data }: NodeProps & { data: ConceptNodeData }) {
  const { concept, visualState } = data;

  return (
    <div
      className={cn(
        "relative w-64 rounded-lg border-2 border-l-4 px-4 py-3",
        "shadow-overlay",
        "duration-fast ease-smooth transition-colors",
        masteryStyles[visualState.mastery],
        domainBorder[concept.domain] ?? "border-l-border-strong",
        relationRing[visualState.relation],
        visualState.locked && "opacity-60",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        className="opacity-0"
      />

      <button
        type="button"
        aria-labelledby={`${concept.id}-title`}
        aria-pressed={visualState.relation === "selected"}
        onClick={data.onSelect}
        className={cn(
          "focus-ring absolute inset-0 cursor-pointer rounded-lg",
          "duration-fast ease-smooth hover:bg-foreground/[0.03] transition-colors",
        )}
      />

      <div className="pointer-events-none flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          {visualState.relation !== "none" && (
            <Badge
              tone={relationBadgeTone[visualState.relation]}
              className="mb-1.5"
            >
              {relationLabel[visualState.relation]}
            </Badge>
          )}
          <div
            id={`${concept.id}-title`}
            className="text-foreground truncate text-sm font-semibold tracking-tight"
          >
            {concept.title}
          </div>
          <div className="text-foreground-secondary text-2xs mt-0.5 capitalize">
            {concept.difficulty} · {concept.estimatedMinutes} min
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          {visualState.mastery === "mastered" && (
            <span title="Mastered">
              <Sparkles aria-hidden className="text-mastery-mastered size-4" />
              <span className="sr-only">Mastered</span>
            </span>
          )}
          {visualState.mastery === "completed" && (
            <span title="Completed">
              <CheckCircle2 aria-hidden className="text-success-text size-4" />
              <span className="sr-only">Completed</span>
            </span>
          )}
          {visualState.locked && (
            <span title="Locked">
              <Lock aria-hidden className="text-foreground-secondary size-4" />
              <span className="sr-only">Locked</span>
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-2 flex items-center justify-end gap-1">
        <IconButton
          label={`Focus ${concept.title}`}
          icon={<Crosshair />}
          size="sm"
          onClick={data.onFocus}
        />
        {data.hasChildren && (
          <IconButton
            label={
              data.expanded
                ? `Collapse ${concept.title}`
                : `Expand ${concept.title}`
            }
            icon={
              <ChevronDown
                className={cn(
                  "transition-transform",
                  !data.expanded && "-rotate-90",
                )}
              />
            }
            size="sm"
            aria-expanded={data.expanded}
            onClick={data.onToggleExpand}
          />
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        className="opacity-0"
      />
    </div>
  );
}
