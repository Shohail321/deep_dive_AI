import { defineArea } from "../authoring";

const feedforward = defineArea({
  domain: "dl",
  category: "Architectures",
  parents: ["deep-learning"],
});
const convolutional = defineArea({
  domain: "dl",
  category: "Architectures",
  subcategory: "Convolutional",
  parents: ["convolutional-neural-network"],
});
const recurrent = defineArea({
  domain: "dl",
  category: "Architectures",
  subcategory: "Recurrent",
  parents: ["recurrent-neural-network"],
});
const attention = defineArea({
  domain: "dl",
  category: "Architectures",
  subcategory: "Attention",
  parents: ["attention"],
});

export const architectureConcepts = [
  ...feedforward([
    {
      id: "feedforward-networks",
      title: "Feedforward Networks",
      summary:
        "The plain stack of fully connected layers, where information moves in one direction only.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 3, 4, 4, 3],
      prerequisites: ["neural-network"],
    },
    {
      id: "residual-connections",
      title: "Residual Connections",
      summary:
        "Letting a layer's input skip past it, which is what made very deep networks trainable.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 4, 5, 5],
      prerequisites: ["layers"],
      aliases: ["Skip connections", "ResNet"],
      related: ["vanishing-gradients"],
    },
  ]),

  ...convolutional([
    {
      id: "convolutional-neural-network",
      title: "Convolutional Neural Network",
      summary:
        "A network that slides small filters across an input, exploiting the fact that nearby pixels relate.",
      difficulty: "intermediate",
      minutes: 35,
      importance: [5, 4, 4, 5, 4],
      parents: ["deep-learning"],
      prerequisites: ["neural-network"],
      aliases: ["CNN", "ConvNet"],
      content: { hasVisualization: true },
      visualization: { visualizationType: "network", interactionType: "hover" },
    },
    {
      id: "convolution",
      title: "Convolution",
      summary:
        "Sliding a small window over an input and taking a weighted sum at each position.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 4, 4, 4, 4],
      prerequisites: ["matrix-multiplication"],
      keywords: ["stride", "padding", "kernel"],
    },
    {
      id: "filters",
      title: "Filters",
      summary:
        "The learned windows that detect edges, textures and, deeper in, whole objects.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 3, 4, 4, 3],
      prerequisites: ["convolution"],
      aliases: ["Kernels (CNN)", "Feature maps"],
    },
    {
      id: "pooling",
      title: "Pooling",
      summary:
        "Shrinking a feature map by summarising each neighbourhood, buying some shift tolerance.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 3, 4, 4, 3],
      prerequisites: ["convolution"],
      keywords: ["max pooling", "average pooling"],
    },
  ]),

  ...recurrent([
    {
      id: "recurrent-neural-network",
      title: "Recurrent Neural Network",
      summary:
        "A network with a loop, carrying a hidden state forward so order and history matter.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 3, 4],
      parents: ["deep-learning"],
      prerequisites: ["neural-network"],
      aliases: ["RNN"],
    },
    {
      id: "vanishing-gradients",
      title: "Vanishing Gradients",
      summary:
        "Gradients shrinking toward zero as they travel back, so early layers stop learning.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 5, 3, 4, 5],
      prerequisites: ["backpropagation"],
    },
    {
      id: "exploding-gradients",
      title: "Exploding Gradients",
      summary:
        "Gradients growing without bound on the way back, throwing training off entirely.",
      difficulty: "advanced",
      minutes: 20,
      importance: [4, 5, 3, 4, 4],
      prerequisites: ["backpropagation"],
      keywords: ["gradient clipping"],
    },
    {
      id: "lstm",
      title: "LSTM",
      summary:
        "A recurrent cell with gates that decide what to keep and what to forget across long sequences.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 3, 4],
      prerequisites: ["recurrent-neural-network", "vanishing-gradients"],
      aliases: ["Long short-term memory"],
    },
    {
      id: "gru",
      title: "GRU",
      summary:
        "A lighter gated cell that often matches LSTM with fewer parameters.",
      difficulty: "advanced",
      minutes: 20,
      importance: [3, 4, 3, 3, 3],
      prerequisites: ["lstm"],
      aliases: ["Gated recurrent unit"],
    },
  ]),

  ...attention([
    {
      id: "sequence-modelling",
      title: "Sequence Modelling",
      summary:
        "Predicting over ordered data, where what came before changes what should come next.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      parents: ["deep-learning"],
    },
    {
      id: "encoder-decoder",
      title: "Encoder-Decoder Models",
      summary:
        "Compressing an input into a representation, then generating an output from it.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 4, 4, 5],
      parents: ["deep-learning"],
      prerequisites: ["sequence-modelling"],
      aliases: ["Seq2seq"],
    },
    {
      id: "attention",
      title: "Attention",
      summary:
        "Letting a model weigh which parts of its input matter for the piece it is producing now.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 5, 4, 5, 5],
      parents: ["deep-learning"],
      prerequisites: ["encoder-decoder"],
    },
    {
      id: "self-attention",
      title: "Self-Attention",
      summary:
        "Every position in a sequence attending to every other, rather than to a separate input.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 5, 4, 5, 5],
      prerequisites: ["attention"],
      keywords: ["query", "key", "value"],
    },
    {
      id: "multi-head-attention",
      title: "Multi-Head Attention",
      summary:
        "Running several attention operations in parallel so different relationships can be tracked at once.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 5, 4, 4, 5],
      prerequisites: ["self-attention"],
    },
    {
      id: "positional-encoding",
      title: "Positional Encoding",
      summary:
        "Injecting order into a model that would otherwise treat a sequence as a bag of tokens.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 5, 4, 4, 5],
      prerequisites: ["self-attention"],
    },
    {
      id: "transformer",
      title: "Transformer",
      summary:
        "An architecture that lets every position in a sequence attend directly to every other, which is what made today's large language models possible.",
      difficulty: "advanced",
      minutes: 45,
      importance: [4, 5, 4, 5, 5],
      parents: ["deep-learning"],
      prerequisites: ["multi-head-attention", "positional-encoding"],
      related: ["neural-network"],
      aliases: ["Transformer architecture"],
      keywords: ["transformer", "attention", "llm"],
      content: {
        hasLesson: true,
        hasVisualization: true,
        hasMath: true,
        hasCode: true,
        hasRealWorldExample: true,
      },
      visualization: { visualizationType: "diagram", interactionType: "hover" },
    },
  ]),
];
