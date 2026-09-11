import type { Concept } from "../metadata";
import { artificialIntelligence } from "./concepts/artificial-intelligence";
import { deepLearning } from "./concepts/deep-learning";
import { gradientDescent } from "./concepts/gradient-descent";
import { linearRegression } from "./concepts/linear-regression";
import { machineLearning } from "./concepts/machine-learning";
import { neuralNetwork } from "./concepts/neural-network";
import { transformer } from "./concepts/transformer";

/**
 * Seven representative concepts, not a curriculum.
 *
 * They exist to exercise the ontology — every field, both relationship
 * directions, all four authoring statuses — and to give the validation
 * utilities something real to run against. The actual curriculum is
 * hundreds of concepts that do not exist yet. Nothing should read this list
 * and conclude that a topic is missing from the platform's scope.
 *
 * The barrel is maintained by hand. That is fine at this size and stays
 * honest about what exists; generating it becomes worthwhile well before
 * this list reaches a hundred entries.
 */
export const concepts: Concept[] = [
  artificialIntelligence,
  machineLearning,
  deepLearning,
  linearRegression,
  gradientDescent,
  neuralNetwork,
  transformer,
];

export {
  artificialIntelligence,
  machineLearning,
  deepLearning,
  linearRegression,
  gradientDescent,
  neuralNetwork,
  transformer,
};
