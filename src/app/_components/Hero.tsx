"use client";

import { MotionConfig } from "motion/react";
import Link from "next/link";
import { DOMAIN_META, type Domain } from "@/curriculum/metadata";
import { cn } from "@/lib";
import {
  DomainRings,
  type DomainRing,
} from "@/visualizations/components/DomainRings";

export interface HeroDomain {
  domain: Domain;
  description: string;
}

const legendAccent: Record<Domain, string> = {
  ai: "text-ai-text",
  ml: "text-ml-text",
  dl: "text-dl-text",
  math: "",
  data: "",
  genai: "",
  responsible: "",
  mlops: "",
  research: "",
};

function domainHref(domain: Domain) {
  return `/domains/${domain}`;
}

/**
 * The rings are the picture; this list is the equivalent way to reach the
 * same three destinations without depending on hover, a mouse, or being able
 * to see the diagram at all. It is always in the document — not revealed by
 * interaction — so it is exactly as available to a keyboard or screen-reader
 * user, and on a touch device it stands in for the hover caption the rings
 * show on desktop.
 */
function DomainLegend({ domains }: { domains: HeroDomain[] }) {
  return (
    <nav aria-label="Explore each field" className="mx-auto max-w-md">
      <ol className="divide-border divide-y">
        {domains.map(({ domain, description }) => (
          <li key={domain}>
            <Link
              href={domainHref(domain)}
              className={cn(
                "focus-ring group flex items-center justify-between gap-4 rounded-md py-3",
                "duration-fast ease-smooth transition-colors",
              )}
            >
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-sm font-medium",
                    legendAccent[domain],
                  )}
                >
                  {DOMAIN_META[domain].label}
                </span>
                <span className="text-foreground-muted mt-0.5 block text-xs">
                  {description}
                </span>
              </span>
              <span
                aria-hidden
                className="text-foreground-muted group-hover:text-foreground shrink-0 text-sm transition-colors"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Hero({ domains }: { domains: HeroDomain[] }) {
  const rings: DomainRing[] = domains.map(({ domain, description }, index) => ({
    domain,
    label: DOMAIN_META[domain].label,
    description,
    href: domainHref(domain),
    containsLabel: domains[index + 1]
      ? DOMAIN_META[domains[index + 1].domain].label
      : undefined,
  }));

  return (
    /* Reduced motion is handled inside Motion rather than by branching on the
       preference here: the server cannot know the preference, so any render
       that depends on it disagrees with the client's first render and fails
       hydration. MotionConfig drops transform and layout animations for these
       users while both sides still render identical markup. */
    <MotionConfig reducedMotion="user">
      <div className="space-y-12">
        <DomainRings rings={rings} />
        <DomainLegend domains={domains} />
      </div>
    </MotionConfig>
  );
}
