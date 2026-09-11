import { describe, expect, it } from "vitest";
import { conceptSchema } from "./schema";

const validConcept = {
  id: "linear-regression",
  title: "Linear Regression",
  track: "ml",
  summary: "Fitting a line to data to predict a continuous value.",
  difficulty: "beginner",
  prerequisites: [],
  relatedConcepts: [],
  status: { lesson: "planned", visualization: "planned", quiz: "planned" },
};

describe("conceptSchema", () => {
  it("accepts a well-formed concept", () => {
    expect(conceptSchema.safeParse(validConcept).success).toBe(true);
  });

  it("rejects an invalid track", () => {
    const result = conceptSchema.safeParse({
      ...validConcept,
      track: "quantum-computing",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid status value", () => {
    const result = conceptSchema.safeParse({
      ...validConcept,
      status: { ...validConcept.status, lesson: "done" },
    });
    expect(result.success).toBe(false);
  });
});
