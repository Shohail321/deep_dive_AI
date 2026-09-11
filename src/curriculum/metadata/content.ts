import { z } from "zod";

/**
 * Where a concept is in its authoring lifecycle. Distinct from
 * `ConceptContent`, which records which surfaces exist: a concept can be
 * "complete" with no playground, if a playground was never warranted.
 */
export const authoringStatusSchema = z.enum([
  "planned",
  "drafting",
  "review",
  "complete",
]);
export type AuthoringStatus = z.infer<typeof authoringStatusSchema>;

/** Which surfaces actually exist for this concept today. */
export const conceptContentSchema = z.object({
  hasLesson: z.boolean().default(false),
  hasVisualization: z.boolean().default(false),
  hasQuiz: z.boolean().default(false),
  hasPlayground: z.boolean().default(false),
  hasMath: z.boolean().default(false),
  hasCode: z.boolean().default(false),
  hasRealWorldExample: z.boolean().default(false),
});
export type ConceptContent = z.infer<typeof conceptContentSchema>;

export const visualizationTypeSchema = z.enum([
  "diagram",
  "graph",
  "plot",
  "network",
  "geometry",
  "animation",
  "simulation",
]);
export type VisualizationType = z.infer<typeof visualizationTypeSchema>;

export const interactionTypeSchema = z.enum([
  "static",
  "hover",
  "parameter",
  "drag",
  "step",
  "freeform",
]);
export type InteractionType = z.infer<typeof interactionTypeSchema>;

/**
 * Present only when `content.hasVisualization` is true — the audit flags the
 * two disagreeing in either direction.
 */
export const conceptVisualizationSchema = z.object({
  visualizationType: visualizationTypeSchema,
  interactionType: interactionTypeSchema,
});
export type ConceptVisualization = z.infer<typeof conceptVisualizationSchema>;
