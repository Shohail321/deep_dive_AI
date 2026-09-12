import type { Concept, Difficulty, Domain } from "../metadata";
import { auditCurriculum } from "./audit";
import { buildConceptGraph, findOrphans } from "./graph";

export interface CurriculumSummary {
  total: number;
  byDomain: Record<string, number>;
  byDifficulty: Record<string, number>;
  byStatus: Record<string, number>;
  orphanCount: number;
  /** References pointing at a concept that does not exist, across all relations. */
  invalidRelationshipCount: number;
  prerequisiteCycleCount: number;
  unreachableCount: number;
  /** Concepts with no lesson yet — the honest measure of how much is written. */
  withoutLessonCount: number;
}

function tally<T extends string>(values: T[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const value of values) {
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
}

/**
 * The state of the curriculum in numbers: how much is covered, how it is
 * spread, and what is structurally broken.
 *
 * Counts are derived from the audit rather than recomputed, so the report and
 * the validation can never disagree about how many problems there are.
 */
export function summarizeCurriculum(concepts: Concept[]): CurriculumSummary {
  const issues = auditCurriculum(concepts);
  const graph = buildConceptGraph(concepts);

  return {
    total: concepts.length,
    byDomain: tally(concepts.map((concept) => concept.domain as Domain)),
    byDifficulty: tally(
      concepts.map((concept) => concept.difficulty as Difficulty),
    ),
    byStatus: tally(concepts.map((concept) => concept.status)),
    orphanCount: findOrphans(graph).length,
    invalidRelationshipCount: issues.filter(
      (issue) => issue.type === "unknown-reference",
    ).length,
    prerequisiteCycleCount: issues.filter(
      (issue) => issue.type === "cycle" && issue.relation === "prerequisites",
    ).length,
    unreachableCount: issues.filter(
      (issue) => issue.type === "unreachable-concept",
    ).length,
    withoutLessonCount: concepts.filter((concept) => !concept.content.hasLesson)
      .length,
  };
}

function formatCounts(counts: Record<string, number>): string {
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([key, count]) => `    ${key.padEnd(14)} ${count}`)
    .join("\n");
}

export function formatCurriculumSummary(summary: CurriculumSummary): string {
  return [
    `Curriculum summary — ${summary.total} concepts`,
    "",
    "  By domain:",
    formatCounts(summary.byDomain),
    "",
    "  By difficulty:",
    formatCounts(summary.byDifficulty),
    "",
    "  By authoring status:",
    formatCounts(summary.byStatus),
    "",
    "  Structure:",
    `    orphans              ${summary.orphanCount}`,
    `    invalid references   ${summary.invalidRelationshipCount}`,
    `    prerequisite cycles  ${summary.prerequisiteCycleCount}`,
    `    unreachable          ${summary.unreachableCount}`,
    "",
    "  Coverage:",
    `    concepts without a lesson  ${summary.withoutLessonCount} of ${summary.total}`,
  ].join("\n");
}
