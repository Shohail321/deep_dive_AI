import type { ConceptId } from "@/curriculum/metadata";

export type ProgressState = "not-started" | "in-progress" | "completed";

/**
 * How deeply a learner has internalised a concept, as opposed to how far
 * through its material they are (`ProgressState`). Drives the mastery
 * colour ramp in the design system.
 */
export type MasteryLevel = "unexplored" | "familiar" | "practiced" | "mastered";

export interface ConceptProgress {
  conceptId: ConceptId;
  lesson: ProgressState;
  quiz: ProgressState;
}

/**
 * Storage-agnostic contract. The first implementation will likely be
 * Supabase-backed (see Phase 7 in the project roadmap) but nothing here
 * should assume that.
 */
export interface ProgressStore {
  getProgress: (conceptId: ConceptId) => ConceptProgress | undefined;
  setProgress: (progress: ConceptProgress) => void;
}
