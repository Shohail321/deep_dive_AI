import { defineArea } from "../authoring";

const reading = defineArea({
  domain: "research",
  category: "Research skills",
  parents: ["research-practice"],
});
const rigour = defineArea({
  domain: "research",
  category: "Experimental rigour",
  parents: ["research-practice"],
});
const documentation = defineArea({
  domain: "research",
  category: "Documentation",
  parents: ["research-practice"],
});

export const researchConcepts = [
  ...reading([
    {
      id: "research-practice",
      title: "Research Practice",
      summary:
        "The habits that separate a result worth believing from a number that happened once.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 3, 2, 4, 5],
      parents: [],
    },
    {
      id: "reading-ml-papers",
      title: "Reading ML Papers",
      summary:
        "Getting the claim, the evidence and the limitations out of a paper without reading every line.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [5, 3, 2, 4, 5],
    },
    {
      id: "literature-review",
      title: "Literature Review",
      summary:
        "Finding what has already been tried, so effort goes somewhere new.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 1, 4, 5],
      prerequisites: ["reading-ml-papers"],
    },
  ]),

  ...rigour([
    {
      id: "ablation-studies",
      title: "Ablation Studies",
      summary:
        "Removing one piece at a time to find out which part of a system actually did the work.",
      difficulty: "advanced",
      minutes: 25,
      importance: [4, 3, 3, 4, 5],
      prerequisites: ["experiment-design"],
    },
    {
      id: "statistical-significance",
      title: "Statistical Significance",
      summary:
        "Deciding whether a gap between two models is larger than run-to-run noise.",
      difficulty: "advanced",
      minutes: 30,
      importance: [4, 5, 2, 4, 5],
      prerequisites: ["hypothesis-testing"],
      related: ["baselines"],
    },
    {
      id: "benchmark-limitations",
      title: "Benchmarks and Their Limits",
      summary:
        "Why leaderboard position and real-world usefulness drift apart, including through contamination.",
      difficulty: "advanced",
      minutes: 25,
      importance: [5, 2, 3, 5, 5],
      related: ["llm-evaluation"],
    },
  ]),

  ...documentation([
    {
      id: "dataset-documentation",
      title: "Dataset Documentation",
      summary:
        "Recording where data came from, who is in it and what it may not be used for.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 1, 2, 5, 5],
      aliases: ["Datasheets for datasets"],
      related: ["data-quality"],
    },
    {
      id: "model-documentation",
      title: "Model Documentation",
      summary:
        "Stating what a model was built for, how it was evaluated and where it should not be used.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 1, 2, 5, 5],
      aliases: ["Model cards"],
      related: ["responsible-deployment"],
    },
    {
      id: "reporting-limitations",
      title: "Reporting Limitations",
      summary:
        "Saying plainly what a result does not show, which is what makes the rest trustworthy.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [5, 2, 1, 5, 5],
    },
  ]),
];
