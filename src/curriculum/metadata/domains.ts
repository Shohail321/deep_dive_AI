import { z } from "zod";

/**
 * The top-level branches of the curriculum.
 *
 * Three of these — ai, ml, dl — form the containment spine the homepage
 * draws as concentric rings. The rest are adjacent bodies of knowledge: you
 * need the maths to follow the maths, and you need the production practices
 * to ship anything, but neither is a subset of "artificial intelligence".
 */
export const domainSchema = z.enum([
  "math",
  "data",
  "ai",
  "ml",
  "dl",
  "genai",
  "responsible",
  "mlops",
  "research",
]);
export type Domain = z.infer<typeof domainSchema>;

export interface DomainMeta {
  label: string;
  shortLabel: string;
  /**
   * Part of the AI ⊃ ML ⊃ DL containment chain, outermost first.
   * Only spine domains become rings; everything else is a neighbouring
   * track reached another way.
   */
  spineOrder: number | null;
}

export const DOMAIN_META: Record<Domain, DomainMeta> = {
  math: {
    label: "Mathematical Foundations",
    shortLabel: "Maths",
    spineOrder: null,
  },
  data: { label: "Programming and Data", shortLabel: "Data", spineOrder: null },
  ai: { label: "Artificial Intelligence", shortLabel: "AI", spineOrder: 0 },
  ml: { label: "Machine Learning", shortLabel: "ML", spineOrder: 1 },
  dl: { label: "Deep Learning", shortLabel: "DL", spineOrder: 2 },
  genai: { label: "Generative AI", shortLabel: "GenAI", spineOrder: null },
  responsible: {
    label: "Responsible AI",
    shortLabel: "Responsible",
    spineOrder: null,
  },
  mlops: {
    label: "Production and MLOps",
    shortLabel: "MLOps",
    spineOrder: null,
  },
  research: {
    label: "Research Practice",
    shortLabel: "Research",
    spineOrder: null,
  },
};

/** The concentric domains, outermost first. */
export const SPINE_DOMAINS: Domain[] = domainSchema.options
  .filter((domain) => DOMAIN_META[domain].spineOrder !== null)
  .sort((a, b) => DOMAIN_META[a].spineOrder! - DOMAIN_META[b].spineOrder!);
