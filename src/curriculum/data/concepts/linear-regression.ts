import { defineConcept } from "../../metadata";

export const linearRegression = defineConcept({
  id: "linear-regression",
  slug: "linear-regression",
  title: "Linear Regression",
  summary:
    "Fitting a straight line through data to predict a continuous value, and the smallest complete example of what every supervised model does.",
  domain: "ml",
  category: "Supervised learning",
  subcategory: "Regression",
  tags: ["regression", "supervised", "first-model"],
  difficulty: "beginner",
  estimatedMinutes: 25,
  learningObjectives: [
    "Fit a line to data by minimising squared error",
    "Read slope and intercept as claims about the data",
    "Explain why the squared error is the quantity being minimised",
  ],
  aliases: ["Least squares", "OLS"],
  searchKeywords: [
    "linear regression",
    "least squares",
    "line of best fit",
    "ols",
  ],
  relationships: {
    parents: ["machine-learning"],
    prerequisites: ["machine-learning"],
    relatedConcepts: ["gradient-descent"],
  },
  importance: {
    intuitive: 5,
    mathematical: 4,
    coding: 4,
    practical: 4,
    research: 2,
  },
  content: {
    hasLesson: true,
    hasVisualization: true,
    hasQuiz: true,
    hasPlayground: true,
    hasMath: true,
    hasCode: true,
    hasRealWorldExample: true,
  },
  visualization: { visualizationType: "plot", interactionType: "drag" },
  editorial: {
    glossaryTerms: ["Residual", "Mean squared error", "Coefficient"],
    commonMisconceptions: [
      "A good fit on the training points means the model will predict well",
      "A linear model can only capture straight-line relationships",
    ],
    references: [
      {
        title: "An Introduction to Statistical Learning, chapter 3",
        url: "https://www.statlearning.com/",
        kind: "book",
      },
    ],
  },
  status: "drafting",
});
