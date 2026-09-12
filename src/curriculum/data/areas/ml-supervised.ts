import { defineArea } from "../authoring";

const tasks = defineArea({
  domain: "ml",
  category: "Supervised learning",
  parents: ["supervised-learning"],
});
const regression = defineArea({
  domain: "ml",
  category: "Supervised learning",
  subcategory: "Regression",
  parents: ["regression"],
});
const classifiers = defineArea({
  domain: "ml",
  category: "Supervised learning",
  subcategory: "Classification",
  parents: ["classification"],
});
const trees = defineArea({
  domain: "ml",
  category: "Supervised learning",
  subcategory: "Trees and ensembles",
  parents: ["decision-trees"],
});
const ensembles = defineArea({
  domain: "ml",
  category: "Supervised learning",
  subcategory: "Trees and ensembles",
  parents: ["ensemble-methods"],
});

export const supervisedConcepts = [
  ...tasks([
    {
      id: "regression",
      title: "Regression",
      summary:
        "Predicting a continuous quantity, where being close counts for something.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 4, 4, 5, 3],
    },
    {
      id: "classification",
      title: "Classification",
      summary:
        "Predicting which of a fixed set of categories an example belongs to.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 4, 4, 5, 3],
    },
    {
      id: "multiclass-classification",
      title: "Multiclass and Multilabel Classification",
      summary:
        "Going beyond two classes, and the difference between picking one label and picking several.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 3, 4, 5, 3],
      parents: ["classification"],
      prerequisites: ["classification"],
    },
  ]),

  ...regression([
    {
      id: "linear-regression",
      title: "Linear Regression",
      summary:
        "Fitting a straight line through data to predict a continuous value, and the smallest complete example of what every supervised model does.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 4, 4, 4, 2],
      prerequisites: ["regression", "linear-algebra"],
      related: ["gradient-descent"],
      aliases: ["Least squares", "OLS"],
      keywords: ["line of best fit", "ols"],
      content: {
        hasLesson: true,
        hasVisualization: true,
        hasQuiz: true,
        hasPlayground: true,
        hasMath: true,
        hasCode: true,
        hasRealWorldExample: true,
      },
      visualization: { visualizationType: "plot", interactionType: "drag" },
      status: "drafting",
    },
    {
      id: "polynomial-regression",
      title: "Polynomial Regression",
      summary:
        "Fitting curves by adding powers of the inputs, and a first encounter with overfitting.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 3, 3, 2],
      prerequisites: ["linear-regression"],
      related: ["overfitting"],
    },
    {
      id: "regularised-regression",
      title: "Regularised Regression",
      summary:
        "Linear models with a penalty on large coefficients, trading a little fit for a lot of stability.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 3, 4, 3],
      prerequisites: ["linear-regression", "regularisation"],
      aliases: ["Ridge", "Lasso", "Elastic net"],
    },
  ]),

  ...classifiers([
    {
      id: "logistic-regression",
      title: "Logistic Regression",
      summary:
        "A linear model squashed into a probability, and the default baseline for classification.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 4, 4, 5, 3],
      prerequisites: ["classification", "linear-regression", "sigmoid"],
      related: ["cross-entropy-loss"],
    },
    {
      id: "k-nearest-neighbours",
      title: "k-Nearest Neighbours",
      summary:
        "Classifying an example by looking at the labels of the closest examples to it.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 4, 3, 2],
      prerequisites: ["classification"],
      aliases: ["kNN"],
      related: ["curse-of-dimensionality", "standardisation"],
    },
    {
      id: "naive-bayes",
      title: "Naive Bayes",
      summary:
        "Applying Bayes' theorem while pretending features are independent, which works better than it should.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 3, 3, 2],
      prerequisites: ["bayes-theorem", "classification"],
    },
    {
      id: "support-vector-machines",
      title: "Support Vector Machines",
      summary:
        "Finding the boundary that leaves the widest possible margin between classes.",
      difficulty: "advanced",
      minutes: 35,
      importance: [4, 5, 3, 3, 4],
      prerequisites: ["classification", "vectors"],
      aliases: ["SVM"],
    },
    {
      id: "kernels",
      title: "Kernel Methods",
      summary:
        "Measuring similarity in a higher-dimensional space without ever computing the coordinates.",
      difficulty: "advanced",
      minutes: 35,
      importance: [3, 5, 2, 2, 4],
      prerequisites: ["support-vector-machines"],
      aliases: ["Kernel trick"],
    },
  ]),

  ...trees([
    {
      id: "decision-trees",
      title: "Decision Trees",
      summary:
        "A sequence of yes-or-no splits, giving a model whose reasoning can be read off directly.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 3, 4, 5, 3],
      parents: ["supervised-learning"],
      prerequisites: ["classification"],
      content: { hasVisualization: true },
      visualization: { visualizationType: "diagram", interactionType: "step" },
      related: ["interpretability"],
    },
    {
      id: "splitting-criteria",
      title: "Splitting Criteria",
      summary:
        "How a tree decides which question to ask next, using impurity or information gain.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 3, 3, 3],
      prerequisites: ["decision-trees"],
      related: ["information-theory"],
      keywords: ["gini", "entropy", "information gain"],
    },
    {
      id: "tree-pruning",
      title: "Tree Pruning",
      summary: "Cutting a tree back so it stops memorising the training set.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 3, 3, 4, 2],
      prerequisites: ["decision-trees", "overfitting"],
    },
  ]),

  ...ensembles([
    {
      id: "ensemble-methods",
      title: "Ensemble Methods",
      summary:
        "Combining many weak models into one strong one, still the winning approach on tabular data.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 3],
      parents: ["supervised-learning"],
    },
    {
      id: "bagging",
      title: "Bagging",
      summary:
        "Training models on random resamples and averaging them, which cuts variance without adding bias.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 3, 4, 3],
      prerequisites: ["ensemble-methods", "model-variance"],
      aliases: ["Bootstrap aggregating"],
    },
    {
      id: "random-forests",
      title: "Random Forests",
      summary:
        "Bagged decision trees that also sample features, giving a strong default with little tuning.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 3],
      prerequisites: ["bagging", "decision-trees"],
    },
    {
      id: "boosting",
      title: "Boosting",
      summary:
        "Training models in sequence, each one concentrating on what the last got wrong.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 4, 4, 5, 4],
      prerequisites: ["ensemble-methods"],
    },
    {
      id: "adaboost",
      title: "AdaBoost",
      summary:
        "The original boosting algorithm, reweighting misclassified examples at each round.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 4, 3, 3, 3],
      prerequisites: ["boosting"],
    },
    {
      id: "gradient-boosting",
      title: "Gradient Boosting",
      summary:
        "Boosting where each new tree fits the gradient of the loss, not just the mistakes.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 4, 5, 4],
      prerequisites: ["boosting", "gradients"],
    },
    {
      id: "gradient-boosting-libraries",
      title: "XGBoost, LightGBM and CatBoost",
      summary:
        "The production gradient-boosting implementations, and what each optimises for.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 3, 5, 5, 3],
      prerequisites: ["gradient-boosting"],
      aliases: ["XGBoost", "LightGBM", "CatBoost"],
      keywords: ["histogram splitting", "categorical features"],
    },
  ]),
];
