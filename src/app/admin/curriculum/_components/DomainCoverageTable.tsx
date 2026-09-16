import { Badge, type BadgeTone } from "@/components/ui";
import type { DomainCoverage } from "@/curriculum/graph";
import { DOMAIN_META } from "@/curriculum/metadata";

function toneForPercent(percent: number): BadgeTone {
  if (percent === 0) return "neutral";
  if (percent < 50) return "warning";
  return "success";
}

function PercentCell({ percent }: { percent: number }) {
  return <Badge tone={toneForPercent(percent)}>{percent}%</Badge>;
}

export function DomainCoverageTable({
  coverage,
}: {
  coverage: DomainCoverage[];
}) {
  return (
    <div
      className="relative overflow-x-auto"
      tabIndex={0}
      role="region"
      aria-label="Coverage by domain, scrollable horizontally"
    >
      <table className="w-full text-left text-sm">
        <caption className="sr-only">
          Content coverage percentage by domain
        </caption>
        <thead>
          <tr className="border-border border-b text-xs">
            <th scope="col" className="py-2 pr-4 font-medium">
              Domain
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              Concepts
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              Lesson
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              Visualization
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              Quiz
            </th>
            <th scope="col" className="py-2 pl-4 text-right font-medium">
              Playground
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {coverage.map((row) => (
            <tr key={row.domain}>
              <th scope="row" className="py-2 pr-4 font-normal">
                {DOMAIN_META[row.domain].label}
              </th>
              <td className="text-foreground-secondary px-4 py-2 text-right font-mono">
                {row.total}
              </td>
              <td className="px-4 py-2 text-right">
                <PercentCell percent={row.lessonPercent} />
              </td>
              <td className="px-4 py-2 text-right">
                <PercentCell percent={row.visualizationPercent} />
              </td>
              <td className="px-4 py-2 text-right">
                <PercentCell percent={row.quizPercent} />
              </td>
              <td className="py-2 pr-2 pl-4 text-right">
                <PercentCell percent={row.playgroundPercent} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
