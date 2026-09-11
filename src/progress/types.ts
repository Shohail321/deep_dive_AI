import type { ConceptId } from "@/curriculum/metadata";

export type ProgressState = "not-started" | "in-progress" | "completed";

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
