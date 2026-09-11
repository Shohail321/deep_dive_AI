import type { ConceptId } from "@/curriculum/metadata";

export type QuestionKind = "multiple-choice" | "true-false";

export interface QuizQuestion {
  id: string;
  kind: QuestionKind;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
}

export interface Quiz {
  conceptId: ConceptId;
  questions: QuizQuestion[];
}
