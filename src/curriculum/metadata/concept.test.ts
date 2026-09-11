import { describe, expect, it } from "vitest";
import { conceptSchema } from "./concept";

const valid = {
  id: "linear-regression",
  slug: "linear-regression",
  title: "Linear Regression",
  summary: "Fitting a straight line through data to predict a value.",
  domain: "ml",
  category: "Supervised learning",
  difficulty: "beginner",
  estimatedMinutes: 25,
  importance: {
    intuitive: 5,
    mathematical: 4,
    coding: 4,
    practical: 4,
    research: 2,
  },
  status: "drafting",
};

describe("conceptSchema", () => {
  it("accepts a minimal well-formed concept", () => {
    expect(conceptSchema.safeParse(valid).success).toBe(true);
  });

  it("fills the optional facets so their fields are never undefined at runtime", () => {
    const concept = conceptSchema.parse(valid);

    expect(concept.relationships.prerequisites).toEqual([]);
    expect(concept.content.hasLesson).toBe(false);
    expect(concept.editorial.references).toEqual([]);
    expect(concept.tags).toEqual([]);
  });

  it("rejects ids and slugs that are not kebab-case", () => {
    expect(
      conceptSchema.safeParse({ ...valid, id: "Linear Regression" }).success,
    ).toBe(false);
    expect(
      conceptSchema.safeParse({ ...valid, slug: "Linear_Regression" }).success,
    ).toBe(false);
  });

  it("rejects an unknown domain", () => {
    expect(
      conceptSchema.safeParse({ ...valid, domain: "quantum" }).success,
    ).toBe(false);
  });

  it("requires every importance axis, rather than defaulting a missing one to zero", () => {
    const partial = { ...valid.importance } as Partial<typeof valid.importance>;
    delete partial.mathematical;

    expect(
      conceptSchema.safeParse({ ...valid, importance: partial }).success,
    ).toBe(false);
  });

  it("bounds importance scores to 0-5", () => {
    expect(
      conceptSchema.safeParse({
        ...valid,
        importance: { ...valid.importance, coding: 9 },
      }).success,
    ).toBe(false);
  });

  it("rejects a non-positive estimate", () => {
    expect(
      conceptSchema.safeParse({ ...valid, estimatedMinutes: 0 }).success,
    ).toBe(false);
  });

  it("requires references to carry a title and a real url", () => {
    expect(
      conceptSchema.safeParse({
        ...valid,
        editorial: { references: [{ title: "Paper", url: "not-a-url" }] },
      }).success,
    ).toBe(false);
  });
});
