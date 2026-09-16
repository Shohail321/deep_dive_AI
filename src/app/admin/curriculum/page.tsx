import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui";
import { concepts } from "@/curriculum/data";
import {
  auditCurriculum,
  buildCoverageRows,
  getDomainCoverage,
  summarizeCurriculum,
} from "@/curriculum/graph";
import { CurriculumAuditor } from "./_components/CurriculumAuditor";

export const metadata: Metadata = {
  title: "Curriculum coverage auditor",
  robots: { index: false, follow: false },
};

/**
 * The curriculum registry, analysed. Every number on this page is derived
 * from `src/curriculum/graph` — the same functions `npm run audit:curriculum`
 * runs in CI — so this view and that gate can never disagree about what
 * counts as a problem.
 */
export default function CurriculumAuditorPage() {
  // src/proxy.ts is what actually blocks this route in production; this is a
  // second line of defence so the content cannot render if that ever lapses.
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const rows = buildCoverageRows(concepts);
  const domainCoverage = getDomainCoverage(rows);
  const issues = auditCurriculum(concepts);
  const summary = summarizeCurriculum(concepts);

  return (
    <Container as="main" className="py-16">
      <header className="space-y-4">
        <Badge tone="ai">Development only</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Curriculum coverage auditor
        </h1>
        <p className="text-foreground-secondary max-w-2xl text-base leading-normal">
          What the curriculum registry actually contains, what it is missing,
          and what is structurally broken — computed live from{" "}
          <code className="text-foreground font-mono text-sm">
            src/curriculum/data
          </code>
          , never hand-maintained.
        </p>
      </header>

      <div className="mt-10">
        <CurriculumAuditor
          rows={rows}
          domainCoverage={domainCoverage}
          issues={issues}
          summary={summary}
        />
      </div>
    </Container>
  );
}
