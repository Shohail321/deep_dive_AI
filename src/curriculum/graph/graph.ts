import type { Concept, ConceptId, Domain, RelationKey } from "../metadata";

export function indexById(concepts: Concept[]): Map<ConceptId, Concept> {
  return new Map(concepts.map((concept) => [concept.id, concept]));
}

/**
 * The curriculum in the shape graph algorithms want: every authored edge
 * indexed, plus the inverse edges that are never stored on a concept.
 */
export interface ConceptGraph {
  concepts: Concept[];
  byId: Map<ConceptId, Concept>;
  /** Inverse of `parents`. */
  children: Map<ConceptId, ConceptId[]>;
  /** Inverse of `prerequisites`: what this concept unlocks. */
  followUps: Map<ConceptId, ConceptId[]>;
  /** `relatedConcepts` closed over both directions, so the link need only be authored once. */
  related: Map<ConceptId, ConceptId[]>;
  /** Concepts with no parents — the entry points of the taxonomy. */
  roots: ConceptId[];
}

function push(
  map: Map<ConceptId, ConceptId[]>,
  key: ConceptId,
  value: ConceptId,
) {
  const existing = map.get(key);
  if (existing) {
    if (!existing.includes(value)) existing.push(value);
    return;
  }
  map.set(key, [value]);
}

export function buildConceptGraph(concepts: Concept[]): ConceptGraph {
  const byId = indexById(concepts);
  const children = new Map<ConceptId, ConceptId[]>();
  const followUps = new Map<ConceptId, ConceptId[]>();
  const related = new Map<ConceptId, ConceptId[]>();

  for (const concept of concepts) {
    for (const parentId of concept.relationships.parents) {
      push(children, parentId, concept.id);
    }
    for (const prerequisiteId of concept.relationships.prerequisites) {
      push(followUps, prerequisiteId, concept.id);
    }
    for (const relatedId of concept.relationships.relatedConcepts) {
      push(related, concept.id, relatedId);
      push(related, relatedId, concept.id);
    }
  }

  const roots = concepts
    .filter((concept) => concept.relationships.parents.length === 0)
    .map((concept) => concept.id);

  return { concepts, byId, children, followUps, related, roots };
}

export function getChildren(graph: ConceptGraph, id: ConceptId): Concept[] {
  return resolve(graph, graph.children.get(id));
}

export function getFollowUps(graph: ConceptGraph, id: ConceptId): Concept[] {
  return resolve(graph, graph.followUps.get(id));
}

export function getRelated(graph: ConceptGraph, id: ConceptId): Concept[] {
  return resolve(graph, graph.related.get(id));
}

function resolve(graph: ConceptGraph, ids: ConceptId[] | undefined): Concept[] {
  if (!ids) return [];
  return ids
    .map((id) => graph.byId.get(id))
    .filter((concept): concept is Concept => concept !== undefined);
}

/** Ad-hoc lookups that do not need a built graph. */
export function getPrerequisites(
  concept: Concept,
  concepts: Concept[],
): Concept[] {
  const byId = indexById(concepts);
  return concept.relationships.prerequisites
    .map((id) => byId.get(id))
    .filter((c): c is Concept => c !== undefined);
}

export function getDependents(
  conceptId: ConceptId,
  concepts: Concept[],
): Concept[] {
  return concepts.filter((concept) =>
    concept.relationships.prerequisites.includes(conceptId),
  );
}

/**
 * Depth-first cycle detection over one relation. Returns the concept ids
 * forming a cycle, or an empty array when that relation is acyclic.
 */
export function findCycle(
  concepts: Concept[],
  relation: Extract<RelationKey, "parents" | "prerequisites"> = "prerequisites",
): ConceptId[] {
  const byId = indexById(concepts);
  const state = new Map<ConceptId, "visiting" | "done">();
  const path: ConceptId[] = [];

  function visit(id: ConceptId): ConceptId[] | null {
    const status = state.get(id);
    if (status === "done") return null;
    if (status === "visiting") {
      return path.slice(path.indexOf(id)).concat(id);
    }

    state.set(id, "visiting");
    path.push(id);

    const concept = byId.get(id);
    if (concept) {
      for (const nextId of concept.relationships[relation]) {
        const cycle = visit(nextId);
        if (cycle) return cycle;
      }
    }

    path.pop();
    state.set(id, "done");
    return null;
  }

  for (const concept of concepts) {
    const cycle = visit(concept.id);
    if (cycle) return cycle;
  }

  return [];
}

/**
 * Concepts unreachable by walking parent-to-child from a root. A concept
 * trapped in a parent cycle has no root above it and surfaces here.
 */
export function findUnreachable(graph: ConceptGraph): ConceptId[] {
  const seen = new Set<ConceptId>();
  const queue = [...graph.roots];

  while (queue.length > 0) {
    const id = queue.shift() as ConceptId;
    if (seen.has(id)) continue;
    seen.add(id);
    queue.push(...(graph.children.get(id) ?? []));
  }

  return graph.concepts
    .map((concept) => concept.id)
    .filter((id) => !seen.has(id));
}

/**
 * The concept that introduces each domain: the one whose parents all sit
 * outside it. Derived rather than listed, so naming the entry point of a
 * domain is never a second place to keep in sync — which is what the
 * homepage's rings render.
 *
 * A domain with several such concepts keeps the first in curriculum order;
 * that ambiguity is a curriculum problem, not something to resolve here.
 */
export function getDomainRoots(graph: ConceptGraph): Map<Domain, Concept> {
  const roots = new Map<Domain, Concept>();

  for (const concept of graph.concepts) {
    if (roots.has(concept.domain)) continue;

    const hasParentInSameDomain = concept.relationships.parents.some(
      (parentId) => graph.byId.get(parentId)?.domain === concept.domain,
    );

    if (!hasParentInSameDomain) {
      roots.set(concept.domain, concept);
    }
  }

  return roots;
}

export function getConceptsInDomain(
  graph: ConceptGraph,
  domain: Domain,
): Concept[] {
  return graph.concepts.filter((concept) => concept.domain === domain);
}

/** A concept with no edges at all: nothing links to it and it links to nothing. */
export function findOrphans(graph: ConceptGraph): ConceptId[] {
  return graph.concepts
    .filter((concept) => {
      const { parents, prerequisites, recommendedPrerequisites } =
        concept.relationships;
      const hasOutgoing =
        parents.length > 0 ||
        prerequisites.length > 0 ||
        recommendedPrerequisites.length > 0;
      const hasIncoming =
        (graph.children.get(concept.id)?.length ?? 0) > 0 ||
        (graph.followUps.get(concept.id)?.length ?? 0) > 0;
      const hasRelated = (graph.related.get(concept.id)?.length ?? 0) > 0;

      return !hasOutgoing && !hasIncoming && !hasRelated;
    })
    .map((concept) => concept.id);
}
