"use client";

import { Switch } from "radix-ui";
import { useId } from "react";
import { cn } from "@/lib";

export interface ToggleProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  /** Hides the visible label but keeps it as the accessible name. */
  hideLabel?: boolean;
  className?: string;
}

/** Binary setting with immediate effect — rendered as role="switch", not a checkbox. */
export function Toggle({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  description,
  disabled = false,
  hideLabel = false,
  className,
}: ToggleProps) {
  const id = useId();
  const descriptionId = `${id}-description`;

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className={cn("space-y-0.5", hideLabel && "sr-only")}>
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            disabled ? "text-foreground-muted" : "text-foreground",
          )}
        >
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-foreground-muted text-xs">
            {description}
          </p>
        )}
      </div>
      <Switch.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "focus-ring relative h-6 w-11 shrink-0 rounded-full",
          "border-border bg-surface-raised border",
          "duration-fast ease-smooth touch-manipulation transition-colors",
          "data-[state=checked]:bg-accent-solid data-[state=checked]:border-transparent",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        <Switch.Thumb
          className={cn(
            "block size-4 translate-x-1 rounded-full",
            "bg-foreground-secondary",
            "duration-fast ease-smooth transition-transform",
            "data-[state=checked]:bg-background data-[state=checked]:translate-x-6",
          )}
        />
      </Switch.Root>
    </div>
  );
}
