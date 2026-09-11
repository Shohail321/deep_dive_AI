import { defineConcept } from "../../metadata";

export const gradientDescent = defineConcept({
  id: "gradient-descent",
  slug: "gradient-descent",
  title: "Gradient Descent",
  summary:
    "Walking downhill on a loss surface in small steps, which is how nearly every model in this curriculum is actually trained.",
  domain: "ml",
  category: "Optimisation",
  tags: ["optimisation", "training", "core"],
  difficulty: "intermediate",
  estimatedMinutes: 30,
  learningObjectives: [
    "Describe a gradient as the direction of steepest increase",
    "Explain what the learning rate controls, and how it fails at both extremes",
    "Trace why the steps shorten as the optimiser nears a minimum",
  ],
  aliases: ["Steepest descent"],
  searchKeywords: [
    "gradient descent",
    "learning rate",
    "optimisation",
    "loss surface",
  ],
  relationships: {
    parents: ["machine-learning"],
    prerequisites: ["machine-learning"],
    recommendedPrerequisites: ["linear-regression"],
    relatedConcepts: ["linear-regression"],
  },
  importance: {
    intuitive: 5,
    mathematical: 5,
    coding: 4,
    practical: 4,
    research: 4,
  },
  content: {
    hasLesson: true,
    hasVisualization: true,
    hasQuiz: true,
    hasPlayground: true,
    hasMath: true,
    hasCode: true,
  },
  visualization: { visualizationType: "plot", interactionType: "step" },
  editorial: {
    glossaryTerms: [
      "Gradient",
      "Learning rate",
      "Local minimum",
      "Convergence",
    ],
    commonMisconceptions: [
      "A larger learning rate always trains faster",
      "Gradient descent finds the global minimum",
    ],
    references: [
      {
        title: "Deep Learning, chapter 4: Numerical Computation",
        url: "https://www.deeplearningbook.org/contents/numerical.html",
        kind: "book",
      },
    ],
  },
  status: "drafting",
});
