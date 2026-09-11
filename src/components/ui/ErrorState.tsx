import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface ErrorStateProps {
  title: string;
  description?: string;
  /** Slot for a retry Button, so this stays a server component. */
  action?: ReactNode;
  /** Announces the error when it appears after the page has loaded. */
  live?: boolean;
  className?: string;
}

export function ErrorState({
  title,
  description,
  action,
  live = true,
  className,
}: ErrorStateProps) {
  return (
    <div
      role={live ? "alert" : undefined}
      className={cn(
        "border-danger/25 bg-danger/8 flex flex-col items-center gap-3 rounded-lg border",
        "px-6 py-12 text-center",
        className,
      )}
    >
      <TriangleAlert aria-hidden className="text-danger-text size-6" />
      <div className="space-y-1">
        <p className="text-foreground text-sm font-medium">{title}</p>
        {description && (
          <p className="text-foreground-secondary mx-auto max-w-sm text-sm leading-normal">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
