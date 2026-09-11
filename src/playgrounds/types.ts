import type { ConceptId } from "@/curriculum/metadata";

export interface PlaygroundDefinition {
  id: string;
  conceptId: ConceptId;
  title: string;
  description: string;
}
