"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildConceptGraph,
  getAncestorPath,
  getChildren,
  getFollowUps,
  getPrerequisites,
  getRelated,
  type ConceptGraph,
} from "@/curriculum/graph";
import {
  DOMAIN_META,
  type Concept,
  type ConceptId,
  type Domain,
} from "@/curriculum/metadata";
import type { ProgressStore } from "@/progress";
import { computeNodeVisualState, type NodeVisualState } from "./nodeState";
import {
  buildVisibleMap,
  groupChildrenByParent,
  idsToReveal,
  layoutTree,
  type MapEdge,
  type MapNode,
  type MapNodeId,
} from "./layout";

const DOMAIN_LABELS = Object.fromEntries(
  Object.entries(DOMAIN_META).map(([domain, meta]) => [domain, meta.label]),
) as Record<Domain, string>;

export interface PositionedMapNode {
  node: MapNode;
  x: number;
  y: number;
  depth: number;
  expanded: boolean;
  hasChildren: boolean;
  visualState: NodeVisualState | null; // null for a domain node — mastery/relation don't apply to it.
}

export interface SelectedConceptDetail {
  concept: Concept;
  ancestorPath: Concept[];
  prerequisites: Concept[];
  related: Concept[];
  recommendedNext: Concept[];
}

export interface KnowledgeMapState {
  graph: ConceptGraph;
  nodes: PositionedMapNode[];
  edges: MapEdge[];
  selected: SelectedConceptDetail | null;
  /** id -> whether that node is currently rendered — for "highlight where practical". */
  visibleIds: Set<MapNodeId>;
  toggleExpand: (id: MapNodeId) => void;
  selectConcept: (id: ConceptId | null) => void;
  /** Expands whatever the id needs to become visible first, then selects it. */
  revealAndSelect: (id: ConceptId) => void;
}

/**
 * All state the knowledge map needs, independent of React Flow or any
 * particular view — the canvas and the accessible hierarchical list both
 * render this same state, so a selection or an expansion made in one is
 * exactly reflected in the other.
 */
export function useKnowledgeMapState(
  concepts: Concept[],
  progress?: ProgressStore,
): KnowledgeMapState {
  const graph = useMemo(() => buildConceptGraph(concepts), [concepts]);
  const [expandedIds, setExpandedIds] = useState<Set<MapNodeId>>(
    () => new Set(),
  );
  const [selectedId, setSelectedId] = useState<ConceptId | null>(null);

  const { nodes: rawNodes, edges } = useMemo(
    () => buildVisibleMap(graph, expandedIds, DOMAIN_LABELS),
    [graph, expandedIds],
  );

  const selected = useMemo<SelectedConceptDetail | null>(() => {
    if (!selectedId) return null;
    const concept = graph.byId.get(selectedId);
    if (!concept) return null;

    return {
      concept,
      ancestorPath: getAncestorPath(graph, concept.id),
      prerequisites: getPrerequisites(concept, concepts),
      related: getRelated(graph, concept.id),
      recommendedNext: getFollowUps(graph, concept.id),
    };
  }, [graph, concepts, selectedId]);

  const prerequisiteIds = useMemo(
    () => new Set(selected?.prerequisites.map((c) => c.id) ?? []),
    [selected],
  );
  const relatedIds = useMemo(
    () => new Set(selected?.related.map((c) => c.id) ?? []),
    [selected],
  );

  const childrenOf = useMemo(() => {
    const grouped = groupChildrenByParent(edges);
    return (id: MapNodeId) => grouped.get(id) ?? [];
  }, [edges]);

  const positions = useMemo(() => {
    const domainRootIds = rawNodes
      .filter((node) => node.kind === "domain")
      .map((node) => node.id);
    return layoutTree(domainRootIds, childrenOf);
  }, [rawNodes, childrenOf]);

  const visibleIds = useMemo(
    () => new Set(rawNodes.map((node) => node.id)),
    [rawNodes],
  );

  const nodes = useMemo<PositionedMapNode[]>(() => {
    return rawNodes.map((node) => {
      const position = positions.get(node.id) ?? { x: 0, y: 0, depth: 0 };
      const expanded = expandedIds.has(node.id);
      // Whether a node *can* expand has to come from the full graph, not
      // from `edges` — a concept's children only appear in `edges` once it
      // is already expanded, so reading "has children" from there would
      // hide the expand control on every concept until one level too late.
      const hasChildren =
        node.kind === "domain"
          ? true // getMapDomains only lists domains with concepts, and a valid curriculum guarantees every domain has an entry point.
          : getChildren(graph, node.concept.id).length > 0;

      return {
        node,
        x: position.x,
        y: position.y,
        depth: position.depth,
        expanded,
        hasChildren,
        visualState:
          node.kind === "concept"
            ? computeNodeVisualState(node.concept, {
                selectedId,
                prerequisiteIds,
                relatedIds,
                progress,
                byId: graph.byId,
              })
            : null,
      };
    });
  }, [
    rawNodes,
    positions,
    expandedIds,
    selectedId,
    prerequisiteIds,
    relatedIds,
    progress,
    graph,
  ]);

  const toggleExpand = useCallback((id: MapNodeId) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectConcept = useCallback((id: ConceptId | null) => {
    setSelectedId(id);
  }, []);

  const revealAndSelect = useCallback(
    (id: ConceptId) => {
      const path = getAncestorPath(graph, id);
      const toReveal = idsToReveal(path);
      setExpandedIds((current) => new Set([...current, ...toReveal]));
      setSelectedId(id);
    },
    [graph],
  );

  return {
    graph,
    nodes,
    edges,
    selected,
    visibleIds,
    toggleExpand,
    selectConcept,
    revealAndSelect,
  };
}
