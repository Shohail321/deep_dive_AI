"use client";

import { ChevronRight } from "lucide-react";
import type { Concept, ConceptId } from "@/curriculum/metadata";
import { cn } from "@/lib";

export interface WhereAmIProps {
  /** Root first, selected concept last — `getAncestorPath`'s own order. */
  path: Concept[];
  onNavigate: (id: ConceptId) => void;
  className?: string;
}

/**
 * Answers "where does this concept fit in AI?" as a literal trail —
 * Artificial Intelligence → Machine Learning → Supervised Learning →
 * Regression → Linear Regression — reusing `getAncestorPath`'s own
 * root-to-target order so this can never disagree with the map about a
 * concept's place in the curriculum.
 *
 * Visually a breadcrumb, but not built on the shared `Breadcrumb` component:
 * every step but the last re-focuses that ancestor inside the map rather
 * than navigating to a route, which is a different contract than
 * `Breadcrumb`'s `href`-only one.
 */
export function WhereAmI({ path, onNavigate, className }: WhereAmIProps) {
  if (path.length === 0) return null;

  return (
    <nav aria-label="Where this concept fits in AI" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
        {path.map((concept, index) => {
          const isCurrent = index === path.length - 1;

          return (
            <li key={concept.id} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  aria-hidden
                  className="text-foreground-muted size-3.5 shrink-0"
                />
              )}
              {isCurrent ? (
                <span aria-current="page" className="text-foreground">
                  {concept.title}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(concept.id)}
                  className={cn(
                    "focus-ring text-foreground-muted hover:text-foreground rounded-xs",
                    "duration-fast ease-smooth transition-colors",
                  )}
                >
                  {concept.title}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
