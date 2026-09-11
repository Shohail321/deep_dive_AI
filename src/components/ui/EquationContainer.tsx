import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface EquationContainerProps {
  children: ReactNode;
  /**
   * The equation stated in words. Rendered maths is close to unreadable when
   * announced symbol by symbol, so this is the accessible name, not a caption.
   */
  description: string;
  /** Equation number for cross-referencing from prose. */
  number?: string;
  caption?: ReactNode;
  className?: string;
}

/**
 * Holds rendered mathematics (KaTeX, once it lands). The scroll container is
 * focusable because a keyboard user must be able to pan a wide equation.
 */
export function EquationContainer({
  children,
  description,
  number,
  caption,
  className,
}: EquationContainerProps) {
  return (
    <figure
      className={cn(
        "border-border bg-surface rounded-lg border px-5 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div
          role="group"
          aria-label={description}
          tabIndex={0}
          className="focus-ring flex-1 overflow-x-auto py-1 text-center"
        >
          <span aria-hidden className="font-mono text-base">
            {children}
          </span>
        </div>
        {number && (
          <span className="text-foreground-muted shrink-0 font-mono text-xs">
            ({number})
          </span>
        )}
      </div>
      {caption && (
        <figcaption className="text-foreground-muted mt-3 text-xs leading-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
