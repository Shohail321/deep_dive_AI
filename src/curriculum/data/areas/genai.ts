import { defineArea } from "../authoring";

const foundations = defineArea({
  domain: "genai",
  category: "Foundation models",
  parents: ["foundation-models"],
});
const training = defineArea({
  domain: "genai",
  category: "Training and adaptation",
  parents: ["foundation-models"],
});
const usage = defineArea({
  domain: "genai",
  category: "Working with LLMs",
  parents: ["large-language-models"],
});
const retrieval = defineArea({
  domain: "genai",
  category: "Retrieval",
  parents: ["retrieval-augmented-generation"],
});
const agents = defineArea({
  domain: "genai",
  category: "Agents and tools",
  parents: ["ai-agents"],
});
const multimodal = defineArea({
  domain: "genai",
  category: "Multimodal",
  parents: ["multimodal-ai"],
});

export const genaiConcepts = [
  ...foundations([
    {
      id: "foundation-models",
      title: "Foundation Models",
      summary:
        "Large models pretrained on broad data, then adapted to many tasks rather than built per task.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      parents: ["deep-learning"],
      prerequisites: ["deep-learning"],
    },
    {
      id: "large-language-models",
      title: "Large Language Models",
      summary:
        "Transformers trained on vast text corpora to predict what comes next, and to follow instructions.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 4, 5, 5, 5],
      prerequisites: ["transformer", "language-modelling"],
      aliases: ["LLM"],
    },
    {
      id: "scaling-laws",
      title: "Scaling Laws",
      summary:
        "The predictable way loss falls as data, parameters and compute grow together.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 5, 2, 4, 5],
      prerequisites: ["foundation-models"],
    },
    {
      id: "emergent-abilities",
      title: "Emergent Abilities",
      summary:
        "Capabilities that appear only past a certain scale, and the debate over whether they are real jumps.",
      difficulty: "advanced",
      minutes: 20,
      importance: [4, 3, 1, 3, 5],
      prerequisites: ["scaling-laws"],
    },
  ]),

  ...training([
    {
      id: "pretraining",
      title: "Pretraining",
      summary:
        "The long, expensive first phase where a model learns language from raw text alone.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 4, 3, 4, 5],
      prerequisites: ["self-supervised-learning"],
    },
    {
      id: "next-token-prediction",
      title: "Next-Token Prediction",
      summary:
        "The deceptively simple objective — guess the following token — that produces most LLM behaviour.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 4, 5, 5],
      prerequisites: ["tokenisation", "language-modelling"],
      related: ["autoregressive-models"],
    },
    {
      id: "fine-tuning",
      title: "Fine-Tuning",
      summary:
        "Continuing training on a narrower dataset to specialise a pretrained model.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 5, 5, 5],
      prerequisites: ["pretraining", "transfer-learning"],
    },
    {
      id: "instruction-tuning",
      title: "Instruction Tuning",
      summary:
        "Training on instruction-response pairs so a model answers requests instead of continuing text.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      prerequisites: ["fine-tuning"],
    },
    {
      id: "alignment",
      title: "Alignment",
      summary:
        "Getting a model to pursue what people actually want, including when that is hard to specify.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 3, 3, 5, 5],
      prerequisites: ["instruction-tuning"],
      related: ["responsible-ai"],
    },
    {
      id: "rlhf",
      title: "RLHF",
      summary:
        "Using human preference comparisons as a reward signal to shape model behaviour.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 4, 5],
      prerequisites: ["alignment", "reinforcement-learning"],
      aliases: ["Reinforcement learning from human feedback"],
    },
    {
      id: "preference-optimisation",
      title: "Preference Optimisation",
      summary:
        "Learning directly from preferred-versus-rejected pairs, without a separate reward model.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 5, 3, 4, 5],
      prerequisites: ["rlhf"],
      aliases: ["DPO"],
    },
    {
      id: "parameter-efficient-fine-tuning",
      title: "Parameter-Efficient Fine-Tuning",
      summary:
        "Adapting a large model by training a small number of extra parameters rather than all of them.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 5, 5, 5],
      prerequisites: ["fine-tuning"],
      aliases: ["PEFT"],
    },
    {
      id: "lora",
      title: "LoRA",
      summary:
        "Learning small low-rank updates alongside frozen weights, the most used PEFT method.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 5, 5, 5, 5],
      parents: ["parameter-efficient-fine-tuning"],
      prerequisites: [
        "parameter-efficient-fine-tuning",
        "matrix-decomposition",
      ],
    },
  ]),

  ...usage([
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      summary:
        "Writing the input so the model does what you meant, which is now a genuine working skill.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 1, 4, 5, 3],
    },
    {
      id: "chain-of-thought",
      title: "Chain-of-Thought Prompting",
      summary:
        "Asking a model to reason step by step, which measurably improves multi-step answers.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 2, 4, 5, 5],
      prerequisites: ["prompt-engineering"],
    },
    {
      id: "context-windows",
      title: "Context Windows",
      summary:
        "How much text a model can consider at once, and the constraint most system designs bend around.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 2, 5, 5, 4],
      prerequisites: ["tokenisation"],
    },
    {
      id: "decoding-strategies",
      title: "Decoding and Sampling",
      summary:
        "How the next token is actually chosen, and what temperature really controls.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 5, 5, 4],
      prerequisites: ["next-token-prediction"],
      keywords: ["temperature", "top-k", "top-p", "greedy decoding"],
    },
    {
      id: "hallucination",
      title: "Hallucination",
      summary:
        "Fluent output that is simply untrue, and a direct consequence of how these models are trained.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 4, 5, 5],
      prerequisites: ["next-token-prediction"],
      related: ["retrieval-augmented-generation", "uncertainty-quantification"],
    },
    {
      id: "structured-outputs",
      title: "Structured Outputs",
      summary:
        "Constraining generation to a schema so the result can be parsed instead of hoped over.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 2, 5, 5, 3],
      prerequisites: ["decoding-strategies"],
      keywords: ["json mode", "grammar", "schema"],
    },
    {
      id: "llm-evaluation",
      title: "Evaluating LLMs",
      summary:
        "Judging open-ended output, where accuracy no longer applies and benchmarks leak.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 3, 4, 5, 5],
      prerequisites: ["model-evaluation"],
      keywords: ["benchmark", "llm as judge", "human evaluation"],
    },
  ]),

  ...retrieval([
    {
      id: "retrieval-augmented-generation",
      title: "Retrieval-Augmented Generation",
      summary:
        "Fetching relevant documents and putting them in the prompt, so answers rest on real sources.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 5, 5, 5],
      parents: ["large-language-models"],
      prerequisites: ["embeddings", "context-windows"],
      aliases: ["RAG"],
    },
    {
      id: "retrieval-embeddings",
      title: "Embeddings for Retrieval",
      summary:
        "Turning documents and queries into vectors so relevance becomes a distance calculation.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 5, 5, 4],
      prerequisites: ["embeddings"],
    },
    {
      id: "vector-search",
      title: "Vector Search",
      summary:
        "Finding nearest neighbours among millions of vectors quickly enough to serve a request.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 3, 5, 5, 4],
      prerequisites: ["retrieval-embeddings"],
      keywords: ["ann", "hnsw", "vector database"],
    },
    {
      id: "chunking",
      title: "Chunking",
      summary:
        "Splitting documents into retrievable pieces, where the split decides what can be found.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 1, 5, 5, 3],
      prerequisites: ["retrieval-augmented-generation"],
    },
    {
      id: "reranking",
      title: "Reranking",
      summary:
        "Rescoring retrieved candidates with a stronger model before they reach the prompt.",
      difficulty: "advanced",
      minutes: 20,
      importance: [3, 3, 4, 5, 4],
      prerequisites: ["vector-search"],
    },
  ]),

  ...agents([
    {
      id: "ai-agents",
      title: "AI Agents",
      summary:
        "Models given tools and a goal, deciding their own next step rather than answering once.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 2, 5, 5, 5],
      parents: ["large-language-models"],
      prerequisites: ["large-language-models"],
      related: ["intelligent-agents"],
    },
    {
      id: "tool-use",
      title: "Tool Use",
      summary:
        "Letting a model call out to search, code or APIs for what it cannot do itself.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 2, 5, 5, 4],
      prerequisites: ["large-language-models"],
    },
    {
      id: "function-calling",
      title: "Function Calling",
      summary:
        "The mechanism by which a model emits a structured call your code then executes.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 5, 5, 3],
      prerequisites: ["tool-use", "structured-outputs"],
    },
    {
      id: "agent-workflows",
      title: "Agent Workflows",
      summary:
        "Composing models, tools and checks into a pipeline, and knowing when a fixed chain beats an agent.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 1, 5, 5, 4],
      prerequisites: ["ai-agents"],
      aliases: ["Orchestration"],
    },
    {
      id: "agent-memory",
      title: "Agent Memory",
      summary:
        "Carrying information across turns and sessions when the context window cannot hold it all.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 2, 5, 5, 4],
      prerequisites: ["context-windows"],
    },
  ]),

  ...multimodal([
    {
      id: "multimodal-ai",
      title: "Multimodal AI",
      summary:
        "Models that take in and relate more than one kind of data — text, images, audio together.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      parents: ["foundation-models"],
      prerequisites: ["foundation-models"],
    },
    {
      id: "vision-language-models",
      title: "Vision-Language Models",
      summary:
        "Models that align images and text in one representation space, so either can describe the other.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 4, 5, 5],
      prerequisites: ["multimodal-ai", "contrastive-learning"],
      aliases: ["VLM", "CLIP"],
    },
  ]),
];
