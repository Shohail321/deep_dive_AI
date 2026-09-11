import { z } from "zod";

/**
 * 0 = irrelevant, 1 = incidental, 2 = useful, 3 = important,
 * 4 = central, 5 = indispensable.
 */
export const importanceScoreSchema = z.number().int().min(0).max(5);
export type ImportanceScore = z.infer<typeof importanceScoreSchema>;

/**
 * How much a concept matters along each way of knowing it. These drive
 * ordering and recommendation, so every axis is required: defaulting a
 * missing score to 0 would quietly assert "not important" and skew
 * recommendations without anyone noticing.
 */
export const conceptImportanceSchema = z.object({
  /** Needed to build a correct mental model, even informally. */
  intuitive: importanceScoreSchema,
  /** Weight of the underlying mathematics. */
  mathematical: importanceScoreSchema,
  /** Weight of implementing it in code. */
  coding: importanceScoreSchema,
  /** Bearing on applied, real-world work. */
  practical: importanceScoreSchema,
  /** Bearing on reading or doing research. */
  research: importanceScoreSchema,
});
export type ConceptImportance = z.infer<typeof conceptImportanceSchema>;
