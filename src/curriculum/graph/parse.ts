import { conceptSchema, type Concept } from "../metadata";
import type { CurriculumIssue } from "./issues";

export interface ParsedCurriculum {
  /** Only the records that validated — the audit runs over these. */
  concepts: Concept[];
  issues: CurriculumIssue[];
}

function readId(record: unknown): string | undefined {
  if (typeof record !== "object" || record === null) return undefined;
  const id = (record as { id?: unknown }).id;
  return typeof id === "string" ? id : undefined;
}

/**
 * Schema layer. Checks that need to see malformed input live here, because
 * by the time a record is a `Concept` the type system already guarantees it
 * has a domain, an id, and so on.
 *
 * Invalid records are collected rather than thrown, so one bad concept
 * reports alongside every other problem instead of masking them.
 */
export function parseCurriculum(records: unknown[]): ParsedCurriculum {
  const concepts: Concept[] = [];
  const issues: CurriculumIssue[] = [];

  records.forEach((record, index) => {
    const result = conceptSchema.safeParse(record);

    if (result.success) {
      concepts.push(result.data);
      return;
    }

    const conceptId = readId(record);

    for (const issue of result.error.issues) {
      if (issue.path[0] === "domain") {
        issues.push({
          type: "missing-domain",
          severity: "error",
          index,
          conceptId,
        });
        continue;
      }

      const path = issue.path.join(".") || "(root)";
      issues.push({
        type: "invalid-concept",
        severity: "error",
        index,
        conceptId,
        detail: `${path}: ${issue.message}`,
      });
    }
  });

  return { concepts, issues };
}
