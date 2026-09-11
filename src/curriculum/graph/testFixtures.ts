import { conceptSchema, type Concept, type ConceptInput } from "../metadata";

/**
 * Minimal valid concept, overridable per test. Lives outside the .test file
 * so the graph and audit suites build fixtures the same way.
 */
export function makeConcept(
  overrides: Partial<ConceptInput> & { id: string },
): Concept {
  return conceptSchema.parse({
    slug: overrides.id,
    title: overrides.id,
    summary: "A fixture concept used to exercise the validation utilities.",
    domain: "ml",
    category: "Fixtures",
    difficulty: "beginner",
    estimatedMinutes: 10,
    importance: {
      intuitive: 3,
      mathematical: 3,
      coding: 3,
      practical: 3,
      research: 3,
    },
    status: "planned",
    ...overrides,
  });
}
