import { defineConcept } from "../../metadata";

export const deepLearning = defineConcept({
  id: "deep-learning",
  slug: "deep-learning",
  title: "Deep Learning",
  shortTitle: "DL",
  summary:
    "Machine learning with many-layered neural networks, where the useful representations are learned from data instead of designed by hand.",
  domain: "dl",
  category: "Foundations",
  tags: ["foundations", "overview", "neural-networks"],
  difficulty: "beginner",
  estimatedMinutes: 15,
  learningObjectives: [
    "Explain what the depth in deep learning refers to",
    "Describe why learned representations displaced hand-engineered features",
    "Say when depth helps and when it is unnecessary",
  ],
  aliases: ["DL"],
  searchKeywords: ["deep learning", "dl", "representation learning"],
  relationships: {
    parents: ["machine-learning"],
    prerequisites: ["machine-learning"],
  },
  importance: {
    intuitive: 5,
    mathematical: 4,
    coding: 4,
    practical: 5,
    research: 5,
  },
  content: {
    hasLesson: true,
    hasVisualization: true,
    hasRealWorldExample: true,
  },
  visualization: { visualizationType: "network", interactionType: "hover" },
  editorial: {
    glossaryTerms: ["Representation learning", "Layer", "Feature hierarchy"],
    commonMisconceptions: [
      "Deep learning works like the human brain",
      "Deeper networks are always better",
    ],
    references: [
      {
        title: "Deep Learning",
        url: "https://www.deeplearningbook.org/",
        kind: "book",
      },
    ],
  },
  status: "drafting",
});
