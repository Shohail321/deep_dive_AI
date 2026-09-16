/**
 * CI-runnable curriculum audit.
 *
 * Run with `npm run audit:curriculum`. Prints the same report as
 * `formatCurriculumSummary` plus every structural issue found, then exits:
 *
 *   0  if the graph has no errors (warnings are fine — a curriculum being
 *      written is full of them, and content that is merely `planned` must
 *      never fail a build)
 *   1  if the graph has an error: a duplicate id or slug, a reference to a
 *      concept that does not exist, a self-reference, or a prerequisite or
 *      parent cycle
 *
 * A malformed concept record fails earlier than this, at `defineConcept`
 * inside the area file that defines it — that is a thrown exception, not an
 * audit finding, so `npm run build` and this script both refuse to proceed
 * without it needing special handling here.
 */
import { concepts } from "../src/curriculum/data";
import {
  auditCurriculum,
  formatCurriculumSummary,
  formatIssue,
  hasErrors,
  summarizeCurriculum,
} from "../src/curriculum/graph";

const issues = auditCurriculum(concepts);
const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warning");

console.log(formatCurriculumSummary(summarizeCurriculum(concepts)));

if (issues.length > 0) {
  console.log(`\n${errors.length} error(s):`);
  for (const issue of errors) console.log("  " + formatIssue(issue));

  console.log(`\n${warnings.length} warning(s):`);
  for (const issue of warnings) console.log("  " + formatIssue(issue));
} else {
  console.log("\nno issues");
}

if (hasErrors(issues)) {
  console.log(
    `\naudit failed: ${errors.length} structural error(s) in the curriculum graph`,
  );
  process.exit(1);
}

console.log("\naudit passed: no structural errors");
process.exit(0);
