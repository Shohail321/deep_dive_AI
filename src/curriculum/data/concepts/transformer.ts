import { defineConcept } from "../../metadata";

export const transformer = defineConcept({
  id: "transformer",
  slug: "transformer",
  title: "Transformer",
  summary:
    "An architecture that lets every position in a sequence attend directly to every other, which is what made today's large language models possible.",
  domain: "dl",
  category: "Architectures",
  subcategory: "Attention",
  tags: ["neural-networks", "architecture", "attention", "sequence"],
  difficulty: "advanced",
  estimatedMinutes: 45,
  learningObjectives: [
    "Explain what attention computes, and over what",
    "Say why attending directly beats passing information along a chain",
    "Identify the parts of a transformer block and what each contributes",
  ],
  aliases: ["Transformer architecture"],
  searchKeywords: [
    "transformer",
    "attention",
    "self-attention",
    "llm",
    "sequence model",
  ],
  relationships: {
    parents: ["deep-learning"],
    prerequisites: ["neural-network"],
    relatedConcepts: ["neural-network"],
  },
  importance: {
    intuitive: 4,
    mathematical: 5,
    coding: 4,
    practical: 5,
    research: 5,
  },
  content: {
    hasLesson: true,
    hasVisualization: true,
    hasMath: true,
    hasCode: true,
    hasRealWorldExample: true,
  },
  visualization: { visualizationType: "diagram", interactionType: "hover" },
  editorial: {
    glossaryTerms: [
      "Attention",
      "Query",
      "Key",
      "Value",
      "Positional encoding",
    ],
    commonMisconceptions: [
      "Attention means the model understands what it is reading",
      "Transformers process sequences in order like a recurrent network",
    ],
    references: [
      {
        title: "Attention Is All You Need",
        url: "https://arxiv.org/abs/1706.03762",
        kind: "paper",
      },
    ],
  },
  status: "planned",
});
