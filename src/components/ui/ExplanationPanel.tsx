import type { ReactNode } from "react";
import type { Domain } from "@/curriculum/metadata";
import { cn } from "@/lib";

const domainAccent: Record<Domain, string> = {
  ai: "before:bg-ai",
  ml: "before:bg-ml",
  dl: "before:bg-dl",
  // Neighbouring tracks keep the default rule rather than inventing a hue.
  math: "before:bg-border-strong",
  data: "before:bg-border-strong",
  genai: "before:bg-border-strong",
  responsible: "before:bg-border-strong",
  mlops: "before:bg-border-strong",
  research: "before:bg-border-strong",
};

export interface ExplanationPanelProps {
  title: string;
  children: ReactNode;
  /** Tints the edge rule to match the concept's domain. */
  domain?: Domain;
  eyebrow?: string;
  footer?: ReactNode;
  className?: string;
}

/**
 * The prose half of an explore-and-read pairing: narrative sitting beside a
 * visualization. A labelled section, so it is reachable by landmark
 * navigation without being another card.
 */
export function ExplanationPanel({
  title,
  children,
  domain,
  eyebrow,
  footer,
  className,
}: ExplanationPanelProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "relative pl-5",
        "before:absolute before:inset-y-0 before:left-0 before:w-px before:rounded-full",
        domain ? domainAccent[domain] : "before:bg-border-strong",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-foreground-muted text-2xs mb-1 font-medium tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-foreground text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="text-foreground-secondary mt-2 space-y-3 text-sm leading-relaxed">
        {children}
      </div>
      {footer && <div className="mt-4">{footer}</div>}
    </section>
  );
}
