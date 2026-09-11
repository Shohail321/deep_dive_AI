import { z } from "zod";

/**
 * The three tracks the homepage's concentric rings represent today.
 * Extending this union (e.g. for a future GenAI or Use-AI track) is
 * expected as the curriculum grows.
 */
export const trackSchema = z.enum(["ai", "ml", "dl"]);
export type Track = z.infer<typeof trackSchema>;

export const difficultySchema = z.enum([
  "intro",
  "beginner",
  "intermediate",
  "advanced",
]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const contentStatusSchema = z.enum([
  "planned",
  "in-progress",
  "complete",
]);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

export const conceptStatusSchema = z.object({
  lesson: contentStatusSchema,
  visualization: contentStatusSchema,
  quiz: contentStatusSchema,
});
export type ConceptStatus = z.infer<typeof conceptStatusSchema>;

export const conceptIdSchema = z.string().min(1).brand("ConceptId");
export type ConceptId = z.infer<typeof conceptIdSchema>;

export const conceptSchema = z.object({
  id: conceptIdSchema,
  title: z.string().min(1),
  track: trackSchema,
  summary: z.string().min(1),
  difficulty: difficultySchema,
  /** Concepts that should be understood before this one. */
  prerequisites: z.array(conceptIdSchema),
  /** Concepts that inform or extend this one without being required first. */
  relatedConcepts: z.array(conceptIdSchema),
  status: conceptStatusSchema,
});
export type Concept = z.infer<typeof conceptSchema>;
/** The pre-validation shape `conceptSchema.parse` accepts (plain strings, not yet branded). */
export type ConceptInput = z.input<typeof conceptSchema>;

export const curriculumSchema = z.array(conceptSchema);
export type Curriculum = z.infer<typeof curriculumSchema>;
