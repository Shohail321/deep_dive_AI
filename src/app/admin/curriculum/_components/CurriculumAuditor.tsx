"use client";

import { useMemo, useState } from "react";
import {
  filterCoverageRows,
  getCategoriesByDomain,
  type ConceptCoverageRow,
  type CurriculumIssue,
  type CurriculumSummary,
  type DomainCoverage,
} from "@/curriculum/graph";
import { domainSchema } from "@/curriculum/metadata";
import { ConceptTable } from "./ConceptTable";
import { DomainCoverageTable } from "./DomainCoverageTable";
import {
  EMPTY_FILTER_STATE,
  FiltersBar,
  toCoverageFilter,
  type FilterState,
} from "./FiltersBar";
import { WarningsPanel } from "./WarningsPanel";

export interface CurriculumAuditorProps {
  rows: ConceptCoverageRow[];
  domainCoverage: DomainCoverage[];
  issues: CurriculumIssue[];
  summary: CurriculumSummary;
}

/**
 * Owns filter state and derives the visible rows from it. The reporting
 * functions themselves (`filterCoverageRows`, `getCategoriesByDomain`, …)
 * live in `src/curriculum/graph` precisely so this component has no logic
 * of its own to get wrong — it only wires state to already-tested functions.
 */
export function CurriculumAuditor({
  rows,
  domainCoverage,
  issues,
  summary,
}: CurriculumAuditorProps) {
  const [filter, setFilter] = useState<FilterState>(EMPTY_FILTER_STATE);

  const categoriesByDomain = useMemo(() => getCategoriesByDomain(rows), [rows]);

  const categoriesForDomain = useMemo(() => {
    if (filter.domain !== "all") {
      return categoriesByDomain.get(filter.domain) ?? [];
    }
    const all = new Set<string>();
    for (const categories of categoriesByDomain.values()) {
      for (const category of categories) all.add(category);
    }
    return Array.from(all).sort();
  }, [categoriesByDomain, filter.domain]);

  const filteredRows = useMemo(
    () => filterCoverageRows(rows, toCoverageFilter(filter)),
    [rows, filter],
  );

  return (
    <div className="space-y-10">
      <section aria-label="Summary">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="border-border rounded-lg border p-4">
            <dt className="text-foreground-muted text-xs">Total concepts</dt>
            <dd className="text-2xl font-semibold tabular-nums">
              {summary.total}
            </dd>
          </div>
          <div className="border-border rounded-lg border p-4">
            <dt className="text-foreground-muted text-xs">Domains</dt>
            <dd className="text-2xl font-semibold tabular-nums">
              {Object.keys(summary.byDomain).length} of{" "}
              {domainSchema.options.length}
            </dd>
          </div>
          <div className="border-border rounded-lg border p-4">
            <dt className="text-foreground-muted text-xs">Structural errors</dt>
            <dd className="text-2xl font-semibold tabular-nums">
              {issues.filter((issue) => issue.severity === "error").length}
            </dd>
          </div>
          <div className="border-border rounded-lg border p-4">
            <dt className="text-foreground-muted text-xs">
              Concepts without a lesson
            </dt>
            <dd className="text-2xl font-semibold tabular-nums">
              {summary.withoutLessonCount} / {summary.total}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-label="Structural warnings">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">
          Structural checks
        </h2>
        <WarningsPanel rows={rows} issues={issues} />
      </section>

      <section aria-label="Coverage by domain">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">
          Coverage by domain
        </h2>
        <DomainCoverageTable coverage={domainCoverage} />
      </section>

      <section aria-label="Browse concepts">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">
          Browse concepts
        </h2>
        <div className="space-y-4">
          <FiltersBar
            state={filter}
            onChange={setFilter}
            domains={domainCoverage.map((d) => d.domain)}
            categoriesForDomain={categoriesForDomain}
          />
          <p role="status" className="text-foreground-muted text-sm">
            {filteredRows.length} of {rows.length} concepts match
          </p>
          <ConceptTable rows={filteredRows} />
        </div>
      </section>
    </div>
  );
}
