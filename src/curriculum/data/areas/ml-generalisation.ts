import { defineArea } from "../authoring";

const fit = defineArea({
  domain: "ml",
  category: "Generalisation",
  parents: ["generalisation"],
});
const regularisation = defineArea({
  domain: "ml",
  category: "Generalisation",
  subcategory: "Regularisation",
  parents: ["regularisation"],
});

export const generalisationConcepts = [
  ...fit([
    {
      id: "generalisation",
      title: "Generalisation",
      summary:
        "Performing well on examples never seen in training, which is the only thing that counts.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 4, 3, 5, 5],
      parents: ["machine-learning"],
      aliases: ["Generalization"],
    },
    {
      id: "overfitting",
      title: "Overfitting",
      summary:
        "Learning the training data's noise so well that performance on new data falls.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 4, 4, 5, 4],
      content: { hasVisualization: true },
      visualization: {
        visualizationType: "plot",
        interactionType: "parameter",
      },
    },
    {
      id: "underfitting",
      title: "Underfitting",
      summary:
        "A model too simple to capture the pattern, doing poorly even on the data it trained on.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 4, 3, 5, 3],
    },
    {
      id: "model-bias",
      title: "Model Bias",
      summary:
        "Error from a model's assumptions being too rigid for the truth — distinct from societal bias.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 4, 2, 4, 4],
      aliases: ["Bias (statistical)"],
      related: ["algorithmic-bias"],
    },
    {
      id: "model-variance",
      title: "Model Variance",
      summary:
        "How much a model's fit swings when the training sample changes.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 4, 2, 4, 4],
      aliases: ["Variance (model)"],
      related: ["variance"],
    },
    {
      id: "bias-variance-tradeoff",
      title: "Bias-Variance Tradeoff",
      summary:
        "The tension between a model too rigid to fit and one too flexible to stay still.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 5, 3, 5, 5],
      prerequisites: ["model-bias", "model-variance"],
      content: { hasVisualization: true },
      visualization: {
        visualizationType: "plot",
        interactionType: "parameter",
      },
    },
    {
      id: "model-capacity",
      title: "Model Capacity",
      summary:
        "How much structure a model is able to represent, and the lever behind both failure modes.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 4, 3, 4, 4],
      related: ["overfitting", "underfitting"],
    },
  ]),

  ...regularisation([
    {
      id: "regularisation",
      title: "Regularisation",
      summary:
        "Deliberately constraining a model so it fits the signal rather than the noise.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 5, 4, 5, 4],
      parents: ["generalisation"],
      prerequisites: ["overfitting"],
      aliases: ["Regularization"],
    },
    {
      id: "l1-regularisation",
      title: "L1 Regularisation",
      summary:
        "Penalising the absolute size of weights, which drives many of them to exactly zero.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 5, 3, 4, 4],
      aliases: ["Lasso penalty"],
      related: ["feature-selection", "sparse-models"],
    },
    {
      id: "l2-regularisation",
      title: "L2 Regularisation",
      summary:
        "Penalising squared weights, shrinking them all without eliminating any.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 5, 3, 5, 4],
      aliases: ["Ridge penalty", "Weight decay"],
    },
    {
      id: "early-stopping",
      title: "Early Stopping",
      summary:
        "Halting training when validation loss stops improving, before memorisation sets in.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 4, 5, 3],
      prerequisites: ["train-validation-test-split"],
    },
    {
      id: "data-augmentation",
      title: "Data Augmentation",
      summary:
        "Creating new training examples by transforming existing ones in ways the label survives.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 2, 4, 5, 4],
      keywords: ["crop", "flip", "noise", "synthetic data"],
    },
  ]),
];
