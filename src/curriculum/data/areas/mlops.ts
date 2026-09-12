import { defineArea } from "../authoring";

const practice = defineArea({
  domain: "mlops",
  category: "Engineering practice",
  parents: ["mlops"],
});
const pipelines = defineArea({
  domain: "mlops",
  category: "Data and pipelines",
  parents: ["mlops"],
});
const serving = defineArea({
  domain: "mlops",
  category: "Deployment and serving",
  parents: ["model-deployment"],
});
const monitoring = defineArea({
  domain: "mlops",
  category: "Monitoring",
  parents: ["model-monitoring"],
});

export const mlopsConcepts = [
  ...practice([
    {
      id: "mlops",
      title: "MLOps",
      summary:
        "The practices that keep models working after the notebook is closed.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 1, 5, 5, 3],
      parents: ["machine-learning"],
    },
    {
      id: "experiment-tracking",
      title: "Experiment Tracking",
      summary:
        "Recording what was run, with which data and settings, so a result can be found again.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 1, 5, 5, 5],
    },
    {
      id: "reproducibility",
      title: "Reproducibility",
      summary:
        "Being able to obtain the same result twice, which random seeds alone do not guarantee.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 2, 5, 5, 5],
      prerequisites: ["experiment-tracking"],
      aliases: ["Replicability"],
    },
    {
      id: "versioning",
      title: "Versioning",
      summary:
        "Tracking code, data and models together, because a model is only meaningful alongside both.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 1, 5, 5, 4],
      related: ["reproducibility"],
      keywords: ["data versioning", "dvc", "git"],
    },
    {
      id: "model-registry",
      title: "Model Registries",
      summary:
        "A catalogue of trained models, their versions and which one is currently live.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [3, 1, 5, 5, 2],
      prerequisites: ["versioning"],
    },
  ]),

  ...pipelines([
    {
      id: "data-pipelines",
      title: "Data Pipelines",
      summary:
        "The repeatable path from raw source to model-ready features, run on a schedule rather than by hand.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 1, 5, 5, 3],
      prerequisites: ["preprocessing"],
      aliases: ["ETL", "ELT"],
    },
    {
      id: "feature-stores",
      title: "Feature Stores",
      summary:
        "A shared home for computed features, so training and serving see the same definitions.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 1, 5, 5, 2],
      prerequisites: ["data-pipelines"],
      related: ["training-serving-skew"],
    },
    {
      id: "training-serving-skew",
      title: "Training-Serving Skew",
      summary:
        "When features are computed differently in production than in training, and accuracy quietly drops.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 2, 5, 5, 3],
      prerequisites: ["data-pipelines"],
      related: ["data-leakage"],
    },
  ]),

  ...serving([
    {
      id: "model-deployment",
      title: "Model Deployment",
      summary:
        "Getting a model to where requests actually arrive, with a way to roll it back.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 1, 5, 5, 3],
      parents: ["mlops"],
    },
    {
      id: "model-serving",
      title: "Model Serving",
      summary:
        "The runtime that loads a model and answers requests within a latency budget.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 1, 5, 5, 3],
      prerequisites: ["model-deployment"],
    },
    {
      id: "batch-inference",
      title: "Batch Inference",
      summary:
        "Scoring a large set of examples on a schedule, when answers are not needed instantly.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 1, 5, 5, 2],
      prerequisites: ["training-and-inference"],
    },
    {
      id: "online-inference",
      title: "Online Inference",
      summary:
        "Answering one request at a time under a latency limit, which constrains model size.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 1, 5, 5, 2],
      prerequisites: ["training-and-inference"],
      related: ["quantisation"],
    },
  ]),

  ...monitoring([
    {
      id: "model-monitoring",
      title: "Model Monitoring",
      summary:
        "Watching a live model's inputs and outputs, since silent degradation is the normal failure mode.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 2, 5, 5, 4],
      parents: ["mlops"],
      prerequisites: ["model-deployment"],
    },
    {
      id: "data-drift",
      title: "Data Drift",
      summary:
        "The incoming data moving away from what the model was trained on.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      aliases: ["Covariate shift"],
    },
    {
      id: "concept-drift",
      title: "Concept Drift",
      summary:
        "The relationship between inputs and the right answer changing, even if the inputs look the same.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      prerequisites: ["data-drift"],
    },
    {
      id: "model-drift",
      title: "Model Drift",
      summary:
        "Live performance decaying over time, whatever the underlying cause turns out to be.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 2, 4, 5, 3],
      prerequisites: ["model-monitoring"],
    },
    {
      id: "observability",
      title: "Observability",
      summary:
        "Enough logging and tracing to answer why a specific prediction came out as it did.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 1, 5, 5, 3],
      prerequisites: ["model-monitoring"],
    },
    {
      id: "retraining",
      title: "Retraining",
      summary: "Deciding when to refit a model, and on which window of data.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 4, 5, 3],
      prerequisites: ["model-drift"],
    },
  ]),
];
