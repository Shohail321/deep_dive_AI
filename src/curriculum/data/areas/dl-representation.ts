import { defineArea } from "../authoring";

const representation = defineArea({
  domain: "dl",
  category: "Representation learning",
  parents: ["representation-learning"],
});
const generative = defineArea({
  domain: "dl",
  category: "Generative models",
  parents: ["generative-models"],
});

export const representationConcepts = [
  ...representation([
    {
      id: "representation-learning",
      title: "Representation Learning",
      summary:
        "Letting a model discover the features rather than hand-designing them, which is deep learning's central claim.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 3, 5, 5],
      parents: ["deep-learning"],
      related: ["feature-engineering"],
    },
    {
      id: "embeddings",
      title: "Embeddings",
      summary:
        "Dense vectors placing similar things near each other, the common currency of modern AI.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 4, 5, 5, 5],
      prerequisites: ["vectors", "representation-learning"],
    },
    {
      id: "embedding-spaces",
      title: "Representation Spaces",
      summary:
        "What distance and direction actually mean once data has been embedded.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 4, 3, 4, 5],
      prerequisites: ["embeddings"],
      aliases: ["Latent space"],
      keywords: ["cosine similarity", "latent space"],
    },
    {
      id: "word-embeddings",
      title: "Word Embeddings",
      summary:
        "Vectors for words learned from the company they keep, the first widely useful text representation.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [5, 4, 4, 4, 4],
      prerequisites: ["embeddings"],
    },
    {
      id: "word2vec",
      title: "Word2Vec",
      summary:
        "Training word vectors by predicting neighbouring words, the method that popularised embeddings.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 4, 3, 3, 4],
      prerequisites: ["word-embeddings"],
      aliases: ["Skip-gram", "CBOW"],
    },
    {
      id: "metric-learning",
      title: "Metric Learning",
      summary:
        "Training a model so that distance in its output space means what you want it to mean.",
      difficulty: "advanced",
      minutes: 25,
      importance: [3, 4, 3, 4, 5],
      prerequisites: ["embedding-spaces"],
      keywords: ["triplet loss", "siamese network"],
    },
    {
      id: "contrastive-learning",
      title: "Contrastive Learning",
      summary:
        "Learning by pulling matching pairs together and pushing mismatched pairs apart.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 3, 4, 5],
      prerequisites: ["metric-learning", "self-supervised-learning"],
    },
  ]),

  ...generative([
    {
      id: "generative-models",
      title: "Generative Models",
      summary:
        "Models that learn the distribution of the data well enough to produce new samples from it.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 4, 4, 5, 5],
      parents: ["deep-learning"],
      related: ["density-estimation"],
    },
    {
      id: "autoencoders",
      title: "Autoencoders",
      summary:
        "Networks trained to reconstruct their own input through a deliberately narrow middle.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 4, 4, 4, 4],
      prerequisites: ["neural-network", "representation-learning"],
    },
    {
      id: "variational-autoencoders",
      title: "Variational Autoencoders",
      summary:
        "Autoencoders with a probabilistic middle, so the latent space can be sampled sensibly.",
      difficulty: "advanced",
      minutes: 35,
      importance: [3, 5, 3, 3, 5],
      prerequisites: ["autoencoders", "probability-distributions"],
      aliases: ["VAE"],
    },
    {
      id: "generative-adversarial-networks",
      title: "Generative Adversarial Networks",
      summary:
        "A generator and a critic trained against each other until the fakes stop being distinguishable.",
      difficulty: "advanced",
      minutes: 35,
      importance: [4, 4, 3, 3, 5],
      prerequisites: ["generative-models"],
      aliases: ["GAN"],
    },
    {
      id: "diffusion-models",
      title: "Diffusion Models",
      summary:
        "Learning to reverse a gradual noising process, the method behind current image generation.",
      difficulty: "advanced",
      minutes: 35,
      importance: [4, 5, 3, 5, 5],
      prerequisites: ["generative-models", "probability-distributions"],
    },
    {
      id: "autoregressive-models",
      title: "Autoregressive Models",
      summary:
        "Generating one piece at a time, each conditioned on everything produced so far.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 4, 4, 5, 5],
      prerequisites: ["generative-models", "sequence-modelling"],
      related: ["next-token-prediction"],
    },
  ]),
];
