import Link from "next/link";
import type { Domain } from "@/curriculum/metadata";
import type { MasteryLevel } from "@/progress";
import { cn } from "@/lib";

const domainStyles: Record<Domain, string> = {
  ai: "border-ai/30 bg-ai/10 text-ai-text",
  ml: "border-ml/30 bg-ml/10 text-ml-text",
  dl: "border-dl/30 bg-dl/10 text-dl-text",
};

const domainNames: Record<Domain, string> = {
  ai: "Artificial Intelligence",
  ml: "Machine Learning",
  dl: "Deep Learning",
};

const masteryStyles: Record<MasteryLevel, string> = {
  unexplored: "bg-mastery-unexplored",
  familiar: "bg-mastery-familiar",
  practiced: "bg-mastery-practiced",
  mastered: "bg-mastery-mastered",
};

export interface ConceptLabelProps {
  children: string;
  domain: Domain;
  /** Renders a mastery dot. Colour alone never carries the meaning — the level is also announced. */
  mastery?: MasteryLevel;
  href?: string;
  className?: string;
}

/**
 * A concept rendered in its domain's colour. Type-only imports of `Domain`
 * and `MasteryLevel` keep this in step with the curriculum and progress
 * domains rather than restating their vocabularies.
 */
export function ConceptLabel({
  children,
  domain,
  mastery,
  href,
  className,
}: ConceptLabelProps) {
  const content = (
    <>
      {mastery && (
        <span
          aria-hidden
          className={cn("size-1.5 rounded-full", masteryStyles[mastery])}
        />
      )}
      {children}
      <span className="sr-only">
        {` (${domainNames[domain]}${mastery ? `, ${mastery}` : ""})`}
      </span>
    </>
  );

  const styles = cn(
    "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-sm font-medium",
    domainStyles[domain],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          styles,
          "focus-ring duration-fast ease-smooth transition-colors hover:brightness-125",
        )}
      >
        {content}
      </Link>
    );
  }

  return <span className={styles}>{content}</span>;
}
