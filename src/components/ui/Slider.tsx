"use client";

import { Slider as RadixSlider } from "radix-ui";
import { cn } from "@/lib";

export interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Formats the readout and the screen-reader value, e.g. a learning rate as "0.03". */
  formatValue?: (value: number) => string;
  hideLabel?: boolean;
  className?: string;
}

/**
 * The primary control for driving simulations, so keyboard parity matters:
 * Radix maps Arrow keys to single steps and Home/End to the range ends.
 */
export function Slider({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  formatValue,
  hideLabel = false,
  className,
}: SliderProps) {
  const display = formatValue ? formatValue(value) : String(value);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "flex items-baseline justify-between gap-4",
          hideLabel && "sr-only",
        )}
      >
        <span
          className={cn(
            "text-sm font-medium",
            disabled ? "text-foreground-muted" : "text-foreground",
          )}
        >
          {label}
        </span>
        <span className="text-foreground-secondary font-mono text-xs tabular-nums">
          {display}
        </span>
      </div>
      <RadixSlider.Root
        value={[value]}
        onValueChange={([next]) => onValueChange(next)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          "relative flex h-5 w-full touch-none items-center select-none",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        )}
      >
        <RadixSlider.Track className="bg-surface-raised border-border relative h-1 w-full grow rounded-full border">
          <RadixSlider.Range className="bg-accent-solid absolute h-full rounded-full" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          aria-label={label}
          aria-valuetext={display}
          className={cn(
            "focus-ring block size-4 rounded-full",
            "bg-foreground border-background border-2",
            "duration-fast ease-smooth transition-transform hover:scale-110",
          )}
        />
      </RadixSlider.Root>
    </div>
  );
}
