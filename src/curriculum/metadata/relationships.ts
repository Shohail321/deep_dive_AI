import { z } from "zod";
import { conceptIdSchema } from "./identity";

/**
 * Only one direction of each relationship is authored. `children` and
 * `followUpConcepts` are the inverses of `parents` and `prerequisites`, and
 * are derived by `buildConceptGraph` rather than stored.
 *
 * Storing both directions is the obvious shape and the wrong one: the two
 * copies drift apart as the curriculum grows and nothing detects it. Deriving
 * them makes an inconsistent pair unrepresentable.
 */
export const conceptRelationshipsSchema = z.object({
  /** Broader concepts this one sits under. Usually exactly one. */
  parents: z.array(conceptIdSchema).default([]),
  /** Hard requirements — this concept does not make sense without them. */
  prerequisites: z.array(conceptIdSchema).default([]),
  /** Soft requirements — helpful context, but not blocking. */
  recommendedPrerequisites: z.array(conceptIdSchema).default([]),
  /** Lateral "see also" links. Treated as symmetric when the graph is built. */
  relatedConcepts: z.array(conceptIdSchema).default([]),
});
export type ConceptRelationships = z.infer<typeof conceptRelationshipsSchema>;

/** The authored relationship fields, used to report which one an issue came from. */
export const RELATION_KEYS = [
  "parents",
  "prerequisites",
  "recommendedPrerequisites",
  "relatedConcepts",
] as const;

export type RelationKey = (typeof RELATION_KEYS)[number];
