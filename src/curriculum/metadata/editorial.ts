import { z } from "zod";

export const referenceKindSchema = z.enum([
  "paper",
  "book",
  "article",
  "video",
  "documentation",
  "course",
]);
export type ReferenceKind = z.infer<typeof referenceKindSchema>;

/** Structured rather than a bare URL string, so references can be rendered and cited. */
export const referenceSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  kind: referenceKindSchema.optional(),
});
export type Reference = z.infer<typeof referenceSchema>;

export const conceptEditorialSchema = z.object({
  /** Terms this concept defines, for the glossary index. */
  glossaryTerms: z.array(z.string().min(1)).default([]),
  /** Stated as the wrong belief itself, so a lesson can name and correct it. */
  commonMisconceptions: z.array(z.string().min(1)).default([]),
  references: z.array(referenceSchema).default([]),
});
export type ConceptEditorial = z.infer<typeof conceptEditorialSchema>;
