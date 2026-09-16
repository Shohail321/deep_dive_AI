export {
  indexById,
  buildConceptGraph,
  getChildren,
  getFollowUps,
  getRelated,
  getPrerequisites,
  getDependents,
  findCycle,
  findUnreachable,
  findOrphans,
  getDomainRoots,
  getConceptsInDomain,
} from "./graph";
export type { ConceptGraph } from "./graph";

export { auditCurriculum, inspectCurriculum } from "./audit";
export { parseCurriculum } from "./parse";
export type { ParsedCurriculum } from "./parse";
export { summarizeCurriculum, formatCurriculumSummary } from "./summary";
export type { CurriculumSummary } from "./summary";
export { hasErrors, formatIssue } from "./issues";
export type { CurriculumIssue, IssueSeverity } from "./issues";

export {
  buildCoverageRows,
  getDomainCoverage,
  filterCoverageRows,
  partitionByContent,
  rowsWithoutPrerequisites,
  getCategoriesByDomain,
} from "./coverage";
export type {
  ConceptCoverageRow,
  DomainCoverage,
  CoverageFilter,
  ContentFilterValue,
  ContentKind,
} from "./coverage";
