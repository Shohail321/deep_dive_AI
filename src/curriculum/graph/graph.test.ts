import { describe, expect, it } from "vitest";
import type { ConceptId } from "../metadata";
import {
  buildConceptGraph,
  findCycle,
  findOrphans,
  findUnreachable,
  getAncestorPath,
  getChildren,
  getDependents,
  getDomainEntryPoints,
  getFollowUps,
  getPrerequisites,
  getRelated,
} from "./graph";
import { makeConcept } from "./testFixtures";

describe("buildConceptGraph", () => {
  it("derives children as the inverse of parents", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"] },
    });
    const graph = buildConceptGraph([root, child]);

    expect(getChildren(graph, root.id).map((c) => c.id)).toEqual(["child"]);
    expect(getChildren(graph, child.id)).toEqual([]);
  });

  it("derives follow-ups as the inverse of prerequisites", () => {
    const basics = makeConcept({ id: "basics" });
    const advanced = makeConcept({
      id: "advanced",
      relationships: { prerequisites: ["basics"] },
    });
    const graph = buildConceptGraph([basics, advanced]);

    expect(getFollowUps(graph, basics.id).map((c) => c.id)).toEqual([
      "advanced",
    ]);
  });

  it("treats related concepts as symmetric, so the link is authored once", () => {
    const a = makeConcept({
      id: "a",
      relationships: { relatedConcepts: ["b"] },
    });
    const b = makeConcept({ id: "b" });
    const graph = buildConceptGraph([a, b]);

    expect(getRelated(graph, a.id).map((c) => c.id)).toEqual(["b"]);
    expect(getRelated(graph, b.id).map((c) => c.id)).toEqual(["a"]);
  });

  it("treats concepts with no parents as roots", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"] },
    });

    expect(buildConceptGraph([root, child]).roots).toEqual(["root"]);
  });

  it("survives an edge to a concept that does not exist", () => {
    const strandedChild = makeConcept({
      id: "child",
      relationships: { parents: ["ghost"] },
    });
    const graph = buildConceptGraph([strandedChild]);

    // Having a parent at all disqualifies it as a root, so it is unreachable
    // rather than silently promoted to the top of the taxonomy. The dangling
    // reference itself is the audit's job to report.
    expect(graph.roots).toEqual([]);
    expect(findUnreachable(graph)).toEqual(["child"]);
    expect(getChildren(graph, strandedChild.id)).toEqual([]);
  });
});

describe("getPrerequisites / getDependents", () => {
  it("resolves prerequisite ids to concepts", () => {
    const a = makeConcept({ id: "a" });
    const b = makeConcept({
      id: "b",
      relationships: { prerequisites: ["a"] },
    });

    expect(getPrerequisites(b, [a, b])).toEqual([a]);
    expect(getDependents(a.id, [a, b])).toEqual([b]);
  });
});

describe("findCycle", () => {
  it("returns an empty array for an acyclic graph", () => {
    const a = makeConcept({ id: "a" });
    const b = makeConcept({
      id: "b",
      relationships: { prerequisites: ["a"] },
    });

    expect(findCycle([a, b])).toEqual([]);
  });

  it("detects a prerequisite cycle by default", () => {
    const a = makeConcept({ id: "a", relationships: { prerequisites: ["b"] } });
    const b = makeConcept({ id: "b", relationships: { prerequisites: ["a"] } });

    expect(findCycle([a, b]).length).toBeGreaterThan(0);
  });

  it("checks the relation it is asked for", () => {
    const a = makeConcept({ id: "a", relationships: { parents: ["b"] } });
    const b = makeConcept({ id: "b", relationships: { parents: ["a"] } });

    expect(findCycle([a, b], "prerequisites")).toEqual([]);
    expect(findCycle([a, b], "parents").length).toBeGreaterThan(0);
  });
});

