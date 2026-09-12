import type { Concept } from "../metadata";
import { advancedConcepts } from "./areas/advanced";
import { aiConcepts } from "./areas/ai-classical";
import { applicationConcepts } from "./areas/applications";
import { architectureConcepts } from "./areas/dl-architectures";
import { dlCoreConcepts } from "./areas/dl-core";
import { representationConcepts } from "./areas/dl-representation";
import { dataFoundationConcepts } from "./areas/foundations-data";
import { mathConcepts } from "./areas/foundations-math";
import { genaiConcepts } from "./areas/genai";
import { evaluationConcepts } from "./areas/ml-evaluation";
import { generalisationConcepts } from "./areas/ml-generalisation";
import { mlCoreConcepts } from "./areas/ml-core";
import { optimisationConcepts } from "./areas/ml-optimisation";
import { supervisedConcepts } from "./areas/ml-supervised";
import { unsupervisedConcepts } from "./areas/ml-unsupervised";
import { mlopsConcepts } from "./areas/mlops";
import { researchConcepts } from "./areas/research-practice";
import { responsibleConcepts } from "./areas/responsible";

/**
 * The curriculum registry.
 *
 * This is a map of the field, not a claim to have covered it. It aims at the
 * concepts a serious learner meets across foundations, classical AI, machine
 * learning, deep learning, generative AI, responsible AI, production and
 * research practice — and it will always be missing things.
 *
 * That is the point of the audit in `../graph`: gaps show up as dangling
 * references and unreachable concepts rather than as silence. When a topic is
 * missing, add it to the area file it belongs to (see ../README.md); the
 * audit and the summary report will tell you whether it landed cleanly.
 *
 * Concepts are grouped into area files rather than one file each. At this
 * size, per-concept files would mean several hundred imports to maintain by
 * hand for no benefit.
 */
export const concepts: Concept[] = [
  ...mathConcepts,
  ...dataFoundationConcepts,
  ...aiConcepts,
  ...mlCoreConcepts,
  ...supervisedConcepts,
  ...unsupervisedConcepts,
  ...evaluationConcepts,
  ...generalisationConcepts,
  ...optimisationConcepts,
  ...dlCoreConcepts,
  ...architectureConcepts,
  ...representationConcepts,
  ...applicationConcepts,
  ...genaiConcepts,
  ...responsibleConcepts,
  ...advancedConcepts,
  ...mlopsConcepts,
  ...researchConcepts,
];

export {
  mathConcepts,
  dataFoundationConcepts,
  aiConcepts,
  mlCoreConcepts,
  supervisedConcepts,
  unsupervisedConcepts,
  evaluationConcepts,
  generalisationConcepts,
  optimisationConcepts,
  dlCoreConcepts,
  architectureConcepts,
  representationConcepts,
  applicationConcepts,
  genaiConcepts,
  advancedConcepts,
  mlopsConcepts,
  researchConcepts,
};
