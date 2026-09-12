import { defineArea } from "../authoring";

const root = defineArea({
  domain: "responsible",
  category: "Responsible AI",
  parents: ["responsible-ai"],
});
const explain = defineArea({
  domain: "responsible",
  category: "Explainability",
  parents: ["interpretability"],
});
const safety = defineArea({
  domain: "responsible",
  category: "Safety and security",
  parents: ["responsible-ai"],
});

export const responsibleConcepts = [
  ...root([
    {
      id: "responsible-ai",
      title: "Responsible AI",
      summary:
        "Building systems whose effects on people are examined before they are deployed, not after.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 1, 2, 5, 5],
      parents: ["artificial-intelligence"],
    },
    {
      id: "fairness",
      title: "Fairness",
      summary:
        "Whether a model treats groups equitably, and the fact that the common definitions conflict.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 4, 3, 5, 5],
      keywords: ["demographic parity", "equalised odds"],
    },
    {
      id: "algorithmic-bias",
      title: "Algorithmic Bias",
      summary:
        "Systematic disadvantage learned from data or design — distinct from statistical bias.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 2, 3, 5, 5],
      prerequisites: ["sampling-bias"],
      aliases: ["Bias (societal)"],
      related: ["model-bias", "fairness"],
    },
    {
      id: "privacy",
      title: "Privacy",
      summary:
        "Protecting the people in the training data from being exposed by the model built on it.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 3, 5, 5],
      keywords: ["pii", "anonymisation", "memorisation"],
    },
    {
      id: "differential-privacy",
      title: "Differential Privacy",
      summary:
        "A formal guarantee that one person's data cannot be detected in the output.",
      difficulty: "advanced",
      minutes: 30,
      importance: [2, 5, 3, 4, 5],
      parents: ["privacy"],
      prerequisites: ["privacy", "probability"],
    },
    {
      id: "responsible-deployment",
      title: "Responsible Deployment",
      summary:
        "Deciding whether to ship at all, and what safeguards must exist before you do.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 1, 3, 5, 4],
      related: ["model-monitoring"],
    },
    {
      id: "ai-governance",
      title: "AI Governance and Regulation",
      summary:
        "The rules and accountability structures now shaping what may legally be deployed.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 1, 1, 5, 4],
    },
  ]),

  ...explain([
    {
      id: "interpretability",
      title: "Interpretability",
      summary:
        "Whether a model's workings can be understood directly, rather than only probed after the fact.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 3, 5, 5],
      parents: ["responsible-ai"],
    },
    {
      id: "explainability",
      title: "Explainability",
      summary:
        "Producing an account of why a particular prediction came out the way it did.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      aliases: ["XAI"],
    },
    {
      id: "feature-importance",
      title: "Feature Importance",
      summary:
        "Ranking which inputs moved a model's output most, with all the caveats correlation brings.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      related: ["feature-selection"],
    },
    {
      id: "shap",
      title: "SHAP Values",
      summary:
        "Attributing a prediction across features using a fair-division idea borrowed from game theory.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 5, 4, 5, 4],
      prerequisites: ["feature-importance"],
      aliases: ["Shapley values", "LIME"],
    },
  ]),

  ...safety([
    {
      id: "adversarial-ml",
      title: "Adversarial Machine Learning",
      summary:
        "Inputs crafted to fool a model, often imperceptibly different from ones it handles correctly.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 5, 5],
      keywords: ["adversarial example", "perturbation"],
    },
    {
      id: "ai-security",
      title: "AI Security",
      summary:
        "Attacks on the system around the model: poisoned data, stolen weights, injected prompts.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 2, 4, 5, 5],
      prerequisites: ["adversarial-ml"],
      keywords: ["prompt injection", "data poisoning", "model extraction"],
    },
    {
      id: "robustness",
      title: "Robustness",
      summary:
        "Holding up when inputs shift away from the neat conditions of the training set.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 4, 3, 5, 5],
      related: ["data-drift"],
    },
    {
      id: "uncertainty-quantification",
      title: "Uncertainty",
      summary:
        "Knowing how much to trust a prediction, and telling ignorance apart from genuine noise.",
      difficulty: "advanced",
      minutes: 30,
      importance: [5, 5, 3, 5, 5],
      prerequisites: ["probability"],
      related: ["calibration", "bayesian-ml"],
    },
    {
      id: "guardrails",
      title: "Guardrails",
      summary:
        "Checks around a generative system that constrain what reaches the user.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 1, 5, 5, 4],
      related: ["hallucination", "ai-security"],
    },
  ]),
];
