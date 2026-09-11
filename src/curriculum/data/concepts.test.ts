import { describe, expect, it } from "vitest";
import {
  auditCurriculum,
  buildConceptGraph,
  formatIssue,
  hasErrors,
} from "../graph";
import { curriculumSchema } from "../metadata";
import { artificialIntelligence, concepts, neuralNetwork } from ".";

describe("concept fixtures", () => {
  it("all satisfy the concept schema", () => {
    const result = curriculumSchema.safeParse(concepts);
    expect(result.success).toBe(true);
  });

  it("pass the curriculum audit with no errors", () => {
    const issues = auditCurriculum(concepts);
    const errors = issues.filter((issue) => issue.severity === "error");

    // Formatted rather than compared as raw objects, so a failure names the
    // broken edge instead of dumping every field of both concepts.
    expect(errors.map(formatIssue)).toEqual([]);
    expect(hasErrors(issues)).toBe(false);
  });

  it("currently raise no warnings either", () => {
    // Warnings are the normal state of a curriculum mid-write, so this is a
    // claim about these fixtures being exemplary, not an invariant for the
    // curriculum at large. Relax it rather than contorting real concepts.
    const warnings = auditCurriculum(concepts).filter(
      (issue) => issue.severity === "warning",
    );

    expect(warnings.map(formatIssue)).toEqual([]);
  });

  it("form a single tree rooted at artificial intelligence", () => {
    const graph = buildConceptGraph(concepts);
    expect(graph.roots).toEqual(["artificial-intelligence"]);
  });

  it("derive the inverse edges the fixtures never declare", () => {
    const graph = buildConceptGraph(concepts);

    expect(graph.children.get(artificialIntelligence.id)).toEqual([
      "machine-learning",
    ]);
    expect(graph.followUps.get(neuralNetwork.id)).toEqual(["transformer"]);
  });

  it("exercise every authoring status the schema allows", () => {
    const statuses = new Set(concepts.map((concept) => concept.status));
    expect(statuses.has("planned")).toBe(true);
    expect(statuses.has("drafting")).toBe(true);
  });
});
