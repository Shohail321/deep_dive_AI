import { Progress } from "radix-ui";
import type { ProgressState } from "@/progress";
import { cn } from "@/lib";

const stateStyles: Record<ProgressState, string> = {
  "not-started": "bg-state-not-started",
  "in-progress": "bg-state-in-progress",
  completed: "bg-state-completed",
};

const stateLabels: Record<ProgressState, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
};

export interface ProgressIndicatorProps {
  /** Percentage complete, 0–100. */
  value: number;
  label: string;
  /** Overrides the colour. Derived from `value` when omitted. */
  state?: ProgressState;
  showValue?: boolean;
  className?: string;
}

function deriveState(value: number): ProgressState {
  if (value <= 0) return "not-started";
  if (value >= 100) return "completed";
  return "in-progress";
}

export function ProgressIndicator({
  value,
  label,
  state,
  showValue = true,
  className,
}: ProgressIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const resolvedState = state ?? deriveState(clamped);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-4 text-xs">
        <span className="text-foreground-secondary font-medium">{label}</span>
        {showValue && (
          <span className="text-foreground-muted font-mono tabular-nums">
            {Math.round(clamped)}%
          </span>
        )}
      </div>
      <Progress.Root
        value={clamped}
        // Colour alone would not convey the state; the text sits in the label.
        aria-label={`${label}: ${stateLabels[resolvedState]}`}
        className="bg-surface-raised border-border relative h-1.5 w-full overflow-hidden rounded-full border"
      >
        <Progress.Indicator
          className={cn(
            "duration-slow ease-smooth h-full rounded-full transition-transform",
            stateStyles[resolvedState],
          )}
          style={{ transform: `translateX(-${100 - clamped}%)` }}
        />
      </Progress.Root>
    </div>
  );
}
