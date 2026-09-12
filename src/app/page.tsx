import { Suspense } from "react";
import { Container } from "@/components/layout";
import { concepts } from "@/curriculum/data";
import {
  buildConceptGraph,
  getConceptsInDomain,
  getDomainRoots,
} from "@/curriculum/graph";
import { SPINE_DOMAINS } from "@/curriculum/metadata";
import {
  DomainExplorer,
  type DomainSummary,
} from "./_components/DomainExplorer";

/**
 * The rings are the curriculum's own shape, read from the graph rather than
 * listed here: each domain's entry concept supplies the title and summary.
 *
 * Only the spine domains become rings. The curriculum also covers maths,
 * data, generative AI, responsible AI, production and research practice —
 * none of which is a subset of "artificial intelligence", so none of which
 * belongs inside the concentric diagram.
 */
function getDomainSummaries(): DomainSummary[] {
  const graph = buildConceptGraph(concepts);
  const roots = getDomainRoots(graph);

  return SPINE_DOMAINS.flatMap((domain) => {
    const root = roots.get(domain);
    if (!root) return [];

    const inDomain = getConceptsInDomain(graph, domain);

    return [
      {
        domain,
        title: root.title,
        shortTitle: root.shortTitle ?? root.title,
        summary: root.summary,
        learningObjectives: root.learningObjectives,
        status: root.status,
        conceptCount: inDomain.length,
        // A few entry points, not the whole domain: a field with a hundred
        // concepts would otherwise render as a wall of chips, and every one
        // of them would be serialised to the client for nothing.
        concepts: inDomain
          .filter((concept) => concept.id !== root.id)
          .sort(
            (a, b) =>
              b.importance.intuitive +
              b.importance.practical -
              (a.importance.intuitive + a.importance.practical),
          )
          .slice(0, 6)
          .map((concept) => ({
            id: concept.id,
            title: concept.title,
            status: concept.status,
          })),
      },
    ];
  });
}

export default function Home() {
  const domains = getDomainSummaries();

  return (
    <Container as="main" className="flex flex-1 flex-col justify-center py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Deep Dive AI
        </h1>
        <p className="text-foreground-secondary mt-4 text-base leading-relaxed text-balance sm:text-lg">
          Artificial intelligence, machine learning, and deep learning are not
          three subjects side by side. Each one sits inside the last.
        </p>
      </header>

      <div className="mt-12 sm:mt-16">
        <Suspense
          fallback={
            <div
              className="min-h-[34rem] sm:min-h-[38rem]"
              aria-busy
              role="status"
              aria-label="Loading the field diagram"
            />
          }
        >
          <DomainExplorer domains={domains} />
        </Suspense>
      </div>
    </Container>
  );
}
