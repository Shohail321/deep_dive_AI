import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib";

export type CalloutTone = "info" | "success" | "warning" | "danger";

const toneStyles: Record<CalloutTone, string> = {
  info: "border-info/25 bg-info/8",
  success: "border-success/25 bg-success/8",
  warning: "border-warning/25 bg-warning/8",
  danger: "border-danger/25 bg-danger/8",
};

const iconStyles: Record<CalloutTone, string> = {
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text",
};

const icons: Record<CalloutTone, ComponentType<{ className?: string }>> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
};

const toneLabels: Record<CalloutTone, string> = {
  info: "Note",
  success: "Success",
  warning: "Warning",
  danger: "Caution",
};

export interface InfoCalloutProps {
  children: ReactNode;
  tone?: CalloutTone;
  title?: string;
  className?: string;
}

/**
 * Static in-page aside. The tone is announced as text as well as colour, so
 * the distinction survives for screen readers and colour-blind readers.
 */
export function InfoCallout({
  children,
  tone = "info",
  title,
  className,
}: InfoCalloutProps) {
  const Icon = icons[tone];

  return (
    <aside
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm",
        toneStyles[tone],
        className,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", iconStyles[tone])} />
      <div className="space-y-1">
        <p className={cn("font-medium", iconStyles[tone])}>
          {title ?? toneLabels[tone]}
          {title && <span className="sr-only"> ({toneLabels[tone]})</span>}
        </p>
        <div className="text-foreground-secondary leading-normal">
          {children}
        </div>
      </div>
    </aside>
  );
}
