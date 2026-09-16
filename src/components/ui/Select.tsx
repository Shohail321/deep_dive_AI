"use client";

import { useId } from "react";
import { cn } from "@/lib";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string> {
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
  /** Shows the label above the field instead of only to screen readers. */
  showLabel?: boolean;
  className?: string;
}

/**
 * A labelled native `<select>` rather than a custom listbox: for a plain
 * "pick one of these options" control, the native element already gives
 * correct keyboard behaviour, screen-reader semantics and mobile pickers for
 * free — matching the project's rule to prefer a solved problem's existing
 * solution over reimplementing it.
 */
export function Select<T extends string>({
  label,
  value,
  onValueChange,
  options,
  disabled = false,
  showLabel = false,
  className,
}: SelectProps<T>) {
  const id = useId();

  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-foreground-secondary block text-xs font-medium",
          !showLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onValueChange(event.target.value as T)}
        className={cn(
          "focus-ring h-10 w-full rounded-md border px-3 text-sm",
          "border-border bg-surface text-foreground",
          "duration-fast ease-smooth transition-colors",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
