import { defineArea } from "../authoring";

const root = defineArea({ domain: "dl", category: "Foundations" });
const units = defineArea({
  domain: "dl",
  category: "Building blocks",
  parents: ["neural-network"],
});
const activations = defineArea({
  domain: "dl",
  category: "Building blocks",
  subcategory: "Activation functions",
  parents: ["activation-functions"],
});
const training = defineArea({
  domain: "dl",
  category: "Training neural networks",
  parents: ["neural-network"],
});

export const dlCoreConcepts = [
  ...root([
    {
      id: "deep-learning",
      title: "Deep Learning",
      shortTitle: "DL",
      summary:
        "Machine learning with many-layered neural networks, where the useful representations are learned from data instead of designed by hand.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 4, 4, 5, 5],
      parents: ["machine-learning"],
      prerequisites: ["machine-learning"],
      aliases: ["DL"],
      keywords: ["deep learning", "representation learning"],
      content: {
        hasLesson: true,
        hasVisualization: true,
        hasRealWorldExample: true,
      },
      visualization: { visualizationType: "network", interactionType: "hover" },
      status: "drafting",
    },
    {
      id: "why-depth-helps",
      title: "Why Depth Helps",
      summary:
        "How stacked layers build features on features, and when the extra depth buys nothing.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 2, 4, 5],
      parents: ["deep-learning"],
      prerequisites: ["deep-learning"],
    },
    {
      id: "universal-approximation",
      title: "Universal Approximation",
      summary:
        "The result that a wide enough network can approximate almost any function — and why that guarantees little in practice.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 5, 1, 2, 5],
      parents: ["deep-learning"],
      prerequisites: ["neural-network"],
    },
  ]),

  ...units([
    {
      id: "perceptron",
      title: "Perceptron",
      summary:
        "The original single-unit classifier, and the historical root of everything in this domain.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 3, 2, 3],
      parents: ["deep-learning"],
      prerequisites: ["vectors"],
    },
    {
      id: "neural-network",
      title: "Neural Network",
      summary:
        "Layers of simple weighted units composed into a function flexible enough to fit almost any relationship, given enough data.",
      difficulty: "intermediate",
      minutes: 35,
      importance: [5, 4, 5, 5, 5],
      parents: ["deep-learning"],
      prerequisites: ["deep-learning", "gradient-descent"],
      recommended: ["linear-regression"],
      aliases: ["MLP", "Feedforward network", "Artificial neural network"],
      keywords: ["mlp", "perceptron", "hidden layer"],
      content: {
        hasLesson: true,
        hasVisualization: true,
        hasQuiz: true,
        hasPlayground: true,
        hasMath: true,
        hasCode: true,
        hasRealWorldExample: true,
      },
      visualization: {
        visualizationType: "network",
        interactionType: "parameter",
      },
      status: "drafting",
    },
    {
      id: "neurons",
      title: "Neurons",
      summary:
        "A weighted sum followed by a non-linearity — the whole of a unit, and nothing like a brain cell.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 4, 3, 3],
      prerequisites: ["perceptron"],
      aliases: ["Units"],
    },
    {
      id: "weights",
      title: "Weights",
      summary:
        "The learned numbers scaling each input, which is where a trained network's knowledge lives.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 4, 4, 4, 3],
      prerequisites: ["neurons"],
    },
    {
      id: "bias-term",
      title: "Bias Term",
      summary:
        "The learned offset added before the activation, letting a unit shift its threshold.",
      difficulty: "beginner",
      minutes: 15,
      importance: [4, 4, 3, 3, 2],
      prerequisites: ["neurons"],
      aliases: ["Bias (neural network)"],
      related: ["model-bias"],
    },
    {
      id: "layers",
      title: "Layers",
      summary:
        "Groups of units applied together, stacked so each one transforms the last one's output.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 5, 4, 3],
      prerequisites: ["neurons"],
    },
  ]),

  ...activations([
    {
      id: "activation-functions",
      title: "Activation Functions",
      summary:
        "The non-linearity after each unit, without which any stack of layers collapses to one.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 4, 4, 4],
      parents: ["neural-network"],
      prerequisites: ["neurons"],
    },
    {
      id: "sigmoid",
      title: "Sigmoid",
      summary:
        "Squashes any number into the range zero to one, which is why it reads as a probability.",
      difficulty: "beginner",
      minutes: 15,
      importance: [4, 4, 3, 3, 2],
      related: ["vanishing-gradients"],
    },
    {
      id: "tanh",
      title: "Tanh",
      summary:
        "A zero-centred cousin of sigmoid, ranging from minus one to one.",
      difficulty: "beginner",
      minutes: 15,
      importance: [3, 4, 3, 3, 2],
    },
    {
      id: "relu",
      title: "ReLU",
      summary:
        "Passes positives through and zeroes negatives, cheap enough and effective enough to become the default.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 4, 4, 5, 4],
      aliases: ["Rectified linear unit"],
    },
    {
      id: "gelu",
      title: "GELU",
      summary:
        "A smooth alternative to ReLU used throughout transformer architectures.",
      difficulty: "advanced",
      minutes: 15,
      importance: [3, 4, 3, 4, 4],
      prerequisites: ["relu"],
    },
    {
      id: "softmax",
      title: "Softmax",
      summary:
        "Turns a vector of scores into probabilities that sum to one, for picking among classes.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 4, 4, 5, 4],
      prerequisites: ["exponents"],
      related: ["cross-entropy-loss"],
    },
  ]),

  ...training([
    {
      id: "forward-propagation",
      title: "Forward Propagation",
      summary: "Pushing an input through every layer to produce a prediction.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 4, 4, 4, 3],
      prerequisites: ["layers"],
    },
    {
      id: "computational-graphs",
      title: "Computational Graphs",
      summary:
        "Representing a calculation as a graph of operations, which is what makes automatic differentiation possible.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 5, 4, 4],
      prerequisites: ["forward-propagation"],
      aliases: ["Autograd", "Automatic differentiation"],
    },
    {
      id: "backpropagation",
      title: "Backpropagation",
      summary:
        "Working out which weights are to blame for the error, by applying the chain rule backwards.",
      difficulty: "advanced",
      minutes: 35,
      importance: [5, 5, 4, 4, 5],
      prerequisites: ["chain-rule", "forward-propagation"],
      content: { hasVisualization: true },
      visualization: { visualizationType: "network", interactionType: "step" },
    },
    {
      id: "weight-initialisation",
      title: "Weight Initialisation",
      summary:
        "Choosing the starting weights so signals neither vanish nor explode on the first pass.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 4, 4],
      prerequisites: ["weights"],
      keywords: ["xavier", "he initialisation"],
    },
    {
      id: "normalisation-layers",
      title: "Normalisation Layers",
      summary:
        "Rescaling activations inside the network to keep training stable as it deepens.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 5, 4],
      prerequisites: ["layers"],
      related: ["feature-normalisation"],
    },
    {
      id: "batch-normalisation",
      title: "Batch Normalisation",
      summary:
        "Normalising each feature across the mini-batch, which lets networks train faster and deeper.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 5, 4],
      parents: ["normalisation-layers"],
      prerequisites: ["normalisation-layers", "mini-batch-training"],
    },
    {
      id: "layer-normalisation",
      title: "Layer Normalisation",
      summary:
        "Normalising across features within a single example, which is what transformers use.",
      difficulty: "advanced",
      minutes: 20,
      importance: [4, 4, 4, 5, 4],
      parents: ["normalisation-layers"],
      prerequisites: ["normalisation-layers"],
    },
    {
      id: "dropout",
      title: "Dropout",
      summary:
        "Randomly switching units off during training so the network cannot lean on any one of them.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 3, 4, 5, 4],
      prerequisites: ["regularisation"],
    },
  ]),
];
