import type { Concept, ConceptId } from "../metadata";

export function indexById(concepts: Concept[]): Map<ConceptId, Concept> {
  return new Map(concepts.map((concept) => [concept.id, concept]));
}

export function getPrerequisites(
  concept: Concept,
  concepts: Concept[],
): Concept[] {
  const byId = indexById(concepts);
  return concept.prerequisites
    .map((id) => byId.get(id))
    .filter((c): c is Concept => c !== undefined);
}

export function getDependents(
  conceptId: ConceptId,
  concepts: Concept[],
): Concept[] {
  return concepts.filter((concept) =>
    concept.prerequisites.includes(conceptId),
  );
}

/**
 * Depth-first cycle detection over the prerequisite graph. Returns the
 * concept ids that form a cycle, or an empty array if the graph is a DAG.
 */
export function findCycle(concepts: Concept[]): ConceptId[] {
  const byId = indexById(concepts);
  const state = new Map<ConceptId, "visiting" | "done">();
  const path: ConceptId[] = [];

  function visit(id: ConceptId): ConceptId[] | null {
    const status = state.get(id);
    if (status === "done") return null;
    if (status === "visiting") {
      const cycleStart = path.indexOf(id);
      return path.slice(cycleStart).concat(id);
    }

    state.set(id, "visiting");
    path.push(id);

    const concept = byId.get(id);
    if (concept) {
      for (const prerequisiteId of concept.prerequisites) {
        const cycle = visit(prerequisiteId);
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
