import {
  defineConcept,
  type Concept,
  type ConceptInput,
  type Difficulty,
  type Domain,
} from "../metadata";

/**
 * Importance as a fixed 5-tuple, in this order:
 *
 *   [intuitive, mathematical, coding, practical, research]
 *
 * The schema requires all five axes, and spelling them out as an object on
 * every record would add four lines to each of several hundred concepts.
 * The tuple keeps a concept readable at a glance; TypeScript enforces the
 * arity, and `defineConcept` still validates the range.
 */
export type ImportanceTuple = readonly [
  intuitive: number,
  mathematical: number,
  coding: number,
  practical: number,
  research: number,
];

export interface ConceptSpec {
  id: string;
  title: string;
  /** One sentence. Breadth first — lessons carry the explanation. */
  summary: string;
  difficulty: Difficulty;
  minutes: number;
  importance: ImportanceTuple;
  shortTitle?: string;
  subcategory?: string;
  parents?: string[];
  prerequisites?: string[];
  recommended?: string[];
  related?: string[];
  tags?: string[];
  aliases?: string[];
  keywords?: string[];
  content?: ConceptInput["content"];
  visualization?: ConceptInput["visualization"];
  status?: ConceptInput["status"];
}

export interface AreaDefaults {
  domain: Domain;
  category: string;
  subcategory?: string;
  /** Applied to every concept in the area unless a record overrides it. */
  parents?: string[];
  status?: ConceptInput["status"];
}

/**
 * Builds every concept in one area of the curriculum, filling in the domain,
 * category and shared parent so those are stated once rather than on each
 * record. Slugs default to the id — they only diverge when a URL is
 * deliberately reworded.
 */
export function defineArea(
  defaults: AreaDefaults,
): (specs: ConceptSpec[]) => Concept[] {
  return (specs) =>
    specs.map((spec) =>
      defineConcept({
        id: spec.id,
        slug: spec.id,
        title: spec.title,
        shortTitle: spec.shortTitle,
        summary: spec.summary,
        domain: defaults.domain,
        category: defaults.category,
        subcategory: spec.subcategory ?? defaults.subcategory,
        tags: spec.tags,
        difficulty: spec.difficulty,
        estimatedMinutes: spec.minutes,
        aliases: spec.aliases,
        searchKeywords: spec.keywords,
        relationships: {
          parents: spec.parents ?? defaults.parents ?? [],
          prerequisites: spec.prerequisites ?? [],
          recommendedPrerequisites: spec.recommended ?? [],
          relatedConcepts: spec.related ?? [],
        },
        importance: {
          intuitive: spec.importance[0],
          mathematical: spec.importance[1],
          coding: spec.importance[2],
          practical: spec.importance[3],
          research: spec.importance[4],
        },
        content: spec.content,
        visualization: spec.visualization,
        status: spec.status ?? defaults.status ?? "planned",
      }),
    );
}
