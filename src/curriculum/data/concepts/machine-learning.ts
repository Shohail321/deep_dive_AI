import { defineConcept } from "../../metadata";

export const machineLearning = defineConcept({
  id: "machine-learning",
  slug: "machine-learning",
  title: "Machine Learning",
  shortTitle: "ML",
  summary:
    "Building systems that improve at a task by finding patterns in data, rather than by being given explicit rules for it.",
  domain: "ml",
  category: "Foundations",
  tags: ["foundations", "overview"],
  difficulty: "intro",
  estimatedMinutes: 15,
  learningObjectives: [
    "Explain how learning from data differs from writing rules by hand",
    "Distinguish supervised, unsupervised, and reinforcement learning",
    "Identify the parts common to every ML workflow, from data to evaluation",
  ],
  aliases: ["ML"],
  searchKeywords: ["machine learning", "ml", "statistical learning"],
  relationships: {
    parents: ["artificial-intelligence"],
  },
  importance: {
    intuitive: 5,
    mathematical: 3,
    coding: 4,
    practical: 5,
    research: 4,
  },
  content: {
    hasLesson: true,
    hasVisualization: true,
    hasRealWorldExample: true,
  },
  visualization: { visualizationType: "diagram", interactionType: "hover" },
  editorial: {
    glossaryTerms: ["Model", "Training", "Inference", "Generalisation"],
    commonMisconceptions: [
      "A model that fits its training data well is necessarily a good model",
      "More data always beats a better-chosen model",
    ],
    references: [
      {
        title: "An Introduction to Statistical Learning",
        url: "https://www.statlearning.com/",
        kind: "book",
      },
    ],
  },
  status: "drafting",
});
