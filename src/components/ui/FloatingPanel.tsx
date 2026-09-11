import type { ReactNode } from "react";
import { cn } from "@/lib";

export type FloatingPanelPosition =
  "top-left" | "top-right" | "bottom-left" | "bottom-right";

const positionStyles: Record<FloatingPanelPosition, string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

export interface FloatingPanelProps {
  children: ReactNode;
  /** Names the panel, since it sits apart from the page's heading order. */
  label: string;
  title?: string;
  position?: FloatingPanelPosition;
  action?: ReactNode;
  className?: string;
}

/**
 * Controls layered over a visualization. Absolutely positioned, so it expects
 * a `relative` ancestor — normally InteractiveCanvas.
 */
export function FloatingPanel({
  children,
  label,
  title,
  position = "top-right",
  action,
  className,
}: FloatingPanelProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "z-floating-panel absolute w-56 max-w-[calc(100%-1.5rem)]",
        "border-border bg-surface/95 shadow-panel rounded-lg border p-3",
        positionStyles[position],
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-2 flex items-center justify-between gap-2">
          {title && (
            <h3 className="text-foreground text-xs font-semibold tracking-wide uppercase">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      <div className="text-foreground-secondary space-y-3 text-sm">
        {children}
      </div>
    </section>
  );
}
