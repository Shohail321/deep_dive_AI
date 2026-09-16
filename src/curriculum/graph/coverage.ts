import type {
  AuthoringStatus,
  Concept,
  ConceptId,
  Difficulty,
  Domain,
} from "../metadata";
import { auditCurriculum } from "./audit";
import type { CurriculumIssue } from "./issues";

export type ContentKind = "lesson" | "visualization" | "quiz" | "playground";

/**
 * One concept, joined with everything the graph knows about it that isn't
 * stored on the record itself: whether it's an orphan, unreachable, or named
 * in a structural issue. This is the row the admin UI and the CLI audit both
 * render from, so the two can never disagree about a concept's state.
 */
export interface ConceptCoverageRow {
  id: ConceptId;
  title: string;
  domain: Domain;
  category: string;
  difficulty: Difficulty;
  status: AuthoringStatus;
  hasLesson: boolean;
  hasVisualization: boolean;
  hasQuiz: boolean;
  hasPlayground: boolean;
  hasPrerequisites: boolean;
  isOrphan: boolean;
  isUnreachable: boolean;
  /** Structural issues naming this concept specifically — empty for most rows. */
  issues: CurriculumIssue[];
}

function issueConceptIds(issue: CurriculumIssue): string[] {
  switch (issue.type) {
    case "invalid-concept":
    case "missing-domain":
    case "duplicate-id":
    case "unknown-reference":
    case "self-reference":
    case "orphan-concept":
    case "unreachable-concept":
    case "incomplete-metadata":
      return issue.conceptId ? [issue.conceptId] : [];
    case "duplicate-slug":
      return issue.conceptIds;
    case "cycle":
      return issue.cycle;
  }
}

/**
 * Every row a coverage report needs, computed once so filtering and search
 * stay cheap. `auditCurriculum` runs a single time here rather than once per
 * concept — cycle detection alone is too expensive to repeat per row.
 */
export function buildCoverageRows(concepts: Concept[]): ConceptCoverageRow[] {
  const issues = auditCurriculum(concepts);
  const issuesByConceptId = new Map<string, CurriculumIssue[]>();

  for (const issue of issues) {
    for (const conceptId of issueConceptIds(issue)) {
      const existing = issuesByConceptId.get(conceptId);
      if (existing) existing.push(issue);
      else issuesByConceptId.set(conceptId, [issue]);
    }
  }

  return concepts.map((concept) => ({
    id: concept.id,
    title: concept.title,
    domain: concept.domain,
    category: concept.category,
    difficulty: concept.difficulty,
    status: concept.status,
    hasLesson: concept.content.hasLesson,
    hasVisualization: concept.content.hasVisualization,
    hasQuiz: concept.content.hasQuiz,
    hasPlayground: concept.content.hasPlayground,
    hasPrerequisites: concept.relationships.prerequisites.length > 0,
    isOrphan:
      issuesByConceptId
        .get(concept.id)
        ?.some((issue) => issue.type === "orphan-concept") ?? false,
    isUnreachable:
      issuesByConceptId
        .get(concept.id)
        ?.some((issue) => issue.type === "unreachable-concept") ?? false,
    issues: issuesByConceptId.get(concept.id) ?? [],
  }));
}

export interface DomainCoverage {
  domain: Domain;
  total: number;
  withLesson: number;
  withVisualization: number;
  withQuiz: number;
  withPlayground: number;
  lessonPercent: number;
  visualizationPercent: number;
  quizPercent: number;
  playgroundPercent: number;
}

function percent(count: number, total: number): number {
  return total === 0 ? 0 : Math.round((count / total) * 100);
}

