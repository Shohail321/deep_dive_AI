import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui";
import { ContentSection } from "./_sections/ContentSection";
import { ControlsSection } from "./_sections/ControlsSection";
import { OverlaysSection } from "./_sections/OverlaysSection";
import { TokensSection } from "./_sections/TokensSection";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const contents: [string, string][] = [
  ["colour", "Colour"],
  ["typography", "Typography"],
  ["spacing", "Spacing, radii and elevation"],
  ["motion", "Motion, layering and focus"],
  ["breakpoints", "Breakpoints"],
  ["buttons", "Buttons"],
  ["inputs", "Inputs"],
  ["tabs", "Tabs"],
  ["overlays", "Overlays"],
  ["labels", "Labels and status"],
  ["explanation", "Explanation surfaces"],
  ["canvas", "Interactive canvas"],
  ["feedback", "Loading, empty and error states"],
];

export default function DesignSystemPage() {
  // src/proxy.ts is what actually blocks this route in production; this is a
  // second line of defence so the content cannot render if that ever lapses.
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <Container as="main" className="py-16">
      <header className="space-y-4">
        <Badge tone="ai">Development only</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Design system</h1>
        <p className="text-foreground-secondary max-w-2xl text-base leading-normal">
          The visual foundation for Deep Dive AI: the tokens every surface draws
          from, and the components built on them. Tokens live in{" "}
          <code className="text-foreground font-mono text-sm">
            src/app/globals.css
          </code>{" "}
          as the single source of truth; components live in{" "}
          <code className="text-foreground font-mono text-sm">
            src/components/ui
          </code>
          .
        </p>
        <p className="text-foreground-muted max-w-2xl text-sm leading-normal">
          Try this page with a keyboard alone, and again with reduced motion
          enabled — both are requirements here, not enhancements.
        </p>
        <nav aria-label="Sections" className="pt-2">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {contents.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="focus-ring text-foreground-muted hover:text-foreground duration-fast ease-smooth rounded-xs text-xs transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mt-12 space-y-14">
        <TokensSection />
        <ControlsSection />
        <OverlaysSection />
        <ContentSection />
      </div>
    </Container>
  );
}
