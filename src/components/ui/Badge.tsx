import type { ReactNode } from "react";
import { cn } from "@/lib";

export type BadgeTone =
  "neutral" | "ai" | "ml" | "dl" | "success" | "warning" | "danger" | "info";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-raised text-foreground-secondary",
  ai: "border-ai/30 bg-ai/12 text-ai-text",
  ml: "border-ml/30 bg-ml/12 text-ml-text",
  dl: "border-dl/30 bg-dl/12 text-dl-text",
  success: "border-success/30 bg-success/12 text-success-text",
  warning: "border-warning/30 bg-warning/12 text-warning-text",
  danger: "border-danger/30 bg-danger/12 text-danger-text",
  info: "border-info/30 bg-info/12 text-info-text",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-2xs font-medium tracking-wide uppercase",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
