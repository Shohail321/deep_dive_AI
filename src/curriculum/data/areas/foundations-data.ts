import { defineArea } from "../authoring";

const programming = defineArea({
  domain: "data",
  category: "Programming for ML",
});
const data = defineArea({
  domain: "data",
  category: "Working with data",
  parents: ["datasets"],
});
const preparation = defineArea({
  domain: "data",
  category: "Data preparation",
  parents: ["preprocessing"],
});
const splitting = defineArea({
  domain: "data",
  category: "Splitting data",
  parents: ["train-validation-test-split"],
});

export const dataFoundationConcepts = [
  ...programming([
    {
      id: "python-for-ml",
      title: "Python for Machine Learning",
      summary:
        "The subset of Python that actually appears in ML work, from list comprehensions to broadcasting.",
      difficulty: "intro",
      minutes: 40,
      importance: [3, 1, 5, 5, 3],
      keywords: ["python", "scripting"],
    },
    {
      id: "arrays",
      title: "Arrays",
      summary:
        "Contiguous blocks of numbers with a shape, the representation numerical code is built on.",
      difficulty: "intro",
      minutes: 20,
      importance: [4, 2, 5, 4, 2],
      parents: ["python-for-ml"],
      related: ["tensors"],
    },
    {
      id: "numpy",
      title: "NumPy",
      summary:
        "Python's array library, where vectorised operations replace loops and matrices become one call.",
      difficulty: "beginner",
      minutes: 35,
      importance: [3, 2, 5, 5, 3],
      parents: ["python-for-ml"],
      prerequisites: ["arrays", "matrices"],
      keywords: ["vectorisation", "broadcasting", "ndarray"],
    },
    {
      id: "pandas",
      title: "pandas",
      summary:
        "Table-shaped data in Python, and the tool most feature work is actually carried out in.",
      difficulty: "beginner",
      minutes: 35,
      importance: [3, 1, 5, 5, 2],
      parents: ["python-for-ml"],
      prerequisites: ["numpy"],
      keywords: ["dataframe", "series", "groupby"],
    },
    {
      id: "data-visualisation",
      title: "Data Visualisation",
      summary:
        "Plotting data to see what summary statistics hide, before any model is chosen.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 4, 5, 3],
      parents: ["python-for-ml"],
      aliases: ["Plotting", "Charts"],
      related: ["exploratory-data-analysis"],
    },
  ]),

  ...data([
    {
      id: "datasets",
      title: "Datasets",
      summary:
        "A collection of examples assembled for a task, and the single biggest determinant of what a model learns.",
      difficulty: "intro",
      minutes: 20,
      importance: [5, 2, 4, 5, 4],
      parents: [],
    },
    {
      id: "data-types",
      title: "Data Types",
      summary:
        "Numeric, categorical, ordinal, text, image and time data, each needing different handling.",
      difficulty: "intro",
      minutes: 20,
      importance: [5, 2, 4, 5, 2],
    },
    {
      id: "structured-unstructured-data",
      title: "Structured and Unstructured Data",
      summary:
        "Rows and columns versus text, audio and images, which decides whether classical ML or deep learning fits.",
      difficulty: "intro",
      minutes: 15,
      importance: [5, 1, 3, 5, 2],
      prerequisites: ["data-types"],
    },
    {
      id: "feature-matrices",
      title: "Feature Matrices",
      summary:
        "The rows-as-examples, columns-as-features layout nearly every classical algorithm expects.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 4, 5, 2],
      prerequisites: ["matrices"],
      aliases: ["Design matrix", "X matrix"],
    },
    {
      id: "labels",
      title: "Labels",
      summary:
        "The answer attached to each example, which is what makes supervised learning possible and expensive.",
      difficulty: "intro",
      minutes: 15,
      importance: [5, 2, 3, 5, 3],
      aliases: ["Targets", "Ground truth"],
    },
    {
      id: "exploratory-data-analysis",
      title: "Exploratory Data Analysis",
      summary:
        "Looking at the data before modelling it, to find the surprises that would otherwise surface later.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 2, 4, 5, 3],
      aliases: ["EDA"],
      prerequisites: ["data-visualisation"],
    },
    {
      id: "data-quality",
      title: "Data Quality",
      summary:
        "Whether the data is accurate, consistent and representative enough to support the claim being made.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 3, 5, 4],
      related: ["sampling-bias"],
    },
    {
      id: "sampling-bias",
      title: "Sampling Bias",
      summary:
        "When the data collected does not reflect the population the model will meet in production.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 3, 2, 5, 4],
      prerequisites: ["sampling"],
      related: ["algorithmic-bias"],
    },
  ]),

  ...preparation([
    {
      id: "preprocessing",
      title: "Preprocessing",
      summary:
        "Turning raw data into the numeric form an algorithm can accept, without distorting what it means.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 5, 5, 3],
      parents: ["datasets"],
    },
    {
      id: "missing-values",
      title: "Missing Values",
      summary:
        "Gaps in the data, and the choice between dropping rows, imputing them, or modelling the absence itself.",
      difficulty: "beginner",
      minutes: 25,
      importance: [4, 3, 4, 5, 3],
      aliases: ["Imputation", "NaN handling"],
    },
    {
      id: "categorical-encoding",
      title: "Categorical Encoding",
      summary:
        "Turning categories into numbers without inventing an ordering that was never there.",
      difficulty: "beginner",
      minutes: 25,
      importance: [4, 3, 5, 5, 2],
      keywords: ["one-hot", "ordinal encoding", "target encoding"],
    },
    {
      id: "feature-normalisation",
      title: "Feature Normalisation",
      summary:
        "Rescaling features to a common range so no feature dominates purely through its units.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 3, 4, 5, 2],
      aliases: ["Min-max scaling", "Normalization"],
      related: ["normalisation-layers"],
    },
    {
      id: "standardisation",
      title: "Standardisation",
      summary:
        "Centring a feature at zero and scaling it to unit variance, the default for distance-based methods.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 4, 4, 5, 2],
      prerequisites: ["variance"],
      aliases: ["Z-score scaling"],
    },
    {
      id: "feature-engineering",
      title: "Feature Engineering",
      summary:
        "Constructing inputs that expose the structure a model cannot discover on its own.",
      difficulty: "intermediate",
      minutes: 35,
      importance: [5, 3, 5, 5, 3],
      related: ["representation-learning"],
    },
    {
      id: "feature-selection",
      title: "Feature Selection",
      summary:
        "Keeping the inputs that carry signal and discarding the ones that only add variance.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 3, 4, 5, 3],
      related: ["feature-importance", "curse-of-dimensionality"],
    },
  ]),

  ...splitting([
    {
      id: "train-validation-test-split",
      title: "Train, Validation and Test Splits",
      summary:
        "Holding data back so that a score means something about unseen examples rather than memorised ones.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 4, 5, 4],
      parents: ["datasets"],
      aliases: ["Holdout", "Data splitting"],
    },
    {
      id: "data-leakage",
      title: "Data Leakage",
      summary:
        "Information from the test set reaching the model early, producing scores that evaporate in production.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 4, 5, 4],
      aliases: ["Leakage", "Target leakage"],
    },
  ]),
];
