import type { RelationKey } from "../metadata";

export type IssueSeverity = "error" | "warning";

/**
 * Everything the curriculum can be wrong about, in one union.
 *
 * "Missing prerequisite targets" is not a separate variant: it is
 * `unknown-reference` with `relation: "prerequisites"`. One relation-tagged
 * variant covers every relationship uniformly, and stays correct when a new
 * relationship is added.
 */
export type CurriculumIssue =
  // --- Schema layer: raised while parsing records ---
  | {
      type: "invalid-concept";
      severity: "error";
      index: number;
      conceptId?: string;
      detail: string;
    }
  | {
      type: "missing-domain";
      severity: "error";
      index: number;
      conceptId?: string;
    }
  // --- Graph layer: raised over already-valid concepts ---
  | { type: "duplicate-id"; severity: "error"; conceptId: string }
  | {
      type: "duplicate-slug";
      severity: "error";
      slug: string;
      conceptIds: string[];
    }
  | {
      type: "unknown-reference";
      severity: "error";
      conceptId: string;
      relation: RelationKey;
      missingId: string;
    }
  | {
      type: "self-reference";
      severity: "error";
      conceptId: string;
      relation: RelationKey;
    }
  | {
      type: "cycle";
      severity: "error";
      relation: "parents" | "prerequisites";
      cycle: string[];
    }
  | { type: "orphan-concept"; severity: "warning"; conceptId: string }
  | { type: "unreachable-concept"; severity: "warning"; conceptId: string }
  | {
      type: "incomplete-metadata";
      severity: "warning";
      conceptId: string;
      detail: string;
    };

export function hasErrors(issues: CurriculumIssue[]): boolean {
  return issues.some((issue) => issue.severity === "error");
}

export function formatIssue(issue: CurriculumIssue): string {
  switch (issue.type) {
    case "invalid-concept":
      return `[${issue.severity}] invalid-concept at index ${issue.index}${issue.conceptId ? ` (${issue.conceptId})` : ""}: ${issue.detail}`;
    case "missing-domain":
      return `[${issue.severity}] missing-domain at index ${issue.index}${issue.conceptId ? ` (${issue.conceptId})` : ""}`;
    case "duplicate-id":
      return `[${issue.severity}] duplicate-id: ${issue.conceptId}`;
    case "duplicate-slug":
      return `[${issue.severity}] duplicate-slug: ${issue.slug} used by ${issue.conceptIds.join(", ")}`;
    case "unknown-reference":
      return `[${issue.severity}] unknown-reference: ${issue.conceptId}.${issue.relation} -> ${issue.missingId}`;
    case "self-reference":
      return `[${issue.severity}] self-reference: ${issue.conceptId}.${issue.relation}`;
    case "cycle":
      return `[${issue.severity}] cycle in ${issue.relation}: ${issue.cycle.join(" -> ")}`;
    case "orphan-concept":
      return `[${issue.severity}] orphan-concept: ${issue.conceptId}`;
    case "unreachable-concept":
      return `[${issue.severity}] unreachable-concept: ${issue.conceptId}`;
    case "incomplete-metadata":
      return `[${issue.severity}] incomplete-metadata: ${issue.conceptId} — ${issue.detail}`;
  }
}
