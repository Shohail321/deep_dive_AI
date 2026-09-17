import { describe, expect, it } from "vitest";
import { buildConceptGraph } from "@/curriculum/graph";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { DOMAIN_META } from "@/curriculum/metadata";
import {
  buildVisibleMap,
  domainFromNodeId,
  domainNodeId,
  getDescendantIds,
  getMapDomains,
  groupChildrenByParent,
  idsToReveal,
  layoutTree,
  type ConceptMapNode,
  type DomainMapNode,
} from "./layout";

const labels = Object.fromEntries(
  Object.entries(DOMAIN_META).map(([domain, meta]) => [domain, meta.label]),
) as Record<string, string>;

describe("domainNodeId / domainFromNodeId", () => {
  it("round-trips a domain through its node id", () => {
    expect(domainFromNodeId(domainNodeId("ml"))).toBe("ml");
  });

  it("returns null for a concept id, which never has the domain: prefix", () => {
    expect(domainFromNodeId("linear-regression")).toBeNull();
  });

  it("returns null for a domain: prefix that names an invalid domain", () => {
    expect(domainFromNodeId("domain:quantum")).toBeNull();
  });
});

describe("getMapDomains", () => {
  it("lists only domains that actually have a concept, in curriculum order", () => {
    const graph = buildConceptGraph([
      makeConcept({ id: "a", domain: "dl" }),
      makeConcept({ id: "b", domain: "ai" }),
    ]);

    // domainSchema order is math, data, ai, ml, dl, ... — ai before dl.
    expect(getMapDomains(graph)).toEqual(["ai", "dl"]);
  });
});

describe("buildVisibleMap", () => {
  it("shows only domain nodes when nothing is expanded", () => {
    const graph = buildConceptGraph([makeConcept({ id: "a", domain: "ml" })]);

    const { nodes, edges } = buildVisibleMap(graph, new Set(), labels);

    expect(nodes).toEqual([
      {
        kind: "domain",
        id: "domain:ml",
        domain: "ml",
        label: labels.ml,
        conceptCount: 1,
      },
    ]);
    expect(edges).toEqual([]);
  });

  it("reveals a domain's entry points once the domain node is expanded", () => {
    const root = makeConcept({ id: "root", domain: "ml" });
    const child = makeConcept({
      id: "child",
      domain: "ml",
      relationships: { parents: ["root"] },
    });
    const graph = buildConceptGraph([root, child]);

    const { nodes, edges } = buildVisibleMap(
      graph,
      new Set(["domain:ml"]),
      labels,
    );

    const conceptNodes = nodes.filter(
      (n): n is ConceptMapNode => n.kind === "concept",
    );
    expect(conceptNodes.map((n) => n.concept.id)).toEqual(["root"]);
    expect(edges).toEqual([
      { id: "domain:ml->root", source: "domain:ml", target: "root" },
    ]);
  });

  it("does not reveal a concept's children until that concept is also expanded", () => {
    const root = makeConcept({ id: "root", domain: "ml" });
    const child = makeConcept({
      id: "child",
      domain: "ml",
      relationships: { parents: ["root"] },
    });
    const graph = buildConceptGraph([root, child]);

    const { nodes } = buildVisibleMap(graph, new Set(["domain:ml"]), labels);

    expect(
      nodes.some((n) => n.kind === "concept" && n.concept.id === "child"),
    ).toBe(false);
  });

  it("reveals children once both the domain and the concept are expanded", () => {
    const root = makeConcept({ id: "root", domain: "ml" });
    const child = makeConcept({
      id: "child",
      domain: "ml",
      relationships: { parents: ["root"] },
    });
    const graph = buildConceptGraph([root, child]);

    const { nodes, edges } = buildVisibleMap(
      graph,
      new Set(["domain:ml", "root"]),
      labels,
    );

    const conceptIds = nodes
      .filter((n): n is ConceptMapNode => n.kind === "concept")
      .map((n) => n.concept.id);
    expect(conceptIds.sort()).toEqual(["child", "root"]);
    expect(edges).toContainEqual({
      id: "root->child",
      source: "root",
      target: "child",
    });
  });

  it("adds a concept only once even if it would be reachable through two expanded parents", () => {
    const a = makeConcept({ id: "a", domain: "ml" });
    const b = makeConcept({ id: "b", domain: "ml" });
    const shared = makeConcept({
      id: "shared",
      domain: "ml",
      relationships: { parents: ["a"] },
    });
    const graph = buildConceptGraph([a, b, shared]);

    const { nodes } = buildVisibleMap(
      graph,
      new Set(["domain:ml", "a", "b"]),
      labels,
    );

    expect(
      nodes.filter((n) => n.kind === "concept" && n.concept.id === "shared"),
    ).toHaveLength(1);
  });

  it("computes conceptCount for the domain node from the whole domain, not just what's visible", () => {
    const graph = buildConceptGraph([
      makeConcept({ id: "a", domain: "ml" }),
      makeConcept({ id: "b", domain: "ml", relationships: { parents: ["a"] } }),
      makeConcept({ id: "c", domain: "ml", relationships: { parents: ["a"] } }),
    ]);

    const { nodes } = buildVisibleMap(graph, new Set(), labels);
    const domainNode = nodes[0] as DomainMapNode;

    expect(domainNode.conceptCount).toBe(3);
  });
});

