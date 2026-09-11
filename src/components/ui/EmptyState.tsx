import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** Decorative icon — hidden from assistive technology. */
  icon?: ReactNode;
  /** Slot for a Button or LinkButton, so this stays a server component. */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border flex flex-col items-center gap-3 rounded-lg border border-dashed",
        "px-6 py-12 text-center",
        className,
      )}
    >
      {icon && (
        <span aria-hidden className="text-foreground-muted [&>svg]:size-6">
          {icon}
        </span>
      )}
      <div className="space-y-1">
        <p className="text-foreground text-sm font-medium">{title}</p>
        {description && (
          <p className="text-foreground-muted mx-auto max-w-sm text-sm leading-normal">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
