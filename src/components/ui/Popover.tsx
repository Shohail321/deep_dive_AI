"use client";

import { Popover as RadixPopover } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  /** Names the popover for screen readers, since its content is arbitrary. */
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Tap-reachable counterpart to Tooltip: use this whenever the supplementary
 * content must be available on touch devices, or is longer than a phrase.
 */
export function Popover({
  trigger,
  children,
  label,
  side = "bottom",
  align = "center",
  open,
  onOpenChange,
  className,
}: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          aria-label={label}
          side={side}
          align={align}
          sideOffset={8}
          collisionPadding={12}
          className={cn(
            "z-popover w-72 rounded-lg border p-4 text-sm",
            "border-border bg-surface-raised text-foreground-secondary shadow-panel",
            "focus-ring",
            "data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out",
            className,
          )}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
