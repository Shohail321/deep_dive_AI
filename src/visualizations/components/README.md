# Visualization components

Concrete, concept-facing visualizations — the knowledge graph, and
eventually the neural network diagram and workflow diagrams.

- `DomainRings` — the homepage's AI ⊃ ML ⊃ DL containment diagram.
- `KnowledgeMap/` — the curriculum explorer at `/explore`, built on
  `@xyflow/react`. See its own files: `layout.ts` and `nodeState.ts` hold
  the graph-shape and visual-state logic independent of React Flow or the
  DOM, `useKnowledgeMapState.ts` is the state both the spatial canvas and
  the accessible hierarchical list read from, and everything else is
  presentation.

Nothing here has needed `../primitives` yet — React Flow supplies its own
rendering, and `DomainRings` is plain CSS. See `../primitives/README.md`
for what that folder is for once something does.
