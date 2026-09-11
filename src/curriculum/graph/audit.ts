import { RELATION_KEYS, type Concept } from "../metadata";
import {
  buildConceptGraph,
  findCycle,
  findOrphans,
  findUnreachable,
  indexById,
} from "./graph";
import type { CurriculumIssue } from "./issues";
import { parseCurriculum } from "./parse";

function auditIdentity(concepts: Concept[]): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];

  const idCounts = new Map<string, number>();
  const slugOwners = new Map<string, string[]>();

  for (const concept of concepts) {
    idCounts.set(concept.id, (idCounts.get(concept.id) ?? 0) + 1);
    slugOwners.set(concept.slug, [
      ...(slugOwners.get(concept.slug) ?? []),
      concept.id,
    ]);
  }

  for (const [conceptId, count] of idCounts) {
    if (count > 1) {
      issues.push({ type: "duplicate-id", severity: "error", conceptId });
    }
  }

  for (const [slug, conceptIds] of slugOwners) {
    if (conceptIds.length > 1) {
      issues.push({
        type: "duplicate-slug",
        severity: "error",
        slug,
        conceptIds,
      });
    }
  }

  return issues;
}

function auditReferences(concepts: Concept[]): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const byId = indexById(concepts);

  for (const concept of concepts) {
    for (const relation of RELATION_KEYS) {
      for (const targetId of concept.relationships[relation]) {
        if (targetId === concept.id) {
          issues.push({
            type: "self-reference",
            severity: "error",
            conceptId: concept.id,
            relation,
          });
          continue;
        }

        if (!byId.has(targetId)) {
          issues.push({
            type: "unknown-reference",
            severity: "error",
            conceptId: concept.id,
            relation,
            missingId: targetId,
          });
        }
      }
    }
  }

  return issues;
}

function auditCompleteness(concepts: Concept[]): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];

  for (const concept of concepts) {
    const add = (detail: string) =>
      issues.push({
        type: "incomplete-metadata",
        severity: "warning",
        conceptId: concept.id,
        detail,
      });

    if (concept.status === "complete" && !concept.content.hasLesson) {
      add("marked complete but has no lesson");
    }

    if (concept.content.hasVisualization && !concept.visualization) {
      add("declares a visualization but no visualizationType/interactionType");
    }

    if (!concept.content.hasVisualization && concept.visualization) {
      add("has visualization metadata but hasVisualization is false");
    }

    if (
      (concept.status === "review" || concept.status === "complete") &&
      concept.learningObjectives.length === 0
    ) {
      add(`is ${concept.status} but lists no learning objectives`);
    }
  }

  return issues;
}

/**
 * Graph layer. Runs over concepts that already satisfy the schema, so it can
 * assume well-formed records and look only at how they relate.
 *
 * Cycles are checked for `parents` as well as `prerequisites`: a cycle in the
 * taxonomy is just as broken, and it also strands everything beneath it.
 */
export function auditCurriculum(concepts: Concept[]): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [
    ...auditIdentity(concepts),
    ...auditReferences(concepts),
    ...auditCompleteness(concepts),
  ];

  for (const relation of ["parents", "prerequisites"] as const) {
    const cycle = findCycle(concepts, relation);
    if (cycle.length > 0) {
      issues.push({ type: "cycle", severity: "error", relation, cycle });
    }
  }

  const graph = buildConceptGraph(concepts);

  for (const conceptId of findOrphans(graph)) {
    issues.push({ type: "orphan-concept", severity: "warning", conceptId });
  }

  for (const conceptId of findUnreachable(graph)) {
    issues.push({
      type: "unreachable-concept",
      severity: "warning",
      conceptId,
    });
  }

  return issues;
}

/** Both layers over raw records: parse what you can, then audit what parsed. */
export function inspectCurriculum(records: unknown[]): {
  concepts: Concept[];
  issues: CurriculumIssue[];
} {
  const { concepts, issues } = parseCurriculum(records);
  return { concepts, issues: [...issues, ...auditCurriculum(concepts)] };
}
