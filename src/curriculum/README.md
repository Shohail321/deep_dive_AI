# Curriculum

The curriculum is a **knowledge graph**, not a list of chapters. A concept is
a node; prerequisites, parents and related links are edges. Ordering is a
consequence of the graph, never something typed into a table of contents.

```
metadata/     the ontology — what a concept is, as Zod schemas
graph/        what you can ask of the graph, and what can be wrong with it
data/areas/   the concepts themselves, grouped by area
```

## What the registry is, and is not

It is a map of the field: the concepts a serious learner meets across
foundations, classical AI, machine learning, deep learning, generative AI,
responsible AI, production and research practice. Run the test suite to see
the current count and shape.

It is **not** a claim to have covered the field, and it never will be. Whole
areas are thin, and each concept is a one-line summary rather than a lesson.
What the architecture guarantees is that gaps are _discoverable_: a missing
prerequisite shows up as a dangling reference, a stranded topic shows up as
an orphan, and the summary report shows where coverage is thinnest.

## Adding a concept

1. Open the area file it belongs to in `data/areas/` — or add a new one.
2. Add a record to the relevant `defineArea({ … })` block.
3. Run `npm run test`. The registry is re-audited on every run, so a dangling
   reference, a cycle or a duplicate fails there, named rather than dumped.

```ts
const training = defineArea({
  domain: "dl",
  category: "Training neural networks",
  parents: ["neural-network"],
});

export const dlCoreConcepts = training([
  {
    id: "backpropagation",
    title: "Backpropagation",
    summary: "How a network works out which weights to blame for its error.",
    difficulty: "advanced",
    minutes: 35,
    // [intuitive, mathematical, coding, practical, research]
    importance: [5, 5, 4, 4, 5],
    prerequisites: ["chain-rule", "forward-propagation"],
  },
]);
```

`defineArea` fills in the domain, category and shared parent, and runs every
record through `defineConcept` — so a mistake fails at import, not at render.
Importance is a fixed 5-tuple; the schema still requires all five axes.

Concepts are grouped by area rather than one file each. At several hundred
records, per-concept files would mean maintaining an equally long list of
imports by hand for no benefit.

## Coverage reporting

`graph/coverage.ts` joins each concept with what the graph knows about it —
issues, orphan/unreachable status, has/lacks content flags — into one
`ConceptCoverageRow` per concept, plus `getDomainCoverage` for per-domain
percentages and `filterCoverageRows` for the multi-dimension filtering the
admin view and any future report both need. These functions have no UI or
CLI logic of their own; `coverage.test.ts` covers them directly.

Two consumers build on that layer:

- `npm run audit:curriculum` (`scripts/audit-curriculum.ts`, run via `tsx`)
  prints the full summary and every issue, and exits non-zero only for
  error-severity issues — duplicate ids, invalid references, cycles. It runs
  in CI between `test` and `build` and never fails merely because lesson
  content is still planned. Now that `tsx` is a dependency for other reasons,
  the cost that used to keep this CLI out no longer applies.
- `/admin/curriculum` (development only — gated by both `src/proxy.ts` and an
  in-page `notFound()`) is the same data as an interactive, filterable table,
  for browsing coverage rather than reading a terminal dump.

## The summary report

`summarizeCurriculum(concepts)` returns counts by domain, difficulty and
status, alongside orphan, invalid-reference, cycle and unreachable counts.
`formatCurriculumSummary` renders it, and `graph/summary.test.ts` prints it
on every test run — so the state of the curriculum is visible without a
committed snapshot that would immediately go stale.

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

## Domains

`metadata/domains.ts` is the one place domains are listed, along with a label
and whether the domain is part of the **spine**.

The spine is `ai ⊃ ml ⊃ dl` — the containment chain the homepage draws as
concentric rings. Everything else (maths, data, generative AI, responsible
AI, MLOps, research practice) is a neighbouring body of knowledge, not a
subset of AI, and so is deliberately not a ring.

Adding a domain needs:

1. the entry in `domainSchema` and `DOMAIN_META`,
2. entries in the domain maps in `ConceptLabel`, `ExplanationPanel`,
   `DomainRings` and `DomainExplorer` — TypeScript names every one of them
   as an error until you do,
3. a colour token in `src/app/globals.css` only if the domain earns an
   identity hue. Only spine domains have one; the rest render neutral on
   purpose, because nine competing colours would drain the AI/ML/DL palette
   of its meaning.

## What does not live here

Lesson prose lives in `src/content` as MDX. This module holds the structure
and the metadata about that content, never the content itself — which is why
a concept records `hasLesson` rather than the lesson.
