import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { domainNodeId } from "./layout";
import { useKnowledgeMapState } from "./useKnowledgeMapState";

// A small tree: two ml entry points, one with a child, plus a cross-domain
// prerequisite and a related link, so relation states have something to
// compute over.
function makeFixture() {
  const foundations = makeConcept({ id: "math-foundations", domain: "math" });
  const root = makeConcept({
    id: "ml-root",
    domain: "ml",
    title: "Machine Learning",
    relationships: { prerequisites: ["math-foundations"] },
  });
  const sibling = makeConcept({ id: "ml-sibling", domain: "ml" });
  const child = makeConcept({
    id: "ml-child",
    domain: "ml",
    relationships: { parents: ["ml-root"], relatedConcepts: ["ml-sibling"] },
  });
  return [foundations, root, sibling, child];
}

describe("useKnowledgeMapState", () => {
  it("shows only domain nodes with nothing expanded", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    expect(result.current.nodes.every((n) => n.node.kind === "domain")).toBe(
      true,
    );
    expect(result.current.selected).toBeNull();
  });

  it("marks a domain node as having children even before it is expanded", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    const mlDomain = result.current.nodes.find(
      (n) => n.node.id === domainNodeId("ml"),
    );
    expect(mlDomain?.hasChildren).toBe(true);
    expect(mlDomain?.expanded).toBe(false);
  });

  it("reveals a domain's entry points on toggleExpand", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.toggleExpand(domainNodeId("ml")));

    const conceptIds = result.current.nodes
      .filter((n) => n.node.kind === "concept")
      .map((n) => (n.node.kind === "concept" ? n.node.concept.id : null));
    expect(conceptIds.sort()).toEqual(["ml-root", "ml-sibling"]);
  });

  it("reports hasChildren for an unexpanded concept from the full graph, not just what's visible", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.toggleExpand(domainNodeId("ml")));

    const rootNode = result.current.nodes.find(
      (n) => n.node.kind === "concept" && n.node.concept.id === "ml-root",
    );
    expect(rootNode?.expanded).toBe(false);
    expect(rootNode?.hasChildren).toBe(true); // ml-child exists, even though it isn't shown yet.
  });

  it("toggling the same id twice collapses it again", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.toggleExpand(domainNodeId("ml")));
    act(() => result.current.toggleExpand(domainNodeId("ml")));

    // Only the two domains present in the fixture (math, ml), nothing else.
    expect(result.current.nodes).toHaveLength(2);
    expect(result.current.nodes.every((n) => n.node.kind === "domain")).toBe(
      true,
    );
  });

  it("selecting a concept exposes its prerequisites, related concepts and recommended next steps", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.selectConcept("ml-root" as never));

    expect(result.current.selected?.concept.id).toBe("ml-root");
    expect(result.current.selected?.prerequisites.map((c) => c.id)).toEqual([
      "math-foundations",
    ]);
    expect(result.current.selected?.related.map((c) => c.id)).toEqual([]);

    act(() => result.current.selectConcept("math-foundations" as never));
    // ml-root has math-foundations as a prerequisite, so from
    // math-foundations' own side, ml-root is a recommended next step.
    expect(result.current.selected?.recommendedNext.map((c) => c.id)).toEqual([
      "ml-root",
    ]);
  });

  it("computes the ancestor path ('where am I') for the selected concept", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.selectConcept("ml-child" as never));

    expect(result.current.selected?.ancestorPath.map((c) => c.id)).toEqual([
      "ml-root",
      "ml-child",
    ]);
  });

  it("relation-flags prerequisite and related concepts once they are visible", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.toggleExpand(domainNodeId("ml")));
    act(() => result.current.toggleExpand(domainNodeId("math")));
    act(() => result.current.toggleExpand("ml-root" as never));
    act(() => result.current.selectConcept("ml-root" as never));

    const byId = (id: string) =>
      result.current.nodes.find(
        (n) => n.node.kind === "concept" && n.node.concept.id === id,
      );

    expect(byId("math-foundations")?.visualState?.relation).toBe(
      "prerequisite",
    );
    expect(byId("ml-root")?.visualState?.relation).toBe("selected");
  });

  it("revealAndSelect expands the ancestor chain and selects the target in one step", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.revealAndSelect("ml-child" as never));

    expect(result.current.selected?.concept.id).toBe("ml-child");
    const conceptIds = result.current.nodes
      .filter((n) => n.node.kind === "concept")
      .map((n) => (n.node.kind === "concept" ? n.node.concept.id : null));
    // The whole path down to ml-child is now visible without a manual expand.
    expect(conceptIds).toContain("ml-root");
    expect(conceptIds).toContain("ml-child");
  });

  it("clearing the selection returns to null", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));

    act(() => result.current.selectConcept("ml-root" as never));
    act(() => result.current.selectConcept(null));

    expect(result.current.selected).toBeNull();
  });
});
