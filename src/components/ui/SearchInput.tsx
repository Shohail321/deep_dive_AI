"use client";

import { Search, X } from "lucide-react";
import { useId, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib";
import { IconButton } from "./IconButton";

export interface SearchInputProps {
  label?: string;
  placeholder?: string;
  /** Controlled value. Omit to let the input manage its own state. */
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  /** Shows the label above the field instead of only to screen readers. */
  showLabel?: boolean;
  className?: string;
}

export function SearchInput({
  label = "Search",
  placeholder = "Search concepts",
  value,
  onValueChange,
  disabled = false,
  showLabel = false,
  className,
}: SearchInputProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState("");
  const currentValue = value ?? internalValue;

  function commit(next: string) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    commit(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && currentValue) {
      // Clear before the key can bubble up and close an enclosing overlay.
      event.stopPropagation();
      commit("");
    }
  }

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
      <div
        className={cn(
          "group relative flex items-center rounded-md border",
          "border-border bg-surface",
          "focus-within:border-border-strong",
          "duration-fast ease-smooth transition-colors",
          disabled && "pointer-events-none opacity-40",
        )}
      >
        <Search
          aria-hidden
          className="text-foreground-muted pointer-events-none absolute left-3 size-4"
        />
        <input
          id={id}
          type="search"
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "focus-ring h-10 w-full rounded-md bg-transparent pr-10 pl-9 text-sm",
            "text-foreground placeholder:text-foreground-muted",
            // The native clear affordance duplicates the button below.
            "[&::-webkit-search-cancel-button]:appearance-none",
          )}
        />
        {currentValue && (
          <IconButton
            label={`Clear ${label.toLowerCase()}`}
            icon={<X />}
            size="sm"
            onClick={() => commit("")}
            className="absolute right-1"
          />
        )}
      </div>
    </div>
  );
}
