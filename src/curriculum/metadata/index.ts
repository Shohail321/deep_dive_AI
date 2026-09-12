export {
  conceptIdSchema,
  slugSchema,
  difficultySchema,
  conceptIdentitySchema,
} from "./identity";
export type { ConceptId, Slug, Difficulty, ConceptIdentity } from "./identity";

export { domainSchema, DOMAIN_META, SPINE_DOMAINS } from "./domains";
export type { Domain, DomainMeta } from "./domains";

export { conceptRelationshipsSchema, RELATION_KEYS } from "./relationships";
export type { ConceptRelationships, RelationKey } from "./relationships";

export { importanceScoreSchema, conceptImportanceSchema } from "./importance";
export type { ImportanceScore, ConceptImportance } from "./importance";

export {
  authoringStatusSchema,
  conceptContentSchema,
  conceptVisualizationSchema,
  visualizationTypeSchema,
  interactionTypeSchema,
} from "./content";
export type {
  AuthoringStatus,
  ConceptContent,
  ConceptVisualization,
  VisualizationType,
  InteractionType,
} from "./content";

export {
  referenceSchema,
  referenceKindSchema,
  conceptEditorialSchema,
} from "./editorial";
export type { Reference, ReferenceKind, ConceptEditorial } from "./editorial";

export { conceptSchema, curriculumSchema, defineConcept } from "./concept";
export type { Concept, ConceptInput, Curriculum } from "./concept";
