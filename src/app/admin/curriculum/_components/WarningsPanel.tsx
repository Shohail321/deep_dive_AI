import { InfoCallout } from "@/components/ui";
import type { ConceptCoverageRow, CurriculumIssue } from "@/curriculum/graph";
import { formatIssue, rowsWithoutPrerequisites } from "@/curriculum/graph";

export interface WarningsPanelProps {
  rows: ConceptCoverageRow[];
  issues: CurriculumIssue[];
}

/**
 * Structural problems are shown, never swallowed — an empty registry and a
 * registry with a cycle in it should never look the same at a glance.
 */
export function WarningsPanel({ rows, issues }: WarningsPanelProps) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const withoutPrerequisites = rowsWithoutPrerequisites(rows);

  if (errors.length === 0 && warnings.length === 0) {
    return (
      <InfoCallout tone="success" title="No structural errors or warnings">
        Every reference resolves, the prerequisite and parent graphs are
        acyclic, and every concept is reachable.
      </InfoCallout>
    );
  }

  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <InfoCallout
          tone="danger"
          title={`${errors.length} structural error${errors.length === 1 ? "" : "s"}`}
        >
          <p className="mb-2">
            These fail{" "}
            <code className="font-mono text-xs">npm run audit:curriculum</code>{" "}
            and CI. They should never reach this page.
          </p>
          <ul className="space-y-1 font-mono text-xs">
            {errors.map((issue, index) => (
              <li key={index}>{formatIssue(issue)}</li>
            ))}
          </ul>
        </InfoCallout>
      )}

      {warnings.length > 0 && (
        <InfoCallout
          tone="warning"
          title={`${warnings.length} warning${warnings.length === 1 ? "" : "s"}`}
        >
          <p className="mb-2">
            Incompleteness, not breakage — the normal state of a curriculum
            being written. These do not fail CI.
          </p>
          <ul className="space-y-1 font-mono text-xs">
            {warnings.map((issue, index) => (
              <li key={index}>{formatIssue(issue)}</li>
            ))}
          </ul>
        </InfoCallout>
      )}

      {withoutPrerequisites.length > 0 && (
        <InfoCallout
          tone="info"
          title={`${withoutPrerequisites.length} concept${withoutPrerequisites.length === 1 ? "" : "s"} with no prerequisite`}
        >
          <p className="mb-2">
            Expected for entry points into a domain — worth a glance if a
            concept here is not meant to be one.
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
            {withoutPrerequisites.map((row) => (
              <li key={row.id}>{row.id}</li>
            ))}
          </ul>
        </InfoCallout>
      )}
    </div>
  );
}
