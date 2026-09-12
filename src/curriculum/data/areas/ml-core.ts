import { defineArea } from "../authoring";

const root = defineArea({ domain: "ml", category: "Foundations" });
const paradigms = defineArea({
  domain: "ml",
  category: "Learning paradigms",
  parents: ["machine-learning"],
});
const workflow = defineArea({
  domain: "ml",
  category: "The ML workflow",
  parents: ["machine-learning"],
});

export const mlCoreConcepts = [
  ...root([
    {
      id: "machine-learning",
      title: "Machine Learning",
      shortTitle: "ML",
      summary:
        "Building systems that improve at a task by finding patterns in data, rather than by being given explicit rules for it.",
      difficulty: "intro",
      minutes: 15,
      importance: [5, 3, 4, 5, 4],
      parents: ["artificial-intelligence"],
      aliases: ["ML"],
      keywords: ["machine learning", "statistical learning"],
      content: {
        hasLesson: true,
        hasVisualization: true,
        hasRealWorldExample: true,
      },
      visualization: { visualizationType: "diagram", interactionType: "hover" },
      status: "drafting",
    },
    {
      id: "models-and-parameters",
      title: "Models and Parameters",
      summary:
        "The distinction between the shape of a function and the numbers inside it that training adjusts.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 4, 4, 4, 3],
      parents: ["machine-learning"],
      prerequisites: ["functions"],
    },
    {
      id: "hyperparameters",
      title: "Hyperparameters",
      summary:
        "Settings chosen before training that shape how learning proceeds, rather than values learned from data.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 2, 4, 5, 3],
      parents: ["machine-learning"],
      prerequisites: ["models-and-parameters"],
      related: ["hyperparameter-tuning"],
    },
    {
      id: "hyperparameter-tuning",
      title: "Hyperparameter Tuning",
      summary:
        "Searching the settings that were not learned, without quietly fitting them to the test set.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 3, 4, 5, 4],
      parents: ["machine-learning"],
      prerequisites: ["hyperparameters", "cross-validation"],
      keywords: ["grid search", "random search", "bayesian optimisation"],
    },
    {
      id: "training-and-inference",
      title: "Training and Inference",
      summary:
        "The two lives of a model: the expensive fitting phase and the cheap prediction phase.",
      difficulty: "intro",
      minutes: 15,
      importance: [5, 2, 4, 5, 3],
      parents: ["machine-learning"],
    },
    {
      id: "inductive-bias",
      title: "Inductive Bias",
      summary:
        "The assumptions a model makes to generalise beyond its data — no learner works without some.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 2, 3, 5],
      parents: ["machine-learning"],
      related: ["no-free-lunch"],
    },
    {
      id: "no-free-lunch",
      title: "No Free Lunch Theorem",
      summary:
        "No single algorithm is best across all problems, which is why model choice remains a judgement.",
      difficulty: "advanced",
      minutes: 20,
      importance: [4, 4, 1, 3, 5],
      parents: ["machine-learning"],
      prerequisites: ["inductive-bias"],
    },
  ]),

  ...paradigms([
    {
      id: "supervised-learning",
      title: "Supervised Learning",
      summary:
        "Learning a mapping from inputs to known answers, the most common and best-understood setting.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      prerequisites: ["labels"],
    },
    {
      id: "unsupervised-learning",
      title: "Unsupervised Learning",
      summary: "Finding structure in data that carries no labels at all.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 4, 4, 4],
    },
    {
      id: "semi-supervised-learning",
      title: "Semi-Supervised Learning",
      summary:
        "Using a small labelled set alongside a large unlabelled one, because labels are what cost money.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 4, 3, 4, 5],
      prerequisites: ["supervised-learning", "unsupervised-learning"],
    },
    {
      id: "self-supervised-learning",
      title: "Self-Supervised Learning",
      summary:
        "Creating the labels from the data itself, which is how foundation models are pretrained.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 4, 5],
      prerequisites: ["unsupervised-learning"],
      related: ["pretraining", "contrastive-learning"],
    },
    {
      id: "reinforcement-learning",
      title: "Reinforcement Learning",
      summary:
        "Learning which actions pay off by acting and observing the reward that follows.",
      difficulty: "advanced",
      minutes: 35,
      importance: [5, 4, 4, 3, 5],
      aliases: ["RL"],
    },
  ]),

  ...workflow([
    {
      id: "ml-workflow",
      title: "The Machine Learning Workflow",
      summary:
        "The path from a question, through data and a model, to an evaluated and deployed prediction.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 4, 5, 3],
      content: { hasVisualization: true },
      visualization: { visualizationType: "diagram", interactionType: "step" },
    },
    {
      id: "problem-framing",
      title: "Problem Framing",
      summary:
        "Turning a vague goal into a prediction task with a defined target, and deciding whether ML fits at all.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 1, 2, 5, 3],
      prerequisites: ["ml-workflow"],
    },
    {
      id: "baselines",
      title: "Baselines",
      summary:
        "The simplest reasonable approach, which any model must beat before it is worth its complexity.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 2, 3, 5, 5],
      prerequisites: ["ml-workflow"],
    },
  ]),
];
