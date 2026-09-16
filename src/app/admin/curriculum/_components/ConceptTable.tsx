import { Check, Minus } from "lucide-react";
import { Badge, EmptyState } from "@/components/ui";
import type { ConceptCoverageRow, CurriculumIssue } from "@/curriculum/graph";
import { DOMAIN_META } from "@/curriculum/metadata";
import { cn } from "@/lib";

/**
 * Short display labels for the results table only. `formatIssue` (used in
 * the warnings panel and the CLI) stays the single-line, unambiguous form —
 * this is purely a compact rendering of the same data.
 */
function issueLabel(issue: CurriculumIssue): string {
  switch (issue.type) {
    case "orphan-concept":
      return "orphan";
    case "unreachable-concept":
      return "unreachable";
    case "unknown-reference":
      return "bad reference";
    case "self-reference":
      return "self-reference";
    case "cycle":
      return "cycle";
    case "duplicate-id":
      return "duplicate id";
    case "duplicate-slug":
      return "duplicate slug";
    case "incomplete-metadata":
      return "incomplete";
    case "invalid-concept":
    case "missing-domain":
      return "invalid";
  }
}

function ContentFlag({ has, label }: { has: boolean; label: string }) {
  return (
    <span className="inline-flex items-center justify-center">
      {has ? (
        <Check aria-hidden className="text-success-text size-4" />
      ) : (
        <Minus aria-hidden className="text-foreground-muted size-4" />
      )}
      <span className="sr-only">
        {label}: {has ? "present" : "missing"}
      </span>
    </span>
  );
}

export function ConceptTable({ rows }: { rows: ConceptCoverageRow[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title="No concepts match these filters"
        description="Try widening a filter or clearing the search."
      />
    );
  }

  return (
    <div
      className="border-border relative overflow-x-auto rounded-lg border"
      tabIndex={0}
      role="region"
      aria-label="Concept results, scrollable horizontally"
    >
      <table className="w-full text-left text-sm">
        <caption className="sr-only">
          {rows.length} concepts matching the current filters
        </caption>
        <thead>
          <tr className="border-border bg-surface-raised/60 border-b text-xs">
            <th scope="col" className="px-4 py-2 font-medium">
              Concept
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Domain
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Category
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Difficulty
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Status
            </th>
            <th scope="col" className="px-2 py-2 text-center font-medium">
              Lesson
            </th>
            <th scope="col" className="px-2 py-2 text-center font-medium">
              Viz
            </th>
            <th scope="col" className="px-2 py-2 text-center font-medium">
              Quiz
            </th>
            <th scope="col" className="px-2 py-2 text-center font-medium">
              Playground
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Prereqs
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Warnings
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {rows.map((row) => (
            <tr
              key={row.id}
              className={cn(
                (row.isOrphan || row.isUnreachable || row.issues.length > 0) &&
                  "bg-danger/[0.03]",
              )}
            >
              <th scope="row" className="px-4 py-2 font-normal">
                <div className="text-foreground font-medium">{row.title}</div>
                <div className="text-foreground-muted font-mono text-xs">
                  {row.id}
                </div>
              </th>
              <td className="text-foreground-secondary px-3 py-2">
                {DOMAIN_META[row.domain].shortLabel}
              </td>
              <td className="text-foreground-secondary px-3 py-2">
                {row.category}
              </td>
              <td className="text-foreground-secondary px-3 py-2">
                {row.difficulty}
              </td>
              <td className="text-foreground-secondary px-3 py-2">
                {row.status}
              </td>
              <td className="px-2 py-2 text-center">
                <ContentFlag has={row.hasLesson} label="Lesson" />
              </td>
              <td className="px-2 py-2 text-center">
                <ContentFlag has={row.hasVisualization} label="Visualization" />
              </td>
              <td className="px-2 py-2 text-center">
                <ContentFlag has={row.hasQuiz} label="Quiz" />
              </td>
              <td className="px-2 py-2 text-center">
                <ContentFlag has={row.hasPlayground} label="Playground" />
              </td>
              <td className="text-foreground-secondary px-3 py-2">
                {row.hasPrerequisites ? "yes" : "none"}
              </td>
              <td className="px-3 py-2">
                {row.issues.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {row.issues.map((issue, index) => (
                      <Badge key={index} tone="danger">
                        {issueLabel(issue)}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-foreground-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
