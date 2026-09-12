import { defineArea } from "../authoring";

const root = defineArea({ domain: "ai", category: "Foundations" });
const symbolic = defineArea({
  domain: "ai",
  category: "Symbolic AI",
  parents: ["symbolic-ai"],
});
const searchPlanning = defineArea({
  domain: "ai",
  category: "Search and planning",
  parents: ["search"],
});
const agents = defineArea({
  domain: "ai",
  category: "Agents",
  parents: ["intelligent-agents"],
});

export const aiConcepts = [
  ...root([
    {
      id: "artificial-intelligence",
      title: "Artificial Intelligence",
      shortTitle: "AI",
      summary:
        "The broad pursuit of building systems that carry out tasks we would call intelligent — reasoning, planning, perceiving, and deciding.",
      difficulty: "intro",
      minutes: 12,
      importance: [5, 1, 1, 4, 3],
      aliases: ["AI"],
      keywords: ["artificial intelligence", "intelligent systems"],
      content: { hasLesson: true, hasRealWorldExample: true },
      status: "drafting",
    },
    {
      id: "history-of-ai",
      title: "History of AI",
      summary:
        "The cycles of optimism and winters that explain why the field looks the way it does today.",
      difficulty: "intro",
      minutes: 20,
      importance: [4, 1, 1, 2, 3],
      parents: ["artificial-intelligence"],
      keywords: ["ai winter", "dartmouth"],
    },
    {
      id: "ai-ml-relationship",
      title: "How Machine Learning Relates to AI",
      summary:
        "Why learning from data became the dominant approach to AI, and what it displaced.",
      difficulty: "intro",
      minutes: 15,
      importance: [5, 1, 1, 3, 3],
      parents: ["artificial-intelligence"],
      prerequisites: ["artificial-intelligence"],
      related: ["machine-learning"],
    },
  ]),

  ...symbolic([
    {
      id: "symbolic-ai",
      title: "Symbolic AI",
      summary:
        "Encoding knowledge as explicit symbols and rules rather than learning it from examples.",
      difficulty: "beginner",
      minutes: 25,
      importance: [4, 2, 2, 2, 4],
      parents: ["artificial-intelligence"],
      aliases: ["Good old-fashioned AI", "GOFAI"],
    },
    {
      id: "knowledge-representation",
      title: "Knowledge Representation",
      summary:
        "Choosing a structure for what a system knows, so that it can be reasoned over mechanically.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 3, 2, 3, 4],
      keywords: ["ontology", "semantic network", "frames"],
      related: ["knowledge-graphs"],
    },
    {
      id: "logic-and-inference",
      title: "Logic and Inference",
      summary:
        "Deriving new statements from known ones by rules that preserve truth.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [3, 4, 2, 2, 4],
      prerequisites: ["mathematical-thinking"],
    },
    {
      id: "rule-based-systems",
      title: "Rule-Based Systems",
      summary:
        "Programs built from if-then rules applied by an inference engine rather than learned weights.",
      difficulty: "beginner",
      minutes: 20,
      importance: [4, 2, 3, 3, 2],
      prerequisites: ["logic-and-inference"],
    },
    {
      id: "expert-systems",
      title: "Expert Systems",
      summary:
        "Rule-based systems encoding a specialist's knowledge, the commercial face of AI in the 1980s.",
      difficulty: "beginner",
      minutes: 20,
      importance: [3, 1, 2, 2, 3],
      prerequisites: ["rule-based-systems"],
    },
    {
      id: "knowledge-graphs",
      title: "Knowledge Graphs",
      summary:
        "Facts stored as entities and the relationships between them, queryable as a graph.",
      difficulty: "intermediate",
      minutes: 25,
      importance: [4, 2, 4, 4, 3],
      prerequisites: ["knowledge-representation"],
      related: ["graph-machine-learning", "retrieval-augmented-generation"],
    },
  ]),

  ...searchPlanning([
    {
      id: "search",
      title: "Search",
      summary:
        "Exploring a space of possible states to find one that satisfies a goal.",
      difficulty: "beginner",
      minutes: 30,
      importance: [5, 3, 4, 3, 4],
      parents: ["artificial-intelligence"],
      keywords: ["breadth-first", "depth-first", "state space"],
    },
    {
      id: "heuristic-search",
      title: "Heuristic Search",
      summary:
        "Using an estimate of remaining cost to look in promising directions first.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 3, 4, 3, 4],
      prerequisites: ["search"],
      aliases: ["A*", "Informed search"],
    },
    {
      id: "game-playing",
      title: "Game Playing",
      summary:
        "Searching adversarial state spaces where an opponent is choosing against you.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 3, 4, 2, 4],
      prerequisites: ["search"],
      keywords: ["minimax", "alpha-beta", "monte carlo tree search"],
    },
    {
      id: "constraint-satisfaction",
      title: "Constraint Satisfaction",
      summary:
        "Finding assignments that satisfy every stated restriction at once.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 4, 3, 4, 3],
      prerequisites: ["search"],
      aliases: ["CSP"],
    },
    {
      id: "automated-planning",
      title: "Planning",
      summary:
        "Choosing a sequence of actions that moves the world from its current state to a goal state.",
      difficulty: "intermediate",
      minutes: 30,
      importance: [4, 3, 3, 4, 4],
      prerequisites: ["search"],
      related: ["ai-agents"],
    },
  ]),

  ...agents([
    {
      id: "intelligent-agents",
      title: "Intelligent Agents",
      summary:
        "Systems that perceive their environment and act in it to pursue an objective.",
      difficulty: "beginner",
      minutes: 25,
      importance: [5, 2, 3, 4, 4],
      parents: ["artificial-intelligence"],
    },
    {
      id: "environments-and-actions",
      title: "Environments and Actions",
      summary:
        "How observable, stochastic and sequential a setting is, which decides what kind of agent it needs.",
      difficulty: "intermediate",
      minutes: 20,
      importance: [4, 3, 2, 3, 4],
      prerequisites: ["intelligent-agents"],
      related: ["markov-decision-process"],
    },
  ]),
];
