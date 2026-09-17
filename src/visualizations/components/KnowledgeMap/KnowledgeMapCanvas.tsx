"use client";

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { ConceptNode, type ConceptNodeData } from "./ConceptNode";
import { DomainNode, type DomainNodeData } from "./DomainNode";
import { getDescendantIds, type MapNodeId } from "./layout";
import type { KnowledgeMapState } from "./useKnowledgeMapState";

const nodeTypes = { domain: DomainNode, concept: ConceptNode };

export interface KnowledgeMapCanvasProps {
  state: KnowledgeMapState;
  /** Tighter, single-node framing on narrow viewports — the mobile "focused branch mode". */
  focusedMode?: boolean;
}

function KnowledgeMapCanvasInner({
  state,
  focusedMode = false,
}: KnowledgeMapCanvasProps) {
  const { fitView } = useReactFlow();
  const {
    nodes: mapNodes,
    edges: mapEdges,
    toggleExpand,
    selectConcept,
    selected,
  } = state;

  const focusBranch = useCallback(
    (id: MapNodeId) => {
      const ids = [...getDescendantIds(id, mapEdges)].map((nodeId) => ({
        id: nodeId,
      }));
      fitView({ nodes: ids, duration: 300, padding: 0.3 });
    },
    [mapEdges, fitView],
  );

  // Which node an expand/collapse was just triggered on — so a narrow
  // viewport can re-frame to just that branch instead of every visible
  // node. Fitting everything after each toggle is fine with room to
  // spread out; on a phone it can zoom a single newly revealed node down
  // to an untappable sliver once several domains are already open.
  const lastToggledId = useRef<MapNodeId | null>(null);
  const toggleExpandTracked = useCallback(
    (id: MapNodeId) => {
      lastToggledId.current = id;
      toggleExpand(id);
    },
    [toggleExpand],
  );

  const nodes = useMemo<Node[]>(() => {
    return mapNodes.map((positioned) => {
      const { node } = positioned;
      const position = { x: positioned.x, y: positioned.y };

      if (node.kind === "domain") {
        const data: DomainNodeData = {
          domain: node.domain,
          label: node.label,
          conceptCount: node.conceptCount,
          expanded: positioned.expanded,
          onToggle: () => toggleExpandTracked(node.id),
          onFocus: () => focusBranch(node.id),
        };
        return {
          id: node.id,
          type: "domain",
          position,
          data,
          draggable: false,
        };
      }

      const data: ConceptNodeData = {
        concept: node.concept,
        // Only a domain node's visualState is null — this branch is a concept node.
        visualState: positioned.visualState as NonNullable<
          typeof positioned.visualState
        >,
        expanded: positioned.expanded,
        hasChildren: positioned.hasChildren,
        onSelect: () => selectConcept(node.concept.id),
        onToggleExpand: () => toggleExpandTracked(node.id),
        onFocus: () => focusBranch(node.id),
      };
      return { id: node.id, type: "concept", position, data, draggable: false };
    });
  }, [mapNodes, toggleExpandTracked, selectConcept, focusBranch]);

  const edges = useMemo<Edge[]>(
    () =>
      mapEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        style: { stroke: "var(--color-graph-edge)" },
      })),
    [mapEdges],
  );

  // Re-frame the view whenever the visible tree's shape changes (an expand
  // or collapse) — this is "focus a branch" happening by default, not only
  // on request. In focused mode, scope that to the branch just toggled
  // rather than every visible node: with several domains already open, one
  // more child can otherwise zoom out to the point of being untappable.
  useEffect(() => {
    const toggled = lastToggledId.current;
    if (focusedMode && toggled) {
      const ids = [...getDescendantIds(toggled, mapEdges)].map((id) => ({
        id,
      }));
      fitView({ nodes: ids, duration: 300, padding: 0.3 });
    } else {
      fitView({ duration: 300, padding: 0.25 });
    }
  }, [mapEdges, mapNodes.length, fitView, focusedMode]);

  // Selecting a concept (including via search, which can reveal it far from
  // the current viewport) brings it into view on its own.
  useEffect(() => {
    if (!selected) return;
    const ids = focusedMode
      ? [selected.concept.id]
      : [...getDescendantIds(selected.concept.id, mapEdges)];
    fitView({ nodes: ids.map((id) => ({ id })), duration: 350, padding: 0.4 });
    // Only re-focus when the selection itself changes, not every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.concept.id]);

  return (
    <div className="border-border h-72 w-full overflow-hidden rounded-xl border sm:h-[32rem] lg:h-[38rem]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onlyRenderVisibleElements
        nodesDraggable={false}
        nodesConnectable={false}
        // Not elementsSelectable={false}: React Flow sets the whole
        // viewport to pointer-events: none when nothing is selectable,
        // which also swallows clicks meant for the buttons inside each
        // custom node. RF's own selection state is simply never read here.
        panOnScroll
        zoomOnPinch
        minZoom={0.2}
        maxZoom={1.5}
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background gap={24} size={1} color="var(--color-border)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export function KnowledgeMapCanvas(props: KnowledgeMapCanvasProps) {
  return (
    <ReactFlowProvider>
      <KnowledgeMapCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
