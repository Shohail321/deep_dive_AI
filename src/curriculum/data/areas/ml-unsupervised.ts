import { defineArea } from "../authoring";

const clustering = defineArea({
  domain: "ml",
  category: "Unsupervised learning",
  subcategory: "Clustering",
  parents: ["clustering"],
});
const reduction = defineArea({
  domain: "ml",
  category: "Unsupervised learning",
  subcategory: "Dimensionality reduction",
  parents: ["dimensionality-reduction"],
});
const other = defineArea({
  domain: "ml",
  category: "Unsupervised learning",
  parents: ["unsupervised-learning"],
});

export const unsupervisedConcepts = [
  ...clustering([
    {
      id: "clustering",
      title: "Clustering",
      summary:
        "Grouping examples that resemble each other, without being told what the groups should be.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 3, 4, 5, 3],
      parents: ["unsupervised-learning"],
    },
    {
      id: "k-means",
      title: "k-Means",
      summary:
        "Splitting data into k groups by repeatedly moving centres to the mean of their members.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 3, 4, 5, 2],
      prerequisites: ["clustering"],
      content: { hasVisualization: true },
      visualization: { visualizationType: "plot", interactionType: "step" },
    },
    {
      id: "hierarchical-clustering",
      title: "Hierarchical Clustering",
      summary:
        "Building a tree of nested groups, so the number of clusters can be chosen afterwards.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 3, 3, 4, 3],
      prerequisites: ["clustering"],
      keywords: ["dendrogram", "linkage"],
    },
    {
      id: "dbscan",
      title: "DBSCAN",
      summary:
        "Clustering by density, which finds odd-shaped groups and labels the leftovers as noise.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 3, 3, 4, 3],
      prerequisites: ["clustering"],
      related: ["anomaly-detection"],
    },
    {
      id: "gaussian-mixture-models",
      title: "Gaussian Mixture Models",
      summary:
        "Modelling data as a blend of bell curves, giving soft cluster membership instead of hard assignment.",
      difficulty: "advanced",
      minutes: 30,
      importance: [3, 5, 3, 3, 4],
      prerequisites: ["clustering", "probability-distributions"],
      aliases: ["GMM"],
    },
    {
      id: "cluster-evaluation",
      title: "Evaluating Clusters",
      summary:
        "Judging groupings when there is no correct answer to compare against.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 3, 3, 4, 3],
      prerequisites: ["clustering"],
      keywords: ["silhouette", "inertia", "elbow method"],
    },
  ]),

  ...reduction([
    {
      id: "dimensionality-reduction",
      title: "Dimensionality Reduction",
      summary:
        "Describing data with fewer numbers while keeping what matters about it.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 4, 4, 4],
      parents: ["unsupervised-learning"],
      related: ["curse-of-dimensionality"],
    },
    {
      id: "curse-of-dimensionality",
      title: "Curse of Dimensionality",
      summary:
        "Why distance stops being meaningful and data grows sparse as the number of features climbs.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 2, 4, 4],
      parents: ["unsupervised-learning"],
    },
    {
      id: "pca",
      title: "Principal Component Analysis",
      summary:
        "Rotating data onto the axes that carry the most variance, then keeping only the first few.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 3, 4, 4],
      prerequisites: ["dimensionality-reduction", "eigenvalues-eigenvectors"],
      aliases: ["PCA"],
    },
    {
      id: "t-sne",
      title: "t-SNE",
      summary:
        "A projection for looking at high-dimensional data, useful for seeing structure and easy to over-read.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 3, 4, 4],
      prerequisites: ["dimensionality-reduction"],
    },
    {
      id: "umap",
      title: "UMAP",
      summary:
        "A faster neighbour-based projection that tends to preserve more of the global layout than t-SNE.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 3, 4, 4],
      prerequisites: ["dimensionality-reduction"],
    },
  ]),

  ...other([
    {
      id: "anomaly-detection",
      title: "Anomaly Detection",
      summary:
        "Finding the examples that do not belong, usually without examples of what wrong looks like.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 4, 5, 4],
      keywords: ["outlier", "novelty detection", "fraud"],
    },
    {
      id: "association-rule-learning",
      title: "Association Rule Learning",
      summary:
        "Discovering which items tend to appear together, the classic basket-analysis problem.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [3, 2, 3, 4, 2],
      aliases: ["Market basket analysis", "Apriori"],
    },
    {
      id: "density-estimation",
      title: "Density Estimation",
      summary:
        "Modelling how likely each region of the input space is, rather than predicting a label.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 5, 2, 3, 4],
      prerequisites: ["probability-distributions"],
      related: ["generative-models"],
    },
  ]),
];
