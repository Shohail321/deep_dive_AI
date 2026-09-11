# Curriculum

The curriculum is a **knowledge graph**, not a list of chapters. A concept is
a node; prerequisites, parents and related links are edges. Ordering is a
consequence of the graph, never something typed into a table of contents.

```
metadata/   the ontology — what a concept is, as Zod schemas
graph/      what you can ask of the graph, and what can be wrong with it
data/       the concepts themselves, one file each
```

## The seven concepts in `data/` are not the curriculum

They are fixtures: enough to exercise every field, both relationship
directions and more than one authoring status, and to give the validation
utilities something real to run against. The real curriculum is hundreds of
concepts that do not exist yet. A topic missing from `data/` says nothing
about whether it belongs in the platform.

## Adding a concept

1. Create `data/concepts/<slug>.ts` and export a `defineConcept({ … })`.
   `defineConcept` validates at the definition site, so a mistake fails at
   import rather than at some later render.
2. Add it to the `concepts` array in `data/index.ts`.
3. Run `npm run test` — `data/concepts.test.ts` re-audits the whole graph, so
   a dangling reference or a cycle fails there, named rather than dumped.

There is deliberately no separate audit CLI: it would need a TypeScript
runner as a dependency to do what the test suite already does on every run.

The smallest legal concept:

```ts
import { defineConcept } from "../../metadata";

export const backpropagation = defineConcept({
  id: "backpropagation",
  slug: "backpropagation",
  title: "Backpropagation",
  summary: "How a network works out which weights to blame for its error.",
  domain: "dl",
  category: "Training",
  difficulty: "intermediate",
  estimatedMinutes: 30,
  importance: {
    intuitive: 5,
    mathematical: 5,
    coding: 3,
    practical: 3,
    research: 4,
  },
  status: "planned",
  relationships: {
    parents: ["deep-learning"],
    prerequisites: ["neural-network"],
  },
});
```

`relationships`, `content` and `editorial` may be omitted entirely; each field
inside them defaults. `importance` may not — see below.

## Rules worth knowing before you author

**Author one direction of each relationship.** `children` and
`followUpConcepts` are _derived_ — `buildConceptGraph` inverts `parents` and
`prerequisites`. There is no field to write them into, deliberately: two
hand-maintained copies of the same edge drift apart, and nothing notices.
`relatedConcepts` is closed over both directions the same way, so a "see also"
link is authored once on either end.

**`id` and `slug` are separate on purpose.** The id is the permanent key that
every relationship points at; the slug is the URL and may be rewritten. They
usually start out identical, and should stop being identical rather than
having a rename ripple through the graph.

**Every importance axis is required.** Defaulting a missing score to 0 would
quietly assert "not important" and skew ordering and recommendations with
nobody noticing. Five numbers is a small price for that.

**Prefer `prerequisites` sparingly.** A prerequisite is a hard claim: the
concept does not make sense without it. Anything softer belongs in
`recommendedPrerequisites`, which does not gate anything.

**`status` is about authoring; `content.has*` is about what exists.** A
concept can be `complete` with no playground, if a playground was never
warranted. It cannot be `complete` with no lesson — the audit says so.

## Validating

Two layers, because some problems are only visible before parsing and some
only after:

| Function                     | Input           | Catches                                      |
| ---------------------------- | --------------- | -------------------------------------------- |
| `parseCurriculum(records)`   | unknown records | malformed records, missing domain, bad types |
| `auditCurriculum(concepts)`  | valid concepts  | everything about how concepts relate         |
| `inspectCurriculum(records)` | unknown records | both, in one pass                            |

`auditCurriculum` reports:

| Issue                                                                                                                   | Severity |
| ----------------------------------------------------------------------------------------------------------------------- | -------- |
| `duplicate-id`, `duplicate-slug`                                                                                        | error    |
| `unknown-reference` (tagged with the relation — a missing prerequisite target is this with `relation: "prerequisites"`) | error    |
| `self-reference`                                                                                                        | error    |
| `cycle` (checked for `prerequisites` **and** `parents`)                                                                 | error    |
| `orphan-concept` — no edges at all, in any direction                                                                    | warning  |
| `unreachable-concept` — no path from any root via parent→child                                                          | warning  |
| `incomplete-metadata` — e.g. complete with no lesson, or visualization flags disagreeing                                | warning  |

Errors mean the graph is wrong. Warnings mean it is incomplete, which is the
normal state of a curriculum being written — `hasErrors(issues)` is the check
to gate on.

## Adding a domain

`domainSchema` in `metadata/identity.ts` is the one place the domains are
listed. A new one (a GenAI track, a practical "Use AI" track) needs:

1. the entry in `domainSchema`,
2. a colour token in `src/app/globals.css` (`--color-<domain>` plus a
   `-text` variant that clears 4.5:1),
3. entries in the domain maps in `ConceptLabel` and `ExplanationPanel` —
   TypeScript will name both as errors until you do.

## What does not live here

Lesson prose lives in `src/content` as MDX. This module holds the structure
and the metadata about that content, never the content itself — which is why
a concept records `hasLesson` rather than the lesson.
