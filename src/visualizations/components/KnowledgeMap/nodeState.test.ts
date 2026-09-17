import { describe, expect, it } from "vitest";
import { indexById } from "@/curriculum/graph";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import type { ProgressStore } from "@/progress";
import {
  computeNodeVisualState,
  getIncompletePrerequisites,
  getMasteryVisualState,
  isCompleted,
  isMastered,
} from "./nodeState";

function storeOf(
  entries: Record<
    string,
    { lesson?: "completed" | "in-progress"; quiz?: "completed" | "in-progress" }
  >,
): ProgressStore {
  return {
    getProgress: (id) => {
      const entry = entries[id];
      if (!entry) return undefined;
      return {
        conceptId: id,
        lesson: entry.lesson ?? "not-started",
        quiz: entry.quiz ?? "not-started",
      };
    },
    setProgress: () => {},
  };
}

describe("isCompleted / isMastered", () => {
  it("is unexplored with no progress store at all", () => {
    const concept = makeConcept({ id: "a" });
    expect(isCompleted(concept)).toBe(false);
    expect(isMastered(concept)).toBe(false);
  });

  it("is completed once the lesson is finished, regardless of the quiz", () => {
    const concept = makeConcept({ id: "a" });
    const progress = storeOf({ a: { lesson: "completed" } });

    expect(isCompleted(concept, progress)).toBe(true);
    expect(isMastered(concept, progress)).toBe(false);
  });

  it("is mastered only once both the lesson and the quiz are finished", () => {
    const concept = makeConcept({ id: "a" });
    const progress = storeOf({ a: { lesson: "completed", quiz: "completed" } });

    expect(isCompleted(concept, progress)).toBe(true);
    expect(isMastered(concept, progress)).toBe(true);
  });
});

describe("getMasteryVisualState", () => {
  it("ranks mastered above completed above unexplored", () => {
    const concept = makeConcept({ id: "a" });

    expect(getMasteryVisualState(concept)).toBe("unexplored");
    expect(
      getMasteryVisualState(concept, storeOf({ a: { lesson: "completed" } })),
    ).toBe("completed");
    expect(
      getMasteryVisualState(
        concept,
        storeOf({ a: { lesson: "completed", quiz: "completed" } }),
      ),
    ).toBe("mastered");
  });
});

describe("getIncompletePrerequisites", () => {
  it("is empty with no progress store — nothing is locked without real data", () => {
    const prereq = makeConcept({ id: "prereq" });
    const concept = makeConcept({
      id: "a",
      relationships: { prerequisites: ["prereq"] },
    });
    const byId = indexById([prereq, concept]);

    expect(getIncompletePrerequisites(concept, undefined, byId)).toEqual([]);
  });

  it("lists a hard prerequisite that has not been completed", () => {
    const prereq = makeConcept({ id: "prereq" });
    const concept = makeConcept({
      id: "a",
      relationships: { prerequisites: ["prereq"] },
    });
    const byId = indexById([prereq, concept]);

    expect(getIncompletePrerequisites(concept, storeOf({}), byId)).toEqual([
      prereq,
    ]);
  });

  it("clears once that prerequisite's lesson is completed", () => {
    const prereq = makeConcept({ id: "prereq" });
    const concept = makeConcept({
      id: "a",
      relationships: { prerequisites: ["prereq"] },
    });
    const byId = indexById([prereq, concept]);
    const progress = storeOf({ prereq: { lesson: "completed" } });

    expect(getIncompletePrerequisites(concept, progress, byId)).toEqual([]);
  });

  it("ignores soft (recommended) prerequisites — only hard ones can lock", () => {
    const recommended = makeConcept({ id: "recommended" });
    const concept = makeConcept({
      id: "a",
      relationships: { recommendedPrerequisites: ["recommended"] },
    });
    const byId = indexById([recommended, concept]);

    expect(getIncompletePrerequisites(concept, storeOf({}), byId)).toEqual([]);
  });
});

describe("computeNodeVisualState", () => {
  it("defaults to unexplored, unrelated, and unlocked with no context", () => {
    const concept = makeConcept({ id: "a" });

    expect(computeNodeVisualState(concept)).toEqual({
      mastery: "unexplored",
      relation: "none",
      locked: false,
      lockedBecause: [],
    });
  });

  it("marks the selected concept itself", () => {
    const concept = makeConcept({ id: "a" });
    expect(
      computeNodeVisualState(concept, { selectedId: concept.id }).relation,
    ).toBe("selected");
  });

  it("marks a concept in the selected concept's prerequisite set", () => {
    const concept = makeConcept({ id: "a" });
    expect(
      computeNodeVisualState(concept, {
        selectedId: "other" as never,
        prerequisiteIds: new Set([concept.id]),
      }).relation,
    ).toBe("prerequisite");
  });

  it("marks a concept in the selected concept's related set", () => {
    const concept = makeConcept({ id: "a" });
    expect(
      computeNodeVisualState(concept, {
        selectedId: "other" as never,
        relatedIds: new Set([concept.id]),
      }).relation,
    ).toBe("related");
  });

  it("prefers selected over prerequisite or related when somehow both apply", () => {
    const concept = makeConcept({ id: "a" });
    expect(
      computeNodeVisualState(concept, {
        selectedId: concept.id,
        prerequisiteIds: new Set([concept.id]),
      }).relation,
    ).toBe("selected");
  });

  it("locks a concept whose hard prerequisite is incomplete, and says why", () => {
    const prereq = makeConcept({ id: "prereq" });
    const concept = makeConcept({
      id: "a",
      relationships: { prerequisites: ["prereq"] },
    });
    const byId = indexById([prereq, concept]);

    const state = computeNodeVisualState(concept, {
      progress: storeOf({}),
      byId,
    });

    expect(state.locked).toBe(true);
    expect(state.lockedBecause).toEqual([prereq]);
  });
});
