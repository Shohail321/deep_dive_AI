import type { ReactNode } from "react";
import type { ConceptId } from "@/curriculum/metadata";

/**
 * The pedagogical pipeline from the project's educational principles.
 * A lesson is not required to use every stage — only the ones that make
 * sense for that concept.
 */
export type LessonStageKind =
  | "intuition"
  | "interaction"
  | "observation"
  | "explanation"
  | "formal-definition"
  | "mathematics"
  | "code"
  | "example"
  | "misconception"
  | "practice"
  | "related-concepts";

export interface LessonStage {
  kind: LessonStageKind;
  /** Rendered content for this stage, supplied by the content layer (MDX or a custom component) — the engine has no opinion on what it contains. */
  content: ReactNode;
}

export interface Lesson {
  conceptId: ConceptId;
  title: string;
  stages: LessonStage[];
}
