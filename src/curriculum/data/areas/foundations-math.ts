import { defineArea } from "../authoring";

const core = defineArea({ domain: "math", category: "Mathematical thinking" });
const algebra = defineArea({
  domain: "math",
  category: "Algebra",
  parents: ["mathematical-thinking"],
});
const linearAlgebra = defineArea({
  domain: "math",
  category: "Linear algebra",
  parents: ["linear-algebra"],
});
const calculus = defineArea({
  domain: "math",
  category: "Calculus",
  parents: ["calculus"],
});
const probability = defineArea({
  domain: "math",
  category: "Probability",
  parents: ["probability"],
});
const statistics = defineArea({
  domain: "math",
  category: "Statistics",
  parents: ["statistics"],
});
const optimisation = defineArea({
  domain: "math",
  category: "Optimisation and computation",
  parents: ["mathematical-thinking"],
});

export const mathConcepts = [
  ...core([
    {
      id: "mathematical-thinking",
      title: "Mathematical Thinking",
      summary:
        "Reading and writing precise statements about quantities, which is the skill every other topic here rests on.",
      difficulty: "intro",
      minutes: 15,
      importance: [5, 4, 1, 3, 3],
      keywords: ["notation", "proof", "rigour"],
    },
    {
      id: "functions",
      title: "Functions",
      summary:
        "A rule that turns each input into exactly one output, which is what every model ultimately is.",
      difficulty: "intro",
      minutes: 20,
      importance: [5, 4, 2, 3, 2],
      parents: ["mathematical-thinking"],
      keywords: ["domain", "range", "mapping"],
    },
  ]),

  ...algebra([
    {
      id: "algebra",
      title: "Algebra",
      summary:
        "Manipulating symbols that stand for unknown quantities, and the language model equations are written in.",
      difficulty: "intro",
      minutes: 25,
      importance: [5, 5, 2, 3, 2],
    },
    {
      id: "exponents",
      title: "Exponents",
      summary:
        "Repeated multiplication, and the growth behaviour behind activation functions and model scaling.",
      difficulty: "intro",
      minutes: 15,
      importance: [4, 4, 2, 2, 2],
      prerequisites: ["algebra"],
    },
    {
      id: "logarithms",
      title: "Logarithms",
      summary:
        "The inverse of exponentiation, used to turn products into sums in almost every loss function.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 5, 2, 3, 3],
      prerequisites: ["exponents"],
      related: ["cross-entropy-loss"],
    },
  ]),

  ...linearAlgebra([
    {
      id: "linear-algebra",
      title: "Linear Algebra",
      summary:
        "The mathematics of vectors and matrices, which is how data and model parameters are actually stored.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 5, 3, 4, 4],
      parents: ["mathematical-thinking"],
      prerequisites: ["algebra"],
    },
    {
      id: "vectors",
      title: "Vectors",
      summary:
        "An ordered list of numbers representing a point or direction, and the shape a single example takes.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 5, 3, 4, 3],
      keywords: ["dot product", "norm", "magnitude"],
    },
    {
      id: "matrices",
      title: "Matrices",
      summary:
        "A rectangular grid of numbers, used to hold a whole dataset or a layer's weights at once.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 5, 4, 4, 3],
      prerequisites: ["vectors"],
    },
    {
      id: "matrix-multiplication",
      title: "Matrix Multiplication",
      summary:
        "Combining two matrices into a third, and the single operation that dominates the cost of training.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 5, 4, 4, 3],
      prerequisites: ["matrices"],
      aliases: ["Matmul", "GEMM"],
    },
    {
      id: "eigenvalues-eigenvectors",
      title: "Eigenvalues and Eigenvectors",
      summary:
        "Directions a matrix only stretches rather than rotates, which is what PCA searches for.",
      difficulty: "advanced",
      minutes: 35,
      importance: [3, 5, 2, 2, 4],
      prerequisites: ["matrix-multiplication"],
      related: ["pca"],
    },
    {
      id: "matrix-decomposition",
      title: "Matrix Decomposition",
      summary:
        "Factoring a matrix into simpler pieces, underpinning dimensionality reduction and many solvers.",
      difficulty: "advanced",
      minutes: 30,
      importance: [2, 5, 2, 2, 4],
      prerequisites: ["eigenvalues-eigenvectors"],
      aliases: ["SVD", "Singular value decomposition"],
    },
    {
      id: "tensors",
      title: "Tensors",
      summary:
        "Arrays with more than two axes, the container every deep learning framework is built around.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 3, 5, 4, 3],
      prerequisites: ["matrices"],
      related: ["numpy"],
    },
  ]),

  ...calculus([
    {
      id: "calculus",
      title: "Calculus",
      summary:
        "The mathematics of change, which is what lets a model know which way to adjust itself.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 5, 2, 3, 4],
      parents: ["mathematical-thinking"],
      prerequisites: ["functions"],
    },
    {
      id: "derivatives",
      title: "Derivatives",
      summary:
        "How fast a function changes as its input moves, measured at a single point.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 5, 2, 3, 4],
      prerequisites: ["functions"],
    },
    {
      id: "partial-derivatives",
      title: "Partial Derivatives",
      summary:
        "The derivative with respect to one input while the others are held still.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 5, 2, 3, 4],
      prerequisites: ["derivatives"],
    },
    {
      id: "gradients",
      title: "Gradients",
      summary:
        "The vector of every partial derivative at once, pointing in the direction of steepest increase.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 5, 3, 4, 4],
      prerequisites: ["partial-derivatives", "vectors"],
      related: ["gradient-descent"],
    },
    {
      id: "chain-rule",
      title: "Chain Rule",
      summary:
        "How to differentiate nested functions, which is precisely what backpropagation applies layer by layer.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 5, 2, 3, 4],
      prerequisites: ["derivatives"],
      related: ["backpropagation"],
    },
  ]),

  ...probability([
    {
      id: "probability",
      title: "Probability",
      summary:
        "Reasoning about uncertain outcomes, the frame in which nearly every model states its predictions.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 5, 2, 4, 4],
      parents: ["mathematical-thinking"],
    },
    {
      id: "random-variables",
      title: "Random Variables",
      summary:
        "A quantity whose value depends on a random outcome, used to describe both data and noise.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 5, 2, 3, 4],
    },
    {
      id: "probability-distributions",
      title: "Probability Distributions",
      summary:
        "How probability is spread across the values a random variable can take.",
      difficulty: "beginner",
      minutes: 25,
      importance: [4, 5, 2, 3, 4],
      prerequisites: ["random-variables"],
      aliases: ["Distributions"],
      keywords: ["normal", "gaussian", "bernoulli", "uniform"],
    },
    {
      id: "expectation",
      title: "Expectation",
      summary:
        "The long-run average value of a random variable, and what most loss functions are an estimate of.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 5, 2, 3, 4],
      prerequisites: ["probability-distributions"],
      aliases: ["Expected value", "Mean"],
    },
    {
      id: "variance",
      title: "Variance",
      summary:
        "How far a random variable typically falls from its own average.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 5, 2, 3, 4],
      prerequisites: ["expectation"],
      aliases: ["Standard deviation"],
      related: ["model-variance"],
    },
    {
      id: "conditional-probability",
      title: "Conditional Probability",
      summary:
        "The probability of one event given that another has already happened.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 5, 2, 4, 4],
      prerequisites: ["probability"],
    },
    {
      id: "bayes-theorem",
      title: "Bayes' Theorem",
      summary:
        "How to update a belief when new evidence arrives, and the basis of an entire school of modelling.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 5, 2, 4, 5],
      prerequisites: ["conditional-probability"],
      related: ["naive-bayes", "bayesian-ml"],
    },
    {
      id: "information-theory",
      title: "Information Theory",
      summary:
        "Measuring surprise and information content, where entropy and cross-entropy come from.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 5, 2, 3, 5],
      prerequisites: ["probability-distributions", "logarithms"],
      keywords: ["entropy", "kl divergence", "mutual information"],
      related: ["cross-entropy-loss"],
    },
  ]),

  ...statistics([
    {
      id: "statistics",
      title: "Statistics",
      summary:
        "Drawing conclusions about a population from a sample, which is what every trained model attempts.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 4, 2, 5, 4],
      parents: ["mathematical-thinking"],
      prerequisites: ["probability"],
    },
    {
      id: "sampling",
      title: "Sampling",
      summary:
        "Choosing which observations to collect, and the first place a dataset can go quietly wrong.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 3, 2, 5, 4],
      related: ["sampling-bias"],
    },
    {
      id: "estimation",
      title: "Estimation",
      summary:
        "Inferring an unknown quantity from data, with an honest account of how uncertain the answer is.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 5, 2, 4, 4],
      prerequisites: ["expectation"],
      keywords: ["maximum likelihood", "confidence interval"],
    },
    {
      id: "hypothesis-testing",
      title: "Hypothesis Testing",
      summary:
        "Deciding whether an observed effect is larger than chance would comfortably explain.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 4, 2, 4, 5],
      prerequisites: ["probability-distributions"],
      related: ["statistical-significance"],
      keywords: ["p-value", "null hypothesis"],
    },
    {
      id: "correlation",
      title: "Correlation",
      summary:
        "How strongly two quantities move together, and famously not evidence that one causes the other.",
      difficulty: "beginner",
      minutes: 20,
      importance: [5, 3, 2, 5, 3],
      related: ["causal-inference"],
    },
  ]),

  ...optimisation([
    {
      id: "mathematical-optimisation",
      title: "Mathematical Optimisation",
      summary:
        "Finding the input that makes a function as small or large as possible, which is what training is.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 5, 3, 4, 4],
      prerequisites: ["calculus"],
      aliases: ["Optimization"],
      related: ["gradient-descent"],
    },
    {
      id: "convexity",
      title: "Convexity",
      summary:
        "A shape of loss surface with no misleading local dips, which makes optimisation tractable.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 5, 2, 3, 4],
      prerequisites: ["mathematical-optimisation"],
      related: ["local-minima"],
    },
    {
      id: "numerical-computation",
      title: "Numerical Computation",
      summary:
        "Doing mathematics in finite precision, where rounding, overflow and instability become real problems.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [3, 4, 5, 4, 4],
      prerequisites: ["mathematical-thinking"],
      keywords: ["floating point", "numerical stability", "precision"],
    },
    {
      id: "computational-complexity",
      title: "Computational Complexity",
      summary:
        "How an algorithm's cost grows with input size, which decides what is affordable at scale.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [3, 3, 5, 5, 3],
      prerequisites: ["mathematical-thinking"],
      aliases: ["Big-O"],
    },
  ]),
];
