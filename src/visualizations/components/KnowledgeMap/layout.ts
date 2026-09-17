import {
  getChildren,
  getDomainEntryPoints,
  type ConceptGraph,
} from "@/curriculum/graph";
import { domainSchema, type Concept, type Domain } from "@/curriculum/metadata";

/**
 * The map's node ids share one string space: a domain node is
 * `domain:<domain>`, a concept node is the concept's own id. Concept ids are
 * validated kebab-case (see `conceptIdSchema`), which never contains `:`, so
 * the two can never collide.
 */
export type MapNodeId = string;

export function domainNodeId(domain: Domain): MapNodeId {
  return `domain:${domain}`;
}

export function domainFromNodeId(id: MapNodeId): Domain | null {
  if (!id.startsWith("domain:")) return null;
  const parsed = domainSchema.safeParse(id.slice("domain:".length));
  return parsed.success ? parsed.data : null;
}

export interface DomainMapNode {
  kind: "domain";
  id: MapNodeId;
  domain: Domain;
  label: string;
  conceptCount: number;
}

export interface ConceptMapNode {
  kind: "concept";
  id: MapNodeId;
  concept: Concept;
}

export type MapNode = DomainMapNode | ConceptMapNode;

export interface MapEdge {
  id: string;
  source: MapNodeId;
  target: MapNodeId;
}

/**
 * Every domain that actually has at least one concept, in curriculum
 * (`domainSchema`) order — not hardcoded, so a domain added to the ontology
 * appears here the moment it has content, the same principle the homepage's
 * rings and the coverage auditor already follow.
 */
export function getMapDomains(graph: ConceptGraph): Domain[] {
  const present = new Set(graph.concepts.map((c) => c.domain));
  return domainSchema.options.filter((domain) => present.has(domain));
}

/**
 * The nodes and hierarchy edges visible given which node ids are currently
 * expanded — progressive disclosure's actual mechanism. A domain reveals its
 * entry-point concepts; a concept reveals its children (`getChildren`, the
 * inverse of `parents`). Nothing beyond what the learner has opened is ever
 * computed, which is what keeps this correct at 1,000+ concepts: the visible
 * set is bounded by interaction, not by curriculum size.
 */
export function buildVisibleMap(
  graph: ConceptGraph,
  expandedIds: ReadonlySet<MapNodeId>,
  domainLabels: Record<Domain, string>,
): { nodes: MapNode[]; edges: MapEdge[] } {
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];
  const domains = getMapDomains(graph);

  for (const domain of domains) {
    const id = domainNodeId(domain);
    nodes.push({
      kind: "domain",
      id,
      domain,
      label: domainLabels[domain],
      conceptCount: graph.concepts.filter((c) => c.domain === domain).length,
    });

    if (!expandedIds.has(id)) continue;

    for (const entryPoint of getDomainEntryPoints(graph, domain)) {
      nodes.push({ kind: "concept", id: entryPoint.id, concept: entryPoint });
      edges.push({
        id: `${id}->${entryPoint.id}`,
        source: id,
        target: entryPoint.id,
      });
    }
  }

  // Breadth-first over concept nodes already added: a concept only yields
  // its children once, and only if it is itself expanded, so this always
  // terminates on the (user-bounded) expanded set rather than the full tree.
  let frontier = nodes.filter(
    (node): node is ConceptMapNode => node.kind === "concept",
  );
  const visitedConceptIds = new Set(frontier.map((node) => node.concept.id));

  while (frontier.length > 0) {
    const next: ConceptMapNode[] = [];

    for (const parent of frontier) {
      if (!expandedIds.has(parent.concept.id)) continue;

      for (const child of getChildren(graph, parent.concept.id)) {
        if (visitedConceptIds.has(child.id)) continue; // a second parent edge — keep the tree singly-rooted here.
        visitedConceptIds.add(child.id);
        const childNode: ConceptMapNode = {
          kind: "concept",
          id: child.id,
          concept: child,
        };
        nodes.push(childNode);
        edges.push({
          id: `${parent.concept.id}->${child.id}`,
          source: parent.concept.id,
          target: child.id,
        });
        next.push(childNode);
      }
    }

    frontier = next;
  }

  return { nodes, edges };
}

