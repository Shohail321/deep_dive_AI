import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import {
  Badge,
  Breadcrumb,
  ConceptLabel,
  LinkButton,
  type BadgeTone,
} from "@/components/ui";
import { concepts } from "@/curriculum/data";
import {
  buildConceptGraph,
  getConceptsInDomain,
  getDomainRoots,
} from "@/curriculum/graph";
import { DOMAIN_META, domainSchema, type Domain } from "@/curriculum/metadata";

export function generateStaticParams() {
  return domainSchema.options.map((domain) => ({ domain }));
}

// The set of domains is closed (`domainSchema`) — there is no runtime case
// where a param outside `generateStaticParams` should render anything, so
// Next 404s it immediately rather than invoking the page for it.
export const dynamicParams = false;

function parseDomain(raw: string): Domain | null {
  const parsed = domainSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const domain = parseDomain((await params).domain);
  return { title: domain ? DOMAIN_META[domain].label : "Field not found" };
}

const domainTone: Record<Domain, BadgeTone> = {
  ai: "ai",
  ml: "ml",
  dl: "dl",
  math: "neutral",
  data: "neutral",
  genai: "neutral",
  responsible: "neutral",
  mlops: "neutral",
  research: "neutral",
};

/**
 * Where a ring on the homepage actually leads, once you commit to exploring
 * it. This is deliberately a plain overview rather than the bespoke
 * narrative/workflow/network-diagram treatment each field will eventually
 * get — it exists so a click goes somewhere real, reading the same curriculum
 * registry the rest of the app does, ahead of that dedicated work.
 */
export default async function DomainOverviewPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const domain = parseDomain((await params).domain);
  if (!domain) notFound();

  const meta = DOMAIN_META[domain];
  const graph = buildConceptGraph(concepts);
  const root = getDomainRoots(graph).get(domain);
  const inDomain = getConceptsInDomain(graph, domain);

  const byCategory = new Map<string, typeof inDomain>();
  for (const concept of inDomain) {
    const existing = byCategory.get(concept.category);
    if (existing) existing.push(concept);
    else byCategory.set(concept.category, [concept]);
  }

  return (
    <Container as="main" className="py-16">
      <Breadcrumb
        items={[{ label: "Deep Dive AI", href: "/" }, { label: meta.label }]}
      />

      <header className="mt-6 max-w-2xl space-y-4">
        <Badge tone={domainTone[domain]}>{meta.shortLabel}</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">{meta.label}</h1>
        <p className="text-foreground-secondary text-base leading-relaxed">
          {root?.summary ??
            `${inDomain.length} concept${inDomain.length === 1 ? "" : "s"} in this field are being mapped out.`}
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {inDomain.length === 0 ? (
          <p className="text-foreground-muted text-sm">
            No concepts have been added to this field yet.
          </p>
        ) : (
          Array.from(byCategory.entries()).map(
            ([category, categoryConcepts]) => (
              <section key={category} aria-label={category}>
                <h2 className="text-foreground-muted text-2xs font-medium tracking-wide uppercase">
                  {category}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {categoryConcepts.map((concept) => (
                    <li
                      key={concept.id}
                      id={concept.id}
                      className="target:ring-accent-solid target:ring-offset-background scroll-mt-8 rounded-full target:ring-2 target:ring-offset-2"
                    >
                      <ConceptLabel domain={domain}>
                        {concept.title}
                      </ConceptLabel>
                    </li>
                  ))}
                </ul>
              </section>
            ),
          )
        )}
      </div>

      <p className="text-foreground-muted mt-12 text-xs">
        Lessons, visualizations and playgrounds for these concepts are still
        being written.
      </p>

      <div className="mt-8">
        <LinkButton href="/" variant="ghost" leadingIcon={<ArrowLeft />}>
          Back to the field diagram
        </LinkButton>
      </div>
    </Container>
  );
}
