import type { Concept } from "@/curriculum/metadata";

function matches(concept: Concept, query: string): boolean {
  if (concept.title.toLowerCase().includes(query)) return true;
  if (concept.id.toLowerCase().includes(query)) return true;
  if (concept.aliases.some((alias) => alias.toLowerCase().includes(query)))
    return true;
  return concept.searchKeywords.some((keyword) =>
    keyword.toLowerCase().includes(query),
  );
}

/** A title starting with the query ranks above one that merely contains it. */
function rank(concept: Concept, query: string): number {
  return concept.title.toLowerCase().startsWith(query) ? 0 : 1;
}

/**
 * Concepts whose title, id, aliases, or search keywords contain `query`,
 * best match first. Pure and synchronous so the search field can filter on
 * every keystroke across the whole registry without debouncing — the same
 * reasoning `filterCoverageRows` documents for the same tradeoff.
 */
export function searchConcepts(
  concepts: Concept[],
  query: string,
  limit = 8,
): Concept[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return concepts
    .filter((concept) => matches(concept, normalized))
    .sort((a, b) => {
      const rankDiff = rank(a, normalized) - rank(b, normalized);
      return rankDiff !== 0 ? rankDiff : a.title.localeCompare(b.title);
    })
    .slice(0, limit);
}