describe("findUnreachable", () => {
  it("finds nothing when every concept descends from a root", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"] },
    });
    const grandchild = makeConcept({
      id: "grandchild",
      relationships: { parents: ["child"] },
    });

    expect(
      findUnreachable(buildConceptGraph([root, child, grandchild])),
    ).toEqual([]);
  });

  it("finds concepts stranded by a parent cycle", () => {
    const a = makeConcept({ id: "a", relationships: { parents: ["b"] } });
    const b = makeConcept({ id: "b", relationships: { parents: ["a"] } });

    expect(findUnreachable(buildConceptGraph([a, b])).sort()).toEqual([
      "a",
      "b",
    ]);
  });
});

describe("findOrphans", () => {
  it("finds only concepts with no edges in any direction", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"] },
    });
    const floating = makeConcept({ id: "floating" });

    expect(findOrphans(buildConceptGraph([root, child, floating]))).toEqual([
      "floating",
    ]);
  });

  it("does not count a concept linked only by a related edge", () => {
    const a = makeConcept({
      id: "a",
      relationships: { relatedConcepts: ["b"] },
    });
    const b = makeConcept({ id: "b" });

    expect(findOrphans(buildConceptGraph([a, b]))).toEqual([]);
  });
});

describe("getDomainEntryPoints", () => {
  it("finds every concept in a domain with no same-domain parent", () => {
    const a = makeConcept({ id: "a", domain: "ml" });
    const b = makeConcept({ id: "b", domain: "ml" });
    const child = makeConcept({
      id: "child",
      domain: "ml",
      relationships: { parents: ["a"] },
    });

    const graph = buildConceptGraph([a, b, child]);

    expect(
      getDomainEntryPoints(graph, "ml")
        .map((c) => c.id)
        .sort(),
    ).toEqual(["a", "b"]);
  });

  it("treats a parent in a different domain as still an entry point", () => {
    const aiRoot = makeConcept({ id: "ai-root", domain: "ai" });
    const mlRoot = makeConcept({
      id: "ml-root",
      domain: "ml",
      relationships: { parents: ["ai-root"] },
    });

    const graph = buildConceptGraph([aiRoot, mlRoot]);

    expect(getDomainEntryPoints(graph, "ml").map((c) => c.id)).toEqual([
      "ml-root",
    ]);
  });

  it("returns nothing for a domain with no concepts", () => {
    const graph = buildConceptGraph([makeConcept({ id: "a", domain: "ml" })]);
    expect(getDomainEntryPoints(graph, "dl")).toEqual([]);
  });
});

describe("getAncestorPath", () => {
  it("walks from the entry point down to the concept, inclusive", () => {
    const root = makeConcept({ id: "root" });
    const middle = makeConcept({
      id: "middle",
      relationships: { parents: ["root"] },
    });
    const leaf = makeConcept({
      id: "leaf",
      relationships: { parents: ["middle"] },
    });
    const graph = buildConceptGraph([root, middle, leaf]);

    expect(getAncestorPath(graph, leaf.id).map((c) => c.id)).toEqual([
      "root",
      "middle",
      "leaf",
    ]);
  });

  it("returns just the concept itself when it has no parent", () => {
    const root = makeConcept({ id: "root" });
    const graph = buildConceptGraph([root]);

    expect(getAncestorPath(graph, root.id).map((c) => c.id)).toEqual(["root"]);
  });

  it("keeps the first parent when a concept authors more than one", () => {
    const first = makeConcept({ id: "first" });
    const second = makeConcept({ id: "second" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["first", "second"] },
    });
    const graph = buildConceptGraph([first, second, child]);

    expect(getAncestorPath(graph, child.id).map((c) => c.id)).toEqual([
      "first",
      "child",
    ]);
  });

  it("returns an empty array for an id the graph does not know", () => {
    const graph = buildConceptGraph([makeConcept({ id: "a" })]);
    expect(getAncestorPath(graph, "ghost" as ConceptId)).toEqual([]);
  });

  it("stops rather than looping forever on a parent cycle", () => {
    const a = makeConcept({ id: "a", relationships: { parents: ["b"] } });
    const b = makeConcept({ id: "b", relationships: { parents: ["a"] } });
    const graph = buildConceptGraph([a, b]);

    expect(getAncestorPath(graph, "a" as ConceptId)).toEqual([]);
  });
});