/** One row per domain that has at least one concept, ordered by domain size. */
export function getDomainCoverage(
  rows: ConceptCoverageRow[],
): DomainCoverage[] {
  const byDomain = new Map<Domain, ConceptCoverageRow[]>();
  for (const row of rows) {
    const existing = byDomain.get(row.domain);
    if (existing) existing.push(row);
    else byDomain.set(row.domain, [row]);
  }

  return Array.from(byDomain.entries())
    .map(([domain, domainRows]) => {
      const total = domainRows.length;
      const withLesson = domainRows.filter((r) => r.hasLesson).length;
      const withVisualization = domainRows.filter(
        (r) => r.hasVisualization,
      ).length;
      const withQuiz = domainRows.filter((r) => r.hasQuiz).length;
      const withPlayground = domainRows.filter((r) => r.hasPlayground).length;

      return {
        domain,
        total,
        withLesson,
        withVisualization,
        withQuiz,
        withPlayground,
        lessonPercent: percent(withLesson, total),
        visualizationPercent: percent(withVisualization, total),
        quizPercent: percent(withQuiz, total),
        playgroundPercent: percent(withPlayground, total),
      };
    })
    .sort((a, b) => b.total - a.total);
}

const CONTENT_ROW_FLAG: Record<
  ContentKind,
  "hasLesson" | "hasVisualization" | "hasQuiz" | "hasPlayground"
> = {
  lesson: "hasLesson",
  visualization: "hasVisualization",
  quiz: "hasQuiz",
  playground: "hasPlayground",
};

/**
 * Answers "which concepts have/lack a lesson (or visualization, quiz,
 * playground)?" directly, for the report sections that are simple has/lacks
 * lists rather than a filtered table.
 */
export function partitionByContent(
  rows: ConceptCoverageRow[],
  kind: ContentKind,
): { withContent: ConceptCoverageRow[]; withoutContent: ConceptCoverageRow[] } {
  const flag = CONTENT_ROW_FLAG[kind];
  return {
    withContent: rows.filter((row) => row[flag]),
    withoutContent: rows.filter((row) => !row[flag]),
  };
}

export type ContentFilterValue = "any" | "has" | "missing";

export interface CoverageFilter {
  domain?: Domain;
  category?: string;
  difficulty?: Difficulty;
  status?: AuthoringStatus;
  lesson?: ContentFilterValue;
  visualization?: ContentFilterValue;
  quiz?: ContentFilterValue;
  playground?: ContentFilterValue;
  /** Matched against id and title, case-insensitively. */
  search?: string;
}

function matchesContentFilter(has: boolean, filter?: ContentFilterValue) {
  if (!filter || filter === "any") return true;
  return filter === "has" ? has : !has;
}

/**
 * Every filter dimension the auditor exposes, applied as a single pass. Pure
 * and synchronous so the admin UI can call it on every keystroke without
 * debouncing, and the CLI can reuse it for nothing extra.
 */
export function filterCoverageRows(
  rows: ConceptCoverageRow[],
  filter: CoverageFilter,
): ConceptCoverageRow[] {
  const search = filter.search?.trim().toLowerCase();

  return rows.filter((row) => {
    if (filter.domain && row.domain !== filter.domain) return false;
    if (filter.category && row.category !== filter.category) return false;
    if (filter.difficulty && row.difficulty !== filter.difficulty) return false;
    if (filter.status && row.status !== filter.status) return false;
    if (!matchesContentFilter(row.hasLesson, filter.lesson)) return false;
    if (!matchesContentFilter(row.hasVisualization, filter.visualization))
      return false;
    if (!matchesContentFilter(row.hasQuiz, filter.quiz)) return false;
    if (!matchesContentFilter(row.hasPlayground, filter.playground))
      return false;
    if (
      search &&
      !row.id.toLowerCase().includes(search) &&
      !row.title.toLowerCase().includes(search)
    ) {
      return false;
    }
    return true;
  });
}

/** Concepts with no `prerequisites` edge at all — expected for entry points, worth a look otherwise. */
export function rowsWithoutPrerequisites(
  rows: ConceptCoverageRow[],
): ConceptCoverageRow[] {
  return rows.filter((row) => !row.hasPrerequisites);
}

/** Every unique (domain, category) pair present, for building filter options. */
export function getCategoriesByDomain(
  rows: ConceptCoverageRow[],
): Map<Domain, string[]> {
  const byDomain = new Map<Domain, Set<string>>();
  for (const row of rows) {
    const existing = byDomain.get(row.domain);
    if (existing) existing.add(row.category);
    else byDomain.set(row.domain, new Set([row.category]));
  }

  return new Map(
    Array.from(byDomain.entries()).map(([domain, categories]) => [
      domain,
      Array.from(categories).sort(),
    ]),
  );
}
