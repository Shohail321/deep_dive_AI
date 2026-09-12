import { defineArea } from "../authoring";

const root = defineArea({ domain: "ml", category: "Model evaluation" });
const classification = defineArea({
  domain: "ml",
  category: "Model evaluation",
  subcategory: "Classification metrics",
  parents: ["classification-metrics"],
});
const regression = defineArea({
  domain: "ml",
  category: "Model evaluation",
  subcategory: "Regression metrics",
  parents: ["regression-metrics"],
});
const protocol = defineArea({
  domain: "ml",
  category: "Model evaluation",
  subcategory: "Evaluation protocol",
  parents: ["model-evaluation"],
});

export const evaluationConcepts = [
  ...root([
    {
      id: "model-evaluation",
      title: "Model Evaluation",
      summary:
        "Measuring whether a model actually works, on data it has never been allowed to see.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 4, 5, 5],
      parents: ["machine-learning"],
      prerequisites: ["train-validation-test-split"],
    },
    {
      id: "classification-metrics",
      title: "Classification Metrics",
      summary:
        "The family of scores for categorical predictions, each answering a different question.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 4, 5, 4],
      parents: ["model-evaluation"],
      prerequisites: ["classification"],
    },
    {
      id: "regression-metrics",
      title: "Regression Metrics",
      summary:
        "Ways of summarising how far continuous predictions fall from the truth.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 4, 5, 3],
      parents: ["model-evaluation"],
      prerequisites: ["regression"],
    },
  ]),

  ...classification([
    {
      id: "confusion-matrix",
      title: "Confusion Matrix",
      summary:
        "The table of what was predicted against what was true, from which most other metrics follow.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 2, 4, 5, 3],
      content: { hasVisualization: true },
      visualization: { visualizationType: "diagram", interactionType: "hover" },
    },
    {
      id: "accuracy",
      title: "Accuracy",
      summary:
        "The share of predictions that were right, and badly misleading when classes are imbalanced.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 2, 3, 5, 3],
      prerequisites: ["confusion-matrix"],
      related: ["class-imbalance"],
    },
    {
      id: "precision",
      title: "Precision",
      summary:
        "Of everything flagged positive, how much really was — the cost of a false alarm.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 3, 3, 5, 3],
      prerequisites: ["confusion-matrix"],
    },
    {
      id: "recall",
      title: "Recall",
      summary:
        "Of everything that really was positive, how much was caught — the cost of a miss.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 3, 3, 5, 3],
      prerequisites: ["confusion-matrix"],
      aliases: ["Sensitivity", "True positive rate"],
    },
    {
      id: "specificity",
      title: "Specificity",
      summary: "How well the model leaves the genuine negatives alone.",
      difficulty: "intermediate",
      minutes: 15,
      importance: [4, 3, 3, 4, 3],
      prerequisites: ["confusion-matrix"],
      aliases: ["True negative rate"],
    },
    {
      id: "f1-score",
      title: "F1 Score",
      summary:
        "One number balancing precision against recall, for when both failures matter.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 3, 3, 5, 3],
      prerequisites: ["precision", "recall"],
    },
    {
      id: "roc-curve",
      title: "ROC Curve",
      summary:
        "How the true and false positive rates trade off as the decision threshold moves.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 4, 3, 5, 4],
      prerequisites: ["recall", "specificity"],
      content: { hasVisualization: true },
      visualization: {
        visualizationType: "plot",
        interactionType: "parameter",
      },
    },
    {
      id: "roc-auc",
      title: "ROC AUC",
      summary:
        "The area under the ROC curve: the chance a random positive outranks a random negative.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 4, 3, 5, 4],
      prerequisites: ["roc-curve"],
    },
    {
      id: "precision-recall-curve",
      title: "Precision-Recall Curve",
      summary:
        "The threshold trade-off that stays informative when positives are rare.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 4, 3, 5, 4],
      prerequisites: ["precision", "recall"],
      related: ["class-imbalance"],
    },
    {
      id: "pr-auc",
      title: "PR AUC",
      summary:
        "The area under the precision-recall curve, usually the fairer summary for imbalanced problems.",
      difficulty: "intermediate",
      minutes: 15,
      importance: [4, 4, 3, 5, 4],
      prerequisites: ["precision-recall-curve"],
      aliases: ["Average precision"],
    },
    {
      id: "threshold-selection",
      title: "Threshold Selection",
      summary:
        "Choosing the cut-off that turns a probability into a decision, guided by which error costs more.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 4, 5, 3],
      prerequisites: ["precision-recall-curve"],
    },
    {
      id: "calibration",
      title: "Calibration",
      summary:
        "Whether a model's stated 70% actually happens about 70% of the time.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 5, 4],
      prerequisites: ["probability"],
      related: ["uncertainty-quantification"],
    },
  ]),

  ...regression([
    {
      id: "mean-absolute-error",
      title: "Mean Absolute Error",
      summary:
        "The average size of the error, in the units of the thing being predicted.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 3, 3, 5, 2],
      aliases: ["MAE"],
    },
    {
      id: "mean-squared-error",
      title: "Mean Squared Error",
      summary:
        "The average squared error, which punishes large mistakes far more than small ones.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 4, 3, 5, 3],
      aliases: ["MSE"],
      related: ["loss-functions"],
    },
    {
      id: "root-mean-squared-error",
      title: "Root Mean Squared Error",
      summary:
        "The square root of MSE, bringing the penalty back into the original units.",
      difficulty: "beginner",
      minutes: 15,
      importance: [5, 3, 3, 5, 2],
      aliases: ["RMSE"],
      prerequisites: ["mean-squared-error"],
    },
    {
      id: "r-squared",
      title: "R²",
      summary:
        "How much of the variation the model explains compared with simply predicting the mean.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 4, 3, 4, 3],
      aliases: ["Coefficient of determination", "R2"],
      prerequisites: ["variance"],
    },
  ]),

  ...protocol([
    {
      id: "cross-validation",
      title: "Cross-Validation",
      summary:
        "Rotating which slice is held out, so the estimate does not hinge on one lucky split.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 4, 5, 5],
      prerequisites: ["train-validation-test-split"],
      aliases: ["k-fold"],
    },
    {
      id: "stratification",
      title: "Stratification",
      summary:
        "Splitting so each fold keeps the same class proportions as the whole dataset.",
      difficulty: "intermediate",
      minutes: 15,
      importance: [4, 3, 4, 5, 3],
      prerequisites: ["cross-validation"],
    },
    {
      id: "class-imbalance",
      title: "Class Imbalance",
      summary:
        "When one class is rare, accuracy stops being informative and sampling choices start to matter.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 4, 5, 4],
      keywords: ["smote", "resampling", "class weights"],
    },
    {
      id: "evaluation-pitfalls",
      title: "Evaluation Pitfalls",
      summary:
        "The ways a score flatters a model: leakage, tuning on test, and comparing across different splits.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 3, 5, 5],
      prerequisites: ["data-leakage"],
    },
  ]),
];
