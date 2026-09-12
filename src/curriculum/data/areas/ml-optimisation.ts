import { defineArea } from "../authoring";

const objectives = defineArea({
  domain: "ml",
  category: "Optimisation",
  subcategory: "Objectives",
  parents: ["objective-functions"],
});
const descent = defineArea({
  domain: "ml",
  category: "Optimisation",
  subcategory: "Gradient descent",
  parents: ["gradient-descent"],
});
const optimisers = defineArea({
  domain: "ml",
  category: "Optimisation",
  subcategory: "Optimisers",
  parents: ["gradient-descent"],
});

export const optimisationConcepts = [
  ...objectives([
    {
      id: "objective-functions",
      title: "Objective Functions",
      summary:
        "The quantity training is trying to make as small as possible, which defines what the model values.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 5, 3, 5, 4],
      parents: ["machine-learning"],
      prerequisites: ["mathematical-optimisation"],
    },
    {
      id: "loss-functions",
      title: "Loss Functions",
      summary:
        "How wrong a single prediction is, scored in a way the optimiser can differentiate.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 5, 4, 5, 4],
      prerequisites: ["objective-functions"],
      aliases: ["Cost function", "Loss"],
    },
    {
      id: "cross-entropy-loss",
      title: "Cross-Entropy Loss",
      summary:
        "The standard loss for classification, punishing confident predictions that turn out wrong.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 5, 4, 5, 4],
      prerequisites: ["loss-functions", "logarithms"],
      related: ["information-theory", "softmax"],
    },
  ]),

  ...descent([
    {
      id: "gradient-descent",
      title: "Gradient Descent",
      summary:
        "Walking downhill on a loss surface in small steps, which is how nearly every model in this curriculum is actually trained.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 5, 4, 4, 4],
      parents: ["machine-learning"],
      prerequisites: ["gradients", "loss-functions"],
      recommended: ["linear-regression"],
      aliases: ["Steepest descent"],
      content: {
        hasLesson: true,
        hasVisualization: true,
        hasQuiz: true,
        hasPlayground: true,
        hasMath: true,
        hasCode: true,
      },
      visualization: { visualizationType: "plot", interactionType: "step" },
      status: "drafting",
    },
    {
      id: "batch-gradient-descent",
      title: "Batch Gradient Descent",
      summary:
        "Computing the gradient over the whole dataset before taking one step.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 4, 3, 3, 3],
      prerequisites: ["gradient-descent"],
    },
    {
      id: "stochastic-gradient-descent",
      title: "Stochastic Gradient Descent",
      summary:
        "Stepping after every single example: noisier, far cheaper, and often better at escaping poor minima.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 4, 5, 4],
      prerequisites: ["gradient-descent"],
      aliases: ["SGD"],
    },
    {
      id: "mini-batch-training",
      title: "Mini-Batch Training",
      summary:
        "The practical middle ground, and the reason batch size is a hyperparameter you tune.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 3, 5, 5, 3],
      prerequisites: ["stochastic-gradient-descent"],
      keywords: ["batch size", "epoch"],
    },
    {
      id: "learning-rate",
      title: "Learning Rate",
      summary:
        "How far each step moves, and the single setting most likely to make or break training.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 5, 5, 4],
      prerequisites: ["gradient-descent"],
      content: { hasPlayground: true },
    },
    {
      id: "learning-rate-schedules",
      title: "Learning-Rate Schedules",
      summary:
        "Changing the step size over training — large early to move, small later to settle.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 5, 4],
      prerequisites: ["learning-rate"],
      keywords: ["warmup", "cosine decay", "step decay"],
    },
    {
      id: "local-minima",
      title: "Local Minima and Saddle Points",
      summary:
        "Places where the gradient vanishes without the loss being as low as it could go.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 5, 2, 3, 4],
      prerequisites: ["gradient-descent"],
      related: ["convexity"],
    },
  ]),

  ...optimisers([
    {
      id: "momentum",
      title: "Momentum",
      summary:
        "Carrying a running average of past steps, which smooths the path and speeds up narrow valleys.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 4, 4],
      prerequisites: ["stochastic-gradient-descent"],
    },
    {
      id: "rmsprop",
      title: "RMSProp",
      summary:
        "Scaling each parameter's step by how large its recent gradients have been.",
      difficulty: "advanced",
      minutes: 20,
      importance: [3, 4, 4, 4, 4],
      prerequisites: ["stochastic-gradient-descent"],
    },
    {
      id: "adam",
      title: "Adam",
      summary:
        "Momentum and per-parameter scaling combined, and the default optimiser for most deep learning.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 5, 5, 4],
      prerequisites: ["momentum", "rmsprop"],
      aliases: ["AdamW"],
    },
    {
      id: "second-order-methods",
      title: "Second-Order Methods",
      summary:
        "Using curvature as well as slope, powerful in principle and usually too expensive at scale.",
      difficulty: "advanced",
      minutes: 25,
      importance: [2, 5, 2, 2, 4],
      prerequisites: ["gradient-descent", "partial-derivatives"],
      keywords: ["newton's method", "hessian"],
    },
  ]),
];
