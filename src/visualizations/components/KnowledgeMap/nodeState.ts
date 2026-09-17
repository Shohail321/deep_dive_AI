import type { Concept, ConceptId } from "@/curriculum/metadata";
import type { ProgressStore } from "@/progress";

/**
 * Achievement, independent of anything the learner currently has selected.
 * Derived from `ConceptProgress` rather than stored as its own field:
 * `completed` is the lesson finished, `mastered` is the lesson *and* the
 * quiz both finished — demonstrated understanding, not just exposure. With
 * no progress store wired up (there is no persistence yet — see Phase 7 in
 * the project roadmap), every concept is honestly `unexplored` rather than
 * fabricating progress that was never earned.
 */
export type MasteryVisualState = "unexplored" | "completed" | "mastered";

/** Where a concept sits relative to whatever is currently selected. */
export type RelationVisualState =
  "none" | "selected" | "prerequisite" | "related";

export interface NodeVisualState {
  mastery: MasteryVisualState;
  relation: RelationVisualState;
  locked: boolean;
  /** Populated only when `locked` — the unfinished hard prerequisites. */
  lockedBecause: Concept[];
}

export function isCompleted(
  concept: Concept,
  progress?: ProgressStore,
): boolean {
  return progress?.getProgress(concept.id)?.lesson === "completed";
}

export function isMastered(
  concept: Concept,
  progress?: ProgressStore,
): boolean {
  const record = progress?.getProgress(concept.id);
  return record?.lesson === "completed" && record?.quiz === "completed";
}

export function getMasteryVisualState(
  concept: Concept,
  progress?: ProgressStore,
): MasteryVisualState {
  if (isMastered(concept, progress)) return "mastered";
  if (isCompleted(concept, progress)) return "completed";
  return "unexplored";
}

/**
 * A concept is locked only for a concrete, statable reason: it has a hard
 * prerequisite (`relationships.prerequisites`, not the soft
 * `recommendedPrerequisites`) that has not been completed yet. With no
 * progress store, nothing is locked — there is no real basis to gate on.
 */
export function getIncompletePrerequisites(
  concept: Concept,
  progress: ProgressStore | undefined,
  byId: ReadonlyMap<ConceptId, Concept>,
): Concept[] {
  if (!progress) return [];

  return concept.relationships.prerequisites
    .map((id) => byId.get(id))
    .filter((prerequisite): prerequisite is Concept => {
      if (!prerequisite) return false;
      return !isCompleted(prerequisite, progress);
    });
}

export interface NodeVisualStateContext {
  selectedId?: ConceptId | null;
  /** Direct prerequisite ids of the currently selected concept. */
  prerequisiteIds?: ReadonlySet<ConceptId>;
  /** Related-concept ids of the currently selected concept. */
  relatedIds?: ReadonlySet<ConceptId>;
  progress?: ProgressStore;
  /** Required only to explain a lock — resolves prerequisite ids to concepts. */
  byId?: ReadonlyMap<ConceptId, Concept>;
}

export function computeNodeVisualState(
  concept: Concept,
  context: NodeVisualStateContext = {},
): NodeVisualState {
  const { selectedId, prerequisiteIds, relatedIds, progress, byId } = context;

  const relation: RelationVisualState =
    selectedId === concept.id
      ? "selected"
      : prerequisiteIds?.has(concept.id)
        ? "prerequisite"
        : relatedIds?.has(concept.id)
          ? "related"
          : "none";

  const lockedBecause = byId
    ? getIncompletePrerequisites(concept, progress, byId)
    : [];

  return {
    mastery: getMasteryVisualState(concept, progress),
    relation,
    locked: lockedBecause.length > 0,
    lockedBecause,
  };
}
