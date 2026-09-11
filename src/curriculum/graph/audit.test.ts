import { describe, expect, it } from "vitest";
import { conceptSchema, type Concept, type ConceptInput } from "../metadata";
import { auditCurriculum } from "./audit";

function makeConcept(
  overrides: Partial<ConceptInput> & { id: string },
): Concept {
  return conceptSchema.parse({
    title: overrides.id,
    track: "ml",
    summary: "Test fixture concept.",
    difficulty: "beginner",
    prerequisites: [],
    relatedConcepts: [],
    status: { lesson: "planned", visualization: "planned", quiz: "planned" },
    ...overrides,
  });
}

describe("auditCurriculum", () => {
  it("returns no issues for a consistent curriculum", () => {
    const a = makeConcept({ id: "a" });
    const b = makeConcept({ id: "b", prerequisites: [a.id] });
    expect(auditCurriculum([a, b])).toEqual([]);
  });

  it("flags a prerequisite that points at a missing concept", () => {
    const a = makeConcept({
      id: "a",
      prerequisites: ["missing"],
    });
    const issues = auditCurriculum([a]);
    expect(issues).toContainEqual({
      type: "unknown-prerequisite",
      conceptId: "a",
      missingId: "missing",
    });
  });

  it("flags a related concept that points at a missing concept", () => {
    const a = makeConcept({
      id: "a",
      relatedConcepts: ["missing"],
    });
    const issues = auditCurriculum([a]);
    expect(issues).toContainEqual({
      type: "unknown-related-concept",
      conceptId: "a",
      missingId: "missing",
    });
  });

  it("flags a prerequisite cycle", () => {
    const a = makeConcept({ id: "a", prerequisites: ["b"] });
    const b = makeConcept({ id: "b", prerequisites: [a.id] });
    const issues = auditCurriculum([a, b]);
    expect(issues.some((issue) => issue.type === "cycle")).toBe(true);
  });
});
