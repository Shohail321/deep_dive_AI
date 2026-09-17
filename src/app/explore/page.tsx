import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { concepts } from "@/curriculum/data";
import { KnowledgeMapExplorer } from "@/visualizations/components/KnowledgeMap";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "The AI knowledge map — pan, zoom, and drill from major fields down to individual concepts, with prerequisites and related ideas at a glance.",
};

/**
 * `concepts` is read once, here, and handed down — the map, the panel, and
 * the list all work from this same array rather than each importing the
 * registry independently, so there is exactly one place a future
 * server-fetched or paginated source would need to change.
 */
export default function ExplorePage() {
  return (
    <Container as="main" className="py-16">
      <header className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Explore</h1>
        <p className="text-foreground-secondary text-base leading-relaxed">
          Every field in the curriculum, from the ten-thousand-foot view down to
          a single concept. Start with a field, drill into what interests you,
          and see how it connects to everything else.
        </p>
      </header>

      <div className="mt-10">
        <KnowledgeMapExplorer concepts={concepts} />
      </div>
    </Container>
  );
}
