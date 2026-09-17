# Visualization primitives

Low-level, reusable building blocks for interactive visualizations —
scale helpers, responsive SVG/canvas wrappers, coordinate utilities — that
concrete visualizations (see `../components`) compose.

Still empty: the knowledge graph (`../components/KnowledgeMap`) depends on
`@xyflow/react` now, but everything it needed beyond React Flow itself
turned out to be graph-shape logic specific to the curriculum, which lives
alongside it rather than here. This folder is for building blocks a second
visualization would actually share — the first playground is a likelier
source of a real one than a second graph.