export interface TreePosition {
  x: number;
  y: number;
  depth: number;
}

export interface TreeLayoutOptions {
  /** Horizontal distance between adjacent leaf columns. */
  columnWidth?: number;
  /** Vertical distance between depths. */
  rowHeight?: number;
}

/**
 * `MapEdge[]` as a parent → children lookup. `layoutTree`'s `childrenOf`
 * and the hierarchical list view both need exactly this, built from the
 * same edges so the map and the list can never disagree about the tree's
 * shape.
 */
export function groupChildrenByParent(
  edges: MapEdge[],
): Map<MapNodeId, MapNodeId[]> {
  const children = new Map<MapNodeId, MapNodeId[]>();
  for (const edge of edges) {
    const existing = children.get(edge.source);
    if (existing) existing.push(edge.target);
    else children.set(edge.source, [edge.target]);
  }
  return children;
}

/**
 * `id` plus every node reachable from it by following edges forward —
 * what "focus this branch" fits the view to. Bounded by the currently
 * visible edges, so this is always a small BFS regardless of curriculum
 * size, the same reasoning `buildVisibleMap` itself relies on.
 */
export function getDescendantIds(
  id: MapNodeId,
  edges: MapEdge[],
): Set<MapNodeId> {
  const children = groupChildrenByParent(edges);
  const result = new Set<MapNodeId>([id]);
  const queue = [...(children.get(id) ?? [])];

  while (queue.length > 0) {
    const next = queue.shift() as MapNodeId;
    if (result.has(next)) continue;
    result.add(next);
    queue.push(...(children.get(next) ?? []));
  }

  return result;
}

/**
 * Centred top-down tree layout: a leaf claims the next free column, an
 * internal node centres over the span of its own children. Generic over any
 * id/child-lookup so it is testable with plain strings — the curriculum
 * only supplies the tree shape via `childrenOf`.
 *
 * Guards against a cycle (which should never reach here — the curriculum
 * audit already rejects a `parents` cycle before this ever runs) by
 * refusing to revisit a node, the same defensive stance `getAncestorPath`
 * takes for the same reason.
 */
export function layoutTree(
  roots: MapNodeId[],
  childrenOf: (id: MapNodeId) => MapNodeId[],
  options: TreeLayoutOptions = {},
): Map<MapNodeId, TreePosition> {
  const columnWidth = options.columnWidth ?? 260;
  const rowHeight = options.rowHeight ?? 160;
  const positions = new Map<MapNodeId, TreePosition>();
  const visiting = new Set<MapNodeId>();
  let nextColumn = 0;

  function visit(id: MapNodeId, depth: number): number {
    if (positions.has(id) || visiting.has(id)) {
      return positions.get(id)?.x ?? nextColumn * columnWidth;
    }
    visiting.add(id);

    const children = childrenOf(id);
    const x =
      children.length === 0
        ? nextColumn++ * columnWidth
        : average(children.map((childId) => visit(childId, depth + 1)));

    positions.set(id, { x, y: depth * rowHeight, depth });
    visiting.delete(id);
    return x;
  }

  for (const root of roots) visit(root, 0);

  return positions;
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Ids that name every concept on a path from a domain entry point down to
 * `conceptId`, expanded so the map can guarantee that path is visible —
 * what search uses to "show its branch" without the learner clicking
 * through each level by hand.
 */
export function idsToReveal(ancestorPath: Concept[]): Set<MapNodeId> {
  if (ancestorPath.length === 0) return new Set();

  const ids = new Set<MapNodeId>([domainNodeId(ancestorPath[0].domain)]);
  // Every concept up to, but not including, the target itself needs to be
  // *expanded*; the target needs to be *visible*, which its parent's
  // expansion already guarantees, but adding it too is harmless and makes
  // "expand this concept's own children next" free if the learner does it.
  for (const concept of ancestorPath) ids.add(concept.id);
  return ids;
}
