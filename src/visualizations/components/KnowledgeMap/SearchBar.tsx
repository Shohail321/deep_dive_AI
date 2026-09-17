"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui";
import {
  DOMAIN_META,
  type Concept,
  type ConceptId,
} from "@/curriculum/metadata";
import { cn } from "@/lib";
import { searchConcepts } from "./search";

export interface SearchBarProps {
  concepts: Concept[];
  onSelect: (id: ConceptId) => void;
  className?: string;
}

/**
 * Locates a concept by name, id, alias, or keyword. Choosing a result calls
 * `onSelect`, which the map wires to `revealAndSelect` — expanding whatever
 * ancestors are needed and focusing the result, i.e. "locate it, focus it,
 * show its branch" in one action.
 */
export function SearchBar({ concepts, onSelect, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => searchConcepts(concepts, query),
    [concepts, query],
  );

  function handleSelect(id: ConceptId) {
    onSelect(id);
    setQuery("");
  }

  return (
    <div className={cn("relative", className)}>
      <SearchInput
        label="Search concepts"
        placeholder="Search concepts…"
        value={query}
        onValueChange={setQuery}
      />

      <p role="status" className="sr-only">
        {query.trim() ? `${results.length} matching concepts` : ""}
      </p>

      {results.length > 0 && (
        <ul
          className={cn(
            "border-border bg-surface shadow-overlay absolute z-10 mt-1 w-full",
            "max-h-80 overflow-y-auto rounded-lg border py-1",
          )}
        >
          {results.map((concept) => (
            <li key={concept.id}>
              <button
                type="button"
                onClick={() => handleSelect(concept.id)}
                className={cn(
                  "hover:bg-surface-raised focus-ring flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left",
                  "duration-fast ease-smooth transition-colors",
                )}
              >
                <span className="text-foreground text-sm">{concept.title}</span>
                <span className="text-foreground-muted text-2xs">
                  {DOMAIN_META[concept.domain].label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
