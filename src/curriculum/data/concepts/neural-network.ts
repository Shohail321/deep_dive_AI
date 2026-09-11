import { defineConcept } from "../../metadata";

export const neuralNetwork = defineConcept({
  id: "neural-network",
  slug: "neural-network",
  title: "Neural Network",
  summary:
    "Layers of simple weighted units composed into a function flexible enough to fit almost any relationship, given enough data.",
  domain: "dl",
  category: "Architectures",
  subcategory: "Feedforward",
  tags: ["neural-networks", "architecture", "core"],
  difficulty: "intermediate",
  estimatedMinutes: 35,
  learningObjectives: [
    "Trace a single input through weights, bias, and activation to an output",
    "Explain why a non-linear activation is what makes depth worth having",
    "Read a network diagram as a composition of functions",
  ],
  aliases: ["MLP", "Feedforward network", "Artificial neural network"],
  searchKeywords: [
    "neural network",
    "mlp",
    "perceptron",
    "activation function",
    "hidden layer",
  ],
  relationships: {
    parents: ["deep-learning"],
    prerequisites: ["deep-learning", "gradient-descent"],
    recommendedPrerequisites: ["linear-regression"],
  },
  importance: {
    intuitive: 5,
    mathematical: 4,
    coding: 5,
    practical: 5,
    research: 5,
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
  visualization: { visualizationType: "network", interactionType: "parameter" },
  editorial: {
    glossaryTerms: ["Neuron", "Weight", "Bias", "Activation function", "Layer"],
    commonMisconceptions: [
      "Neurons in a network work like biological neurons",
      "Stacking linear layers without activations produces a deeper model",
    ],
    references: [
      {
        title: "Neural Networks and Deep Learning",
        url: "http://neuralnetworksanddeeplearning.com/",
        kind: "book",
      },
    ],
  },
  status: "drafting",
});
