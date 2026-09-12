import { describe, expect, it } from "vitest";
import {
  auditCurriculum,
  buildConceptGraph,
  formatIssue,
  hasErrors,
  summarizeCurriculum,
} from "../graph";
import { curriculumSchema, domainSchema, SPINE_DOMAINS } from "../metadata";
import { concepts } from ".";

describe("curriculum registry", () => {
  it("every record satisfies the concept schema", () => {
    expect(curriculumSchema.safeParse(concepts).success).toBe(true);
  });

  it("has no structural errors", () => {
    const errors = auditCurriculum(concepts).filter(
      (issue) => issue.severity === "error",
    );

    // Formatted so a failure names the broken edge instead of dumping records.
    expect(errors.map(formatIssue)).toEqual([]);
    expect(hasErrors(auditCurriculum(concepts))).toBe(false);
  });

  it("uses ids that are unique, kebab-case and stable", () => {
    const ids = concepts.map((concept) => concept.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))).toBe(true);
  });

  it("gives every concept a domain and a category", () => {
    for (const concept of concepts) {
      expect(domainSchema.options).toContain(concept.domain);
      expect(concept.category.length).toBeGreaterThan(0);
    }
  });

  it("covers every declared domain", () => {
    const covered = new Set(concepts.map((concept) => concept.domain));
    for (const domain of domainSchema.options) {
      expect(covered.has(domain)).toBe(true);
    }
  });

  it("roots each spine domain in a concept with no parent inside it", () => {
    const graph = buildConceptGraph(concepts);

    for (const domain of SPINE_DOMAINS) {
      const inDomain = concepts.filter((concept) => concept.domain === domain);
      const roots = inDomain.filter(
        (concept) =>
          !concept.relationships.parents.some(
            (parentId) => graph.byId.get(parentId)?.domain === domain,
          ),
      );

      expect(roots.length).toBeGreaterThan(0);
    }
  });

  it("separates beginner material from advanced material", () => {
    const summary = summarizeCurriculum(concepts);

    // Both ends of the range must be populated, or difficulty is not being
    // used to sequence anything.
    expect(summary.byDifficulty.intro ?? 0).toBeGreaterThan(0);
    expect(summary.byDifficulty.beginner ?? 0).toBeGreaterThan(0);
    expect(summary.byDifficulty.advanced ?? 0).toBeGreaterThan(0);
  });

  it("does not carry two concepts with the same title", () => {
    const titles = concepts.map((concept) => concept.title.toLowerCase());
    const duplicates = titles.filter(
      (title, index) => titles.indexOf(title) !== index,
    );

    expect(duplicates).toEqual([]);
  });

  it("never lists an alias that is also another concept's title", () => {
    const titles = new Set(
      concepts.map((concept) => concept.title.toLowerCase()),
    );

    // An alias colliding with a real title means the same idea is recorded
    // twice under slightly different names — exactly what aliases exist to
    // prevent.
    const collisions = concepts.flatMap((concept) =>
      concept.aliases
        .filter((alias) => titles.has(alias.toLowerCase()))
        .map((alias) => `${concept.id} aliases "${alias}"`),
    );

    expect(collisions).toEqual([]);
  });

  it("keeps the concepts the rest of the app depends on", () => {
    const ids = new Set<string>(concepts.map((concept) => concept.id));

    for (const id of [
      "artificial-intelligence",
      "machine-learning",
      "deep-learning",
      "neural-network",
      "linear-regression",
      "gradient-descent",
      "transformer",
    ]) {
      expect(ids.has(id)).toBe(true);
    }
  });
});
