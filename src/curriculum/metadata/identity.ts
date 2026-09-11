import { z } from "zod";

/** Lower-case kebab-case, so ids and slugs are URL-safe and stable to diff. */
const kebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const conceptIdSchema = z
  .string()
  .min(1)
  .regex(kebabCase, "Concept ids must be kebab-case")
  .brand("ConceptId");
export type ConceptId = z.infer<typeof conceptIdSchema>;

/**
 * Separate from `id` on purpose: the id is the permanent key relationships
 * point at, while the slug is the URL and may be rewritten for clarity.
 */
export const slugSchema = z
  .string()
  .min(1)
  .regex(kebabCase, "Slugs must be kebab-case")
  .brand("Slug");
export type Slug = z.infer<typeof slugSchema>;

/**
 * The top-level branches of the curriculum. Extending this union (a GenAI or
 * practical "Use AI" track) is expected; every domain needs a colour token
 * and an entry in the design system's domain maps.
 */
export const domainSchema = z.enum(["ai", "ml", "dl"]);
export type Domain = z.infer<typeof domainSchema>;

export const difficultySchema = z.enum([
  "intro",
  "beginner",
  "intermediate",
  "advanced",
]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const conceptIdentitySchema = z.object({
  id: conceptIdSchema,
  slug: slugSchema,
  title: z.string().min(1),
  /** For breadcrumbs and graph nodes, where the full title will not fit. */
  shortTitle: z.string().min(1).optional(),
  summary: z.string().min(20),
  domain: domainSchema,
  /** Broad grouping within a domain, e.g. "Supervised learning". */
  category: z.string().min(1),
  subcategory: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  difficulty: difficultySchema,
  estimatedMinutes: z.number().int().positive().max(600),
  learningObjectives: z.array(z.string().min(1)).default([]),
  /** Other names a learner might know this by, e.g. "MLP" for a feedforward network. */
  aliases: z.array(z.string().min(1)).default([]),
  searchKeywords: z.array(z.string().min(1)).default([]),
});
export type ConceptIdentity = z.infer<typeof conceptIdentitySchema>;
