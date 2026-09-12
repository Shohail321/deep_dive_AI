import { defineArea } from "../authoring";

const nlp = defineArea({
  domain: "dl",
  category: "Natural language processing",
  parents: ["natural-language-processing"],
});
const vision = defineArea({
  domain: "dl",
  category: "Computer vision",
  parents: ["computer-vision"],
});
const sequences = defineArea({
  domain: "ml",
  category: "Applied domains",
  parents: ["machine-learning"],
});
const rl = defineArea({
  domain: "ml",
  category: "Reinforcement learning",
  parents: ["reinforcement-learning"],
});

export const applicationConcepts = [
  ...nlp([
    {
      id: "natural-language-processing",
      title: "Natural Language Processing",
      summary:
        "Getting machines to work with human language, from parsing it to producing it.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      parents: ["deep-learning"],
      aliases: ["NLP"],
    },
    {
      id: "tokenisation",
      title: "Tokenisation",
      summary:
        "Cutting text into the units a model actually sees, which is rarely whole words.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 5, 5, 4],
      aliases: ["Tokenization", "Subword tokenisation"],
      keywords: ["bpe", "wordpiece", "token"],
    },
    {
      id: "text-representation",
      title: "Classical Text Representation",
      summary:
        "Counting words into vectors with bag-of-words and TF-IDF, before embeddings took over.",
      difficulty: "beginner",
      minutes: 25,
      importance: [4, 3, 4, 4, 2],
      aliases: ["Bag of words", "TF-IDF"],
    },
    {
      id: "language-modelling",
      title: "Language Modelling",
      summary:
        "Assigning probabilities to sequences of text, the objective behind every LLM.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 4, 4, 5, 5],
      prerequisites: ["tokenisation", "probability"],
    },
    {
      id: "text-classification",
      title: "Text Classification",
      summary:
        "Sorting documents into categories — sentiment, topic, intent, spam.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 4, 5, 3],
      prerequisites: ["classification"],
    },
    {
      id: "named-entity-recognition",
      title: "Named Entity Recognition",
      summary:
        "Finding and labelling the people, places and organisations mentioned in text.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 4, 5, 3],
      aliases: ["NER"],
    },
    {
      id: "machine-translation",
      title: "Machine Translation",
      summary:
        "Mapping text between languages, the task that drove encoder-decoder and attention research.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 3, 3, 4, 5],
      prerequisites: ["encoder-decoder"],
    },
    {
      id: "summarisation",
      title: "Summarisation",
      summary:
        "Producing a shorter text that keeps what mattered, either by extracting or by rewriting.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 3, 5, 4],
      aliases: ["Summarization"],
    },
    {
      id: "question-answering",
      title: "Question Answering",
      summary:
        "Returning an answer rather than a list of documents, with or without a supplied source.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 4, 5, 4],
      related: ["retrieval-augmented-generation"],
    },
  ]),

  ...vision([
    {
      id: "computer-vision",
      title: "Computer Vision",
      summary:
        "Extracting meaning from images and video, the field deep learning transformed first.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      parents: ["deep-learning"],
      aliases: ["CV"],
    },
    {
      id: "image-representation",
      title: "Image Representation",
      summary:
        "How a picture becomes a grid of numbers with colour channels a model can process.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 4, 4, 2],
      prerequisites: ["tensors"],
      keywords: ["pixel", "rgb", "channel"],
    },
    {
      id: "image-classification",
      title: "Image Classification",
      summary:
        "Assigning a whole image to a category, the benchmark task that launched modern deep learning.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      prerequisites: ["convolutional-neural-network", "image-representation"],
    },
    {
      id: "object-detection",
      title: "Object Detection",
      summary:
        "Finding what is in an image and where, by predicting boxes as well as labels.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 3, 4, 5, 4],
      prerequisites: ["image-classification"],
      keywords: ["bounding box", "yolo", "iou"],
    },
    {
      id: "image-segmentation",
      title: "Image Segmentation",
      summary:
        "Labelling every pixel, for when a bounding box is too crude an answer.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 3, 4, 5, 4],
      prerequisites: ["image-classification"],
      keywords: ["semantic segmentation", "instance segmentation"],
    },
    {
      id: "vision-transformers",
      title: "Vision Transformers",
      summary:
        "Treating an image as a sequence of patches so transformers can be applied to it.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 4, 5],
      prerequisites: ["transformer", "image-representation"],
      aliases: ["ViT"],
    },
  ]),

  ...sequences([
    {
      id: "transfer-learning",
      title: "Transfer Learning",
      summary:
        "Reusing a model trained on one task as the starting point for another, which is now the norm.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 5, 5, 5],
      prerequisites: ["representation-learning"],
      related: ["fine-tuning", "domain-adaptation"],
    },
    {
      id: "time-series-ml",
      title: "Time-Series Machine Learning",
      summary:
        "Learning from measurements ordered in time, where the future must never leak into the past.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 4, 4, 5, 4],
      aliases: ["Forecasting"],
      related: ["data-leakage"],
      keywords: ["seasonality", "trend", "autocorrelation"],
    },
    {
      id: "speech-and-audio-ml",
      title: "Speech and Audio ML",
      summary:
        "Recognising and generating sound, from transcription to synthesis.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 3, 4, 5, 4],
      keywords: ["asr", "spectrogram", "tts"],
    },
    {
      id: "recommendation-systems",
      title: "Recommendation Systems",
      summary:
        "Predicting what someone will want next, and the most commercially deployed ML there is.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 4, 5, 4],
      keywords: ["collaborative filtering", "matrix factorisation", "ranking"],
      related: ["embeddings"],
    },
    {
      id: "graph-machine-learning",
      title: "Graph Machine Learning",
      summary:
        "Learning over data whose structure is a network of relationships rather than a table.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 4, 5],
    },
    {
      id: "graph-neural-networks",
      title: "Graph Neural Networks",
      summary:
        "Networks that pass messages along edges so each node learns from its neighbourhood.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 5, 3, 4, 5],
      parents: ["graph-machine-learning"],
      prerequisites: ["graph-machine-learning", "neural-network"],
      aliases: ["GNN"],
    },
  ]),

  ...rl([
    {
      id: "markov-decision-process",
      title: "Markov Decision Processes",
      summary:
        "The formal frame of states, actions, transitions and rewards that RL is defined on.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 2, 3, 5],
      prerequisites: ["reinforcement-learning", "probability"],
      aliases: ["MDP"],
    },
    {
      id: "reward-and-return",
      title: "Reward and Return",
      summary:
        "The signal an agent maximises, and why discounting future reward changes its behaviour.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 4, 2, 3, 5],
      prerequisites: ["reinforcement-learning"],
    },
    {
      id: "exploration-exploitation",
      title: "Exploration and Exploitation",
      summary:
        "Whether to take the known-good action or try something that might be better.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 3, 4, 5],
      prerequisites: ["reinforcement-learning"],
    },
    {
      id: "q-learning",
      title: "Q-Learning",
      summary:
        "Learning the value of each action in each state, without needing a model of the world.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 3, 3, 5],
      prerequisites: ["markov-decision-process"],
    },
    {
      id: "policy-methods",
      title: "Policy Methods",
      summary:
        "Optimising the action-choosing rule directly instead of going through value estimates.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 3, 3, 5],
      prerequisites: ["markov-decision-process"],
      aliases: ["Policy gradient", "PPO"],
    },
    {
      id: "deep-reinforcement-learning",
      title: "Deep Reinforcement Learning",
      summary:
        "Using neural networks as the value or policy function, which is what scaled RL to hard problems.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 4, 3, 5],
      prerequisites: ["q-learning", "neural-network"],
      related: ["rlhf"],
    },
  ]),
];
