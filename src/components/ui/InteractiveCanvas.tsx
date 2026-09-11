"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib";

export interface InteractiveCanvasProps {
  /** Names the visualization for landmark navigation and screen readers. */
  label: string;
  children: ReactNode;
  /**
   * How to operate the visualization with a keyboard. Announced on focus —
   * omit only for a purely static diagram.
   */
  keyboardHint?: string;
  /** Plain-language summary of what the visualization shows, for anyone who cannot see it. */
  description?: string;
  toolbar?: ReactNode;
  caption?: ReactNode;
  aspectRatio?: string;
  className?: string;
}

/**
 * Shell every visualization and playground renders into: a labelled region,
 * a fixed aspect box that reserves layout space before the chart mounts, and
 * slots for a toolbar and floating panels (which position against it).
 *
 * It deliberately owns no rendering logic — D3, React Flow, or canvas code
 * lives in `src/visualizations`, and simulation maths in `src/simulations`.
 */
export function InteractiveCanvas({
  label,
  children,
  keyboardHint,
  description,
  toolbar,
  caption,
  aspectRatio = "16 / 9",
  className,
}: InteractiveCanvasProps) {
  const descriptionId = useId();
  const hasDetails = Boolean(description || keyboardHint);

  return (
    <figure className={cn("space-y-2", className)}>
      <section
        aria-label={label}
        aria-describedby={hasDetails ? descriptionId : undefined}
        className={cn(
          "border-border bg-surface relative overflow-hidden rounded-xl border",
        )}
      >
        {hasDetails && (
          <p id={descriptionId} className="sr-only">
            {[description, keyboardHint].filter(Boolean).join(" ")}
          </p>
        )}
        {toolbar && (
          <div className="border-border bg-surface-raised/60 flex flex-wrap items-center gap-2 border-b px-3 py-2">
            {toolbar}
          </div>
        )}
        <div style={{ aspectRatio }} className="w-full">
          {children}
        </div>
      </section>
      {caption && (
        <figcaption className="text-foreground-muted text-xs leading-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
