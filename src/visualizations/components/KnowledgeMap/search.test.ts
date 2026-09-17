import { describe, expect, it } from "vitest";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { searchConcepts } from "./search";

const concepts = [
  makeConcept({ id: "linear-regression", title: "Linear Regression" }),
  makeConcept({ id: "logistic-regression", title: "Logistic Regression" }),
  makeConcept({
    id: "neural-network",
    title: "Neural Network",
    aliases: ["ANN", "Multilayer Perceptron"],
  }),
  makeConcept({
    id: "gradient-descent",
    title: "Gradient Descent",
    searchKeywords: ["optimiser", "optimization"],
  }),
];

describe("searchConcepts", () => {
  it("returns nothing for an empty or whitespace-only query", () => {
    expect(searchConcepts(concepts, "")).toEqual([]);
    expect(searchConcepts(concepts, "   ")).toEqual([]);
  });

  it("matches case-insensitively against the title", () => {
    expect(searchConcepts(concepts, "NEURAL").map((c) => c.id)).toEqual([
      "neural-network",
    ]);
  });

  it("matches against an alias", () => {
    expect(searchConcepts(concepts, "ANN").map((c) => c.id)).toEqual([
      "neural-network",
    ]);
  });

  it("matches against a search keyword", () => {
    expect(searchConcepts(concepts, "optimiser").map((c) => c.id)).toEqual([
      "gradient-descent",
    ]);
  });

  it("matches against the id", () => {
    expect(searchConcepts(concepts, "linear-reg").map((c) => c.id)).toEqual([
      "linear-regression",
    ]);
  });

  it("ranks a title that starts with the query above one that merely contains it", () => {
    const results = searchConcepts(concepts, "regression");
    expect(results.map((c) => c.id)).toEqual([
      "linear-regression",
      "logistic-regression",
    ]);
  });

  it("caps results at the given limit", () => {
    const many = Array.from({ length: 20 }, (_, i) =>
      makeConcept({ id: `concept-${i}`, title: `Match ${i}` }),
    );
    expect(searchConcepts(many, "match", 5)).toHaveLength(5);
  });
});
