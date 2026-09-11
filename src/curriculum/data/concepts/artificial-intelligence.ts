import { defineConcept } from "../../metadata";

export const artificialIntelligence = defineConcept({
  id: "artificial-intelligence",
  slug: "artificial-intelligence",
  title: "Artificial Intelligence",
  shortTitle: "AI",
  summary:
    "The broad pursuit of building systems that carry out tasks we would call intelligent — reasoning, planning, perceiving, and deciding.",
  domain: "ai",
  category: "Foundations",
  tags: ["foundations", "overview"],
  difficulty: "intro",
  estimatedMinutes: 12,
  learningObjectives: [
    "Describe what distinguishes an AI system from ordinary software",
    "Place machine learning inside the wider field of AI",
    "Recognise that most of AI's history predates machine learning's dominance",
  ],
  aliases: ["AI"],
  searchKeywords: ["artificial intelligence", "ai", "intelligent systems"],
  relationships: {},
  importance: {
    intuitive: 5,
    mathematical: 1,
    coding: 1,
    practical: 4,
    research: 3,
  },
  content: { hasLesson: true, hasRealWorldExample: true },
  editorial: {
    glossaryTerms: ["Artificial intelligence", "Symbolic AI", "Agent"],
    commonMisconceptions: [
      "AI and machine learning are the same thing",
      "AI began with deep learning in the 2010s",
    ],
    references: [
      {
        title: "Artificial Intelligence: A Modern Approach",
        url: "https://aima.cs.berkeley.edu/",
        kind: "book",
      },
    ],
  },
  status: "drafting",
});
