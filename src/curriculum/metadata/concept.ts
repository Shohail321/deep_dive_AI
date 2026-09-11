import { z } from "zod";
import { conceptContentSchema, conceptVisualizationSchema } from "./content";
import { authoringStatusSchema } from "./content";
import { conceptEditorialSchema } from "./editorial";
import { conceptIdentitySchema } from "./identity";
import { conceptImportanceSchema } from "./importance";
import { conceptRelationshipsSchema } from "./relationships";

/**
 * One authored record per concept, composed from the separately-exported
 * facets above. The facets keep the concerns separable (and independently
 * reusable); composing them keeps a concept one file to edit, which is what
 * matters once there are hundreds of them.
 *
 * `.prefault({})` rather than `.default({})`: zod 4 does not re-parse default
 * values, so `.default({})` would hand back a bare `{}` at runtime while the
 * types promise the inner fields exist.
 */
export const conceptSchema = conceptIdentitySchema.extend({
  relationships: conceptRelationshipsSchema.prefault({}),
  importance: conceptImportanceSchema,
  content: conceptContentSchema.prefault({}),
  visualization: conceptVisualizationSchema.optional(),
  editorial: conceptEditorialSchema.prefault({}),
  status: authoringStatusSchema,
});

export type Concept = z.infer<typeof conceptSchema>;

/** The pre-validation shape `conceptSchema.parse` accepts (plain strings, not yet branded). */
export type ConceptInput = z.input<typeof conceptSchema>;

export const curriculumSchema = z.array(conceptSchema);
export type Curriculum = z.infer<typeof curriculumSchema>;

/**
 * Helper for authoring a concept fixture with full type checking at the
 * definition site, rather than only when the curriculum is parsed.
 */
export function defineConcept(input: ConceptInput): Concept {
  return conceptSchema.parse(input);
}
