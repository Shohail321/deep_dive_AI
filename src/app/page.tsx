import { Suspense } from "react";
import { Container } from "@/components/layout";
import { concepts } from "@/curriculum/data";
import {
  buildConceptGraph,
  getConceptsInDomain,
  getDomainRoots,
} from "@/curriculum/graph";
import { domainSchema } from "@/curriculum/metadata";
import {
  DomainExplorer,
  type DomainSummary,
} from "./_components/DomainExplorer";

/**
 * The rings are the curriculum's own shape, read from the graph rather than
 * listed here: each domain's entry concept supplies the title and summary,
 * and the order follows the containment chain. Adding a domain to
 * `domainSchema` puts a ring on the homepage.
 */
function getDomainSummaries(): DomainSummary[] {
  const graph = buildConceptGraph(concepts);
  const roots = getDomainRoots(graph);

  return domainSchema.options.flatMap((domain) => {
    const root = roots.get(domain);
    if (!root) return [];

    return [
      {
        domain,
        title: root.title,
        shortTitle: root.shortTitle ?? root.title,
        summary: root.summary,
        learningObjectives: root.learningObjectives,
        status: root.status,
        concepts: getConceptsInDomain(graph, domain).map((concept) => ({
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
