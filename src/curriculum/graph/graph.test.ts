import { describe, expect, it } from "vitest";
import { conceptSchema, type Concept, type ConceptInput } from "../metadata";
import { findCycle, getDependents, getPrerequisites } from "./graph";

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

describe("getPrerequisites", () => {
  it("resolves prerequisite ids to concepts", () => {
    const a = makeConcept({ id: "a" });
    const b = makeConcept({ id: "b", prerequisites: [a.id] });
    expect(getPrerequisites(b, [a, b])).toEqual([a]);
  });
});

describe("getDependents", () => {
  it("finds concepts that require the given concept", () => {
    const a = makeConcept({ id: "a" });
    const b = makeConcept({ id: "b", prerequisites: [a.id] });
    const c = makeConcept({ id: "c" });
    expect(getDependents(a.id, [a, b, c])).toEqual([b]);
  });
});

describe("findCycle", () => {
  it("returns an empty array for a valid DAG", () => {
    const a = makeConcept({ id: "a" });
    const b = makeConcept({ id: "b", prerequisites: [a.id] });
    expect(findCycle([a, b])).toEqual([]);
  });

  it("detects a direct cycle", () => {
    const a = makeConcept({ id: "a", prerequisites: ["b"] });
    const b = makeConcept({ id: "b", prerequisites: [a.id] });
    expect(findCycle([a, b]).length).toBeGreaterThan(0);
  });
});
