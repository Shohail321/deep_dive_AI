import type { Concept } from "../metadata";
import { indexById, findCycle } from "./graph";

export type CurriculumIssue =
  | {
      type: "unknown-prerequisite";
      conceptId: string;
      missingId: string;
    }
  | {
      type: "unknown-related-concept";
      conceptId: string;
      missingId: string;
    }
  | {
      type: "cycle";
      cycle: string[];
    };

/**
 * Structural validation of the curriculum graph: dangling references and
 * prerequisite cycles. Deliberately does not judge content completeness
 * (see status fields on each Concept) — this only catches graph shape
 * errors that a page existing wouldn't reveal on its own.
 */
export function auditCurriculum(concepts: Concept[]): CurriculumIssue[] {
  const byId = indexById(concepts);
  const issues: CurriculumIssue[] = [];

  for (const concept of concepts) {
    for (const prerequisiteId of concept.prerequisites) {
      if (!byId.has(prerequisiteId)) {
        issues.push({
          type: "unknown-prerequisite",
          conceptId: concept.id,
          missingId: prerequisiteId,
        });
      }
    }

    for (const relatedId of concept.relatedConcepts) {
      if (!byId.has(relatedId)) {
        issues.push({
          type: "unknown-related-concept",
          conceptId: concept.id,
          missingId: relatedId,
        });
      }
    }
  }

  const cycle = findCycle(concepts);
  if (cycle.length > 0) {
    issues.push({ type: "cycle", cycle });
  }

  return issues;
}