describe("groupChildrenByParent", () => {
  it("groups edge targets under their source", () => {
    const children = groupChildrenByParent([
      { id: "1", source: "root", target: "a" },
      { id: "2", source: "root", target: "b" },
      { id: "3", source: "a", target: "c" },
    ]);

    expect(children.get("root")).toEqual(["a", "b"]);
    expect(children.get("a")).toEqual(["c"]);
    expect(children.get("b")).toBeUndefined();
  });

  it("returns an empty map for no edges", () => {
    expect(groupChildrenByParent([]).size).toBe(0);
  });
});

describe("getDescendantIds", () => {
  const edges = [
    { id: "1", source: "root", target: "a" },
    { id: "2", source: "root", target: "b" },
    { id: "3", source: "a", target: "c" },
  ];

  it("includes the node itself and everything reachable forward from it", () => {
    expect(getDescendantIds("root", edges)).toEqual(
      new Set(["root", "a", "b", "c"]),
    );
  });

  it("stops at a leaf, returning just itself", () => {
    expect(getDescendantIds("c", edges)).toEqual(new Set(["c"]));
  });

  it("does not include a sibling's descendants", () => {
    expect(getDescendantIds("a", edges)).toEqual(new Set(["a", "c"]));
  });
});

describe("layoutTree", () => {
  it("gives each root its own column when there are no children", () => {
    const positions = layoutTree(["a", "b"], () => [], { columnWidth: 100 });

    expect(positions.get("a")).toEqual({ x: 0, y: 0, depth: 0 });
    expect(positions.get("b")).toEqual({ x: 100, y: 0, depth: 0 });
  });

  it("increases y by depth, not by column", () => {
    const childrenOf = (id: string) => (id === "root" ? ["child"] : []);
    const positions = layoutTree(["root"], childrenOf, { rowHeight: 50 });

    expect(positions.get("root")?.y).toBe(0);
    expect(positions.get("child")?.y).toBe(50);
  });

  it("centres a parent over the span of its children", () => {
    const childrenOf = (id: string) => (id === "root" ? ["a", "b"] : []);
    const positions = layoutTree(["root"], childrenOf, { columnWidth: 100 });

    expect(positions.get("a")?.x).toBe(0);
    expect(positions.get("b")?.x).toBe(100);
    expect(positions.get("root")?.x).toBe(50); // the average of 0 and 100
  });

  it("does not loop forever on a cycle", () => {
    const childrenOf = (id: string) =>
      id === "a" ? ["b"] : id === "b" ? ["a"] : [];

    expect(() => layoutTree(["a"], childrenOf)).not.toThrow();
  });
});

describe("idsToReveal", () => {
  it("returns an empty set for an empty path", () => {
    expect(idsToReveal([])).toEqual(new Set());
  });

  it("includes the domain node and every concept on the path", () => {
    const root = makeConcept({ id: "root", domain: "ml" });
    const child = makeConcept({
      id: "child",
      domain: "ml",
      relationships: { parents: ["root"] },
    });

    expect(idsToReveal([root, child])).toEqual(
      new Set(["domain:ml", "root", "child"]),
    );
  });
});
