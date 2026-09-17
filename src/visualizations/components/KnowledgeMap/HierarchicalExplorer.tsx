"use client";

import { CheckCircle2, ChevronRight, Lock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib";
import { groupChildrenByParent, type MapNodeId } from "./layout";
import type {
  KnowledgeMapState,
  PositionedMapNode,
} from "./useKnowledgeMapState";

const relationBadgeTone = {
  selected: "ai",
  prerequisite: "warning",
  related: "info",
} as const;

function TreeItem({
  id,
  depth,
  byId,
  childrenOf,
  state,
}: {
  id: MapNodeId;
  depth: number;
  byId: Map<MapNodeId, PositionedMapNode>;
  childrenOf: Map<MapNodeId, MapNodeId[]>;
  state: KnowledgeMapState;
}) {
  const positioned = byId.get(id);
  if (!positioned) return null;
  const { node } = positioned;
  const childIds = childrenOf.get(id) ?? [];
  const showChildren = positioned.expanded && childIds.length > 0;

  return (
    <li>
      <div
        className="flex items-center gap-1.5 py-1"
        style={{ paddingLeft: depth * 16 }}
      >
        {positioned.hasChildren ? (
          <button
            type="button"
            aria-expanded={positioned.expanded}
            aria-label={
              positioned.expanded
                ? `Collapse ${node.kind === "domain" ? node.label : node.concept.title}`
                : `Expand ${node.kind === "domain" ? node.label : node.concept.title}`
            }
            onClick={() =>
              state.toggleExpand(
                node.kind === "domain" ? node.id : node.concept.id,
              )
            }
            className="focus-ring text-foreground-muted hover:text-foreground shrink-0 rounded p-0.5"
          >
            <ChevronRight
              aria-hidden
              className={cn(
                "size-4 transition-transform",
                positioned.expanded && "rotate-90",
              )}
            />
          </button>
        ) : (
          <span aria-hidden className="inline-block size-4 shrink-0" />
        )}

        {node.kind === "domain" ? (
          <span className="text-foreground text-sm font-medium">
            {node.label}{" "}
            <span className="text-foreground-muted font-normal">
              ({node.conceptCount})
            </span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => state.selectConcept(node.concept.id)}
            aria-current={
              positioned.visualState?.relation === "selected"
                ? "true"
                : undefined
            }
            className={cn(
              "focus-ring flex items-center gap-1.5 rounded px-1 text-left text-sm",
              positioned.visualState?.relation === "selected"
                ? "text-foreground font-medium"
                : "text-foreground-secondary hover:text-foreground",
            )}
          >
            {node.concept.title}
            {positioned.visualState &&
              positioned.visualState.relation !== "none" && (
                <Badge
                  tone={relationBadgeTone[positioned.visualState.relation]}
                >
                  {positioned.visualState.relation}
                </Badge>
              )}
            {positioned.visualState?.mastery === "mastered" && (
              <Sparkles
                aria-hidden
                className="text-mastery-mastered size-3.5"
              />
            )}
            {positioned.visualState?.mastery === "completed" && (
              <CheckCircle2
                aria-hidden
                className="text-success-text size-3.5"
              />
            )}
            {positioned.visualState?.locked && (
              <Lock aria-hidden className="text-foreground-muted size-3.5" />
            )}
          </button>
        )}
      </div>

      {showChildren && (
        <ul>
          {childIds.map((childId) => (
            <TreeItem
              key={childId}
              id={childId}
              depth={depth + 1}
              byId={byId}
              childrenOf={childrenOf}
              state={state}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * The non-spatial equivalent of the canvas: every domain and concept the
 * map can show, as a nested disclosure list rather than a panned-and-zoomed
 * picture. It reads the exact same `KnowledgeMapState` the canvas does, so
 * expanding or selecting here is immediately reflected there and back —
 * neither view is a second source of truth.
 *
 * A nested `<ul>` of native buttons rather than an ARIA `role="tree"`: a
 * tree widget's correctness depends on roving-tabindex arrow-key navigation
 * done exactly right, and a native disclosure list gives every one of
 * pan/zoom/expand/collapse/select a working keyboard and screen-reader path
 * without that risk.
 */
export function HierarchicalExplorer({ state }: { state: KnowledgeMapState }) {
  const byId = new Map(state.nodes.map((n) => [n.node.id, n]));
  const childrenOf = groupChildrenByParent(state.edges);
  const roots = state.nodes.filter((n) => n.node.kind === "domain");

  return (
    <ul aria-label="Curriculum, as a hierarchy" className="space-y-0.5">
      {roots.map((root) => (
        <TreeItem
          key={root.node.id}
          id={root.node.id}
          depth={0}
          byId={byId}
          childrenOf={childrenOf}
          state={state}
        />
      ))}
    </ul>
  );
}
