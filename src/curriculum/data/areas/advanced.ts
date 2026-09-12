import { defineArea } from "../authoring";

const probabilistic = defineArea({
  domain: "ml",
  category: "Advanced methods",
  subcategory: "Probabilistic",
  parents: ["machine-learning"],
});
const causal = defineArea({
  domain: "ml",
  category: "Advanced methods",
  subcategory: "Causality",
  parents: ["machine-learning"],
});
const learningSettings = defineArea({
  domain: "ml",
  category: "Advanced methods",
  subcategory: "Learning settings",
  parents: ["machine-learning"],
});
const efficiency = defineArea({
  domain: "dl",
  category: "Model efficiency",
  parents: ["model-compression"],
});

export const advancedConcepts = [
  ...probabilistic([
    {
      id: "bayesian-ml",
      title: "Bayesian Machine Learning",
      summary:
        "Treating parameters as distributions rather than point estimates, so uncertainty comes built in.",
      difficulty: "advanced",
      minutes: 35,
      importance: [3, 5, 3, 3, 5],
      prerequisites: ["bayes-theorem", "probability-distributions"],
    },
    {
      id: "probabilistic-graphical-models",
      title: "Probabilistic Graphical Models",
      summary:
        "Encoding which variables depend on which as a graph, then reasoning over it.",
      difficulty: "advanced",
      minutes: 35,
      importance: [2, 5, 2, 2, 5],
      prerequisites: ["bayesian-ml"],
      aliases: ["Bayesian networks", "Markov random fields"],
    },
  ]),

  ...causal([
    {
      id: "causal-inference",
      title: "Causal Inference",
      summary:
        "Working out what would happen if you intervened, which correlation alone can never tell you.",
      difficulty: "advanced",
      minutes: 35,
      importance: [5, 5, 2, 5, 5],
      prerequisites: ["correlation", "probability"],
      keywords: ["confounding", "counterfactual", "do-calculus"],
    },
    {
      id: "causal-ml",
      title: "Causal Machine Learning",
      summary:
        "Using ML to estimate treatment effects rather than to predict outcomes.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 5, 3, 5, 5],
      prerequisites: ["causal-inference"],
      keywords: ["uplift modelling", "treatment effect"],
    },
    {
      id: "experiment-design",
      title: "Experimental Design",
      summary:
        "Setting up a comparison whose result can actually be attributed to the change you made.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 4, 2, 5, 5],
      prerequisites: ["hypothesis-testing"],
      aliases: ["A/B testing", "Randomised controlled trial"],
    },
  ]),

  ...learningSettings([
    {
      id: "meta-learning",
      title: "Meta-Learning",
      summary:
        "Learning how to learn, so a new task can be picked up from very few examples.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 5, 3, 3, 5],
      prerequisites: ["transfer-learning"],
      aliases: ["Few-shot learning"],
    },
    {
      id: "domain-adaptation",
      title: "Domain Adaptation",
      summary:
        "Carrying a model to a related but differently distributed setting without fresh labels.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 4, 3, 5, 5],
      prerequisites: ["transfer-learning"],
      related: ["data-drift"],
    },
    {
      id: "active-learning",
      title: "Active Learning",
      summary:
        "Letting the model choose which examples are worth the cost of labelling next.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 3, 5, 5],
      prerequisites: ["supervised-learning", "uncertainty-quantification"],
    },
    {
      id: "weak-supervision",
      title: "Weak Supervision",
      summary:
        "Building training labels from heuristics and noisy sources instead of careful annotation.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 3, 4, 5, 4],
      prerequisites: ["supervised-learning"],
      aliases: ["Programmatic labelling"],
    },
    {
      id: "continual-learning",
      title: "Continual Learning",
      summary:
        "Learning new tasks over time without erasing what was already learned.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 3, 4, 5],
      keywords: ["catastrophic forgetting"],
    },
    {
      id: "federated-learning",
      title: "Federated Learning",
      summary:
        "Training across many devices while their raw data stays where it is.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 4, 4, 4, 5],
      prerequisites: ["privacy"],
    },
  ]),

  ...efficiency([
    {
      id: "model-compression",
      title: "Model Compression",
      summary:
        "Making a trained model smaller and faster without losing much of what it knows.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 3, 5, 5, 4],
      parents: ["deep-learning"],
    },
    {
      id: "knowledge-distillation",
      title: "Knowledge Distillation",
      summary:
        "Training a small model to imitate a large one's outputs rather than the raw labels.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 5, 5],
      prerequisites: ["model-compression"],
      aliases: ["Teacher-student"],
    },
    {
      id: "pruning",
      title: "Pruning",
      summary:
        "Removing weights that contribute little, leaving a smaller network that performs about as well.",
      difficulty: "advanced",
      minutes: 20,
      importance: [3, 4, 4, 5, 4],
      prerequisites: ["model-compression"],
    },
    {
      id: "quantisation",
      title: "Quantisation",
      summary:
        "Storing weights at lower precision, which is what lets large models run on modest hardware.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 4, 5, 5, 4],
      prerequisites: ["model-compression", "numerical-computation"],
      aliases: ["Quantization", "int8", "4-bit"],
    },
    {
      id: "sparse-models",
      title: "Sparse Models",
      summary:
        "Architectures where most weights or activations are zero, traded for speed and size.",
      difficulty: "advanced",
      minutes: 25,
      importance: [2, 4, 4, 4, 5],
      prerequisites: ["pruning"],
      related: ["l1-regularisation"],
    },
    {
      id: "mixture-of-experts",
      title: "Mixture of Experts",
      summary:
        "Routing each input to a few specialised sub-networks, growing capacity without growing cost per token.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 4, 3, 4, 5],
      prerequisites: ["sparse-models", "transformer"],
      aliases: ["MoE"],
    },
  ]),
];
