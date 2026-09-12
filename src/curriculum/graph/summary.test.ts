import { describe, expect, it } from "vitest";
import { concepts } from "../data";
import { formatCurriculumSummary, summarizeCurriculum } from "./summary";
import { makeConcept } from "./testFixtures";

describe("summarizeCurriculum", () => {
  it("counts concepts by domain, difficulty and status", () => {
    const summary = summarizeCurriculum([
      makeConcept({ id: "a", domain: "ml", difficulty: "intro" }),
      makeConcept({ id: "b", domain: "ml", difficulty: "advanced" }),
      makeConcept({
        id: "c",
        domain: "dl",
        difficulty: "advanced",
        status: "drafting",
      }),
    ]);

    expect(summary.total).toBe(3);
    expect(summary.byDomain.ml).toBe(2);
    expect(summary.byDomain.dl).toBe(1);
    expect(summary.byDifficulty.advanced).toBe(2);
    expect(summary.byStatus.drafting).toBe(1);
  });

  it("counts the structural problems the audit found", () => {
    const summary = summarizeCurriculum([
      makeConcept({ id: "a", relationships: { prerequisites: ["ghost"] } }),
      makeConcept({ id: "b", relationships: { prerequisites: ["c"] } }),
      makeConcept({ id: "c", relationships: { prerequisites: ["b"] } }),
    ]);

    expect(summary.invalidRelationshipCount).toBe(1);
    expect(summary.prerequisiteCycleCount).toBe(1);
  });

  it("counts orphans separately from unreachable concepts", () => {
    const summary = summarizeCurriculum([
      makeConcept({ id: "root" }),
      makeConcept({ id: "child", relationships: { parents: ["root"] } }),
      makeConcept({ id: "floating" }),
    ]);

    expect(summary.orphanCount).toBe(1);
    expect(summary.unreachableCount).toBe(0);
  });

  it("renders a readable report", () => {
    const report = formatCurriculumSummary(summarizeCurriculum(concepts));

    expect(report).toContain("Curriculum summary");
    expect(report).toContain("By domain:");
    expect(report).toContain("prerequisite cycles");
  });
});

describe("the live curriculum", () => {
  it("reports a clean structure", () => {
    const summary = summarizeCurriculum(concepts);

    // Printed so `npm run test` surfaces the report rather than hiding it
    // behind a separate command that would need its own TypeScript runner.
    console.log("\n" + formatCurriculumSummary(summary) + "\n");

    expect(summary.invalidRelationshipCount).toBe(0);
    expect(summary.prerequisiteCycleCount).toBe(0);
    expect(summary.orphanCount).toBe(0);
    expect(summary.unreachableCount).toBe(0);
  });
});
