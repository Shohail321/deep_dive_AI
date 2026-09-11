import { describe, expect, it } from "vitest";
import { auditCurriculum, inspectCurriculum } from "./audit";
import { hasErrors } from "./issues";
import { makeConcept } from "./testFixtures";

describe("auditCurriculum", () => {
  it("reports nothing for a consistent curriculum", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"], prerequisites: ["root"] },
    });

    expect(auditCurriculum([root, child])).toEqual([]);
  });

  it("detects duplicate concept ids", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "root" }),
      makeConcept({ id: "root", slug: "root-again" }),
    ]);

    expect(issues).toContainEqual({
      type: "duplicate-id",
      severity: "error",
      conceptId: "root",
    });
  });

  it("detects duplicate slugs across different concepts", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "one", slug: "shared" }),
      makeConcept({ id: "two", slug: "shared" }),
    ]);

    expect(issues).toContainEqual({
      type: "duplicate-slug",
      severity: "error",
      slug: "shared",
      conceptIds: ["one", "two"],
    });
  });

  it("detects references to concepts that do not exist, tagged by relation", () => {
    const issues = auditCurriculum([
      makeConcept({
        id: "root",
        relationships: { relatedConcepts: ["ghost"] },
      }),
    ]);

    expect(issues).toContainEqual({
      type: "unknown-reference",
      severity: "error",
      conceptId: "root",
      relation: "relatedConcepts",
      missingId: "ghost",
    });
  });

  it("detects a missing prerequisite target", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "root", relationships: { prerequisites: ["ghost"] } }),
    ]);

    expect(issues).toContainEqual({
      type: "unknown-reference",
      severity: "error",
      conceptId: "root",
      relation: "prerequisites",
      missingId: "ghost",
    });
  });

  it("detects self references", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "root", relationships: { prerequisites: ["root"] } }),
    ]);

    expect(issues).toContainEqual({
      type: "self-reference",
      severity: "error",
      conceptId: "root",
      relation: "prerequisites",
    });
  });

  it("does not report a self reference as an unknown reference as well", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "root", relationships: { parents: ["root"] } }),
    ]);

    expect(
      issues.filter((issue) => issue.type === "unknown-reference"),
    ).toEqual([]);
  });

  it("detects cycles in the prerequisite graph", () => {
    const a = makeConcept({
      id: "a",
      relationships: { parents: ["root"], prerequisites: ["b"] },
    });
    const b = makeConcept({
      id: "b",
      relationships: { parents: ["root"], prerequisites: ["a"] },
    });
    const root = makeConcept({ id: "root" });

    const cycles = auditCurriculum([root, a, b]).filter(
      (issue) => issue.type === "cycle",
    );

    expect(cycles).toHaveLength(1);
    expect(cycles[0]).toMatchObject({
      type: "cycle",
      severity: "error",
      relation: "prerequisites",
    });
  });

  it("detects cycles in the parent graph", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "a", relationships: { parents: ["b"] } }),
      makeConcept({ id: "b", relationships: { parents: ["a"] } }),
    ]);

    expect(
      issues.some(
        (issue) => issue.type === "cycle" && issue.relation === "parents",
      ),
    ).toBe(true);
  });

  it("flags an orphan concept that nothing links to and which links to nothing", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"] },
    });
    const floating = makeConcept({ id: "floating" });

    const issues = auditCurriculum([root, child, floating]);

    expect(issues).toContainEqual({
      type: "orphan-concept",
      severity: "warning",
      conceptId: "floating",
    });
    expect(
      issues.some(
        (issue) =>
          issue.type === "orphan-concept" && issue.conceptId === "root",
      ),
    ).toBe(false);
  });

  it("flags concepts unreachable from any root", () => {
    // a and b parent each other, so neither is a root and neither is reachable.
    const issues = auditCurriculum([
      makeConcept({ id: "a", relationships: { parents: ["b"] } }),
      makeConcept({ id: "b", relationships: { parents: ["a"] } }),
    ]);

    expect(issues).toContainEqual({
      type: "unreachable-concept",
      severity: "warning",
      conceptId: "a",
    });
  });

  it("flags a concept marked complete with no lesson", () => {
    const issues = auditCurriculum([
      makeConcept({
        id: "root",
        status: "complete",
        learningObjectives: ["Understand the fixture"],
      }),
    ]);

    expect(issues).toContainEqual({
      type: "incomplete-metadata",
      severity: "warning",
      conceptId: "root",
      detail: "marked complete but has no lesson",
    });
  });

  it("flags visualization metadata disagreeing with the content flags", () => {
    const missingMetadata = auditCurriculum([
      makeConcept({
        id: "root",
        content: { hasVisualization: true },
      }),
    ]);

    expect(missingMetadata).toContainEqual({
      type: "incomplete-metadata",
      severity: "warning",
      conceptId: "root",
      detail:
        "declares a visualization but no visualizationType/interactionType",
    });

    const strayMetadata = auditCurriculum([
      makeConcept({
        id: "root",
        visualization: {
          visualizationType: "plot",
          interactionType: "drag",
        },
      }),
    ]);

    expect(strayMetadata).toContainEqual({
      type: "incomplete-metadata",
      severity: "warning",
      conceptId: "root",
      detail: "has visualization metadata but hasVisualization is false",
    });
  });

  it("flags a concept in review with no learning objectives", () => {
    const issues = auditCurriculum([
      makeConcept({ id: "root", status: "review" }),
    ]);

    expect(issues).toContainEqual({
      type: "incomplete-metadata",
      severity: "warning",
      conceptId: "root",
      detail: "is review but lists no learning objectives",
    });
  });
});

describe("inspectCurriculum", () => {
  it("reports a concept with no domain", () => {
    const { issues } = inspectCurriculum([
      {
        id: "no-domain",
        slug: "no-domain",
        title: "No domain",
        summary: "A record that never declares which domain it belongs to.",
        category: "Fixtures",
        difficulty: "beginner",
        estimatedMinutes: 10,
        importance: {
          intuitive: 1,
          mathematical: 1,
          coding: 1,
          practical: 1,
          research: 1,
        },
        status: "planned",
      },
    ]);

    expect(issues).toContainEqual({
      type: "missing-domain",
      severity: "error",
      index: 0,
      conceptId: "no-domain",
    });
  });

  it("collects malformed records instead of throwing, and still audits the rest", () => {
    const { concepts, issues } = inspectCurriculum([
      { id: "broken" },
      makeConcept({ id: "fine" }),
    ]);

    expect(concepts.map((concept) => concept.id)).toEqual(["fine"]);
    expect(
      issues.some(
        (issue) => issue.type === "invalid-concept" && issue.index === 0,
      ),
    ).toBe(true);
    expect(hasErrors(issues)).toBe(true);
  });
});
