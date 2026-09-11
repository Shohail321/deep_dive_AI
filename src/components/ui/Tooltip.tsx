"use client";

import { Tooltip as RadixTooltip } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface TooltipProps {
  /** Short supplementary text. Never put information here that exists nowhere else — tooltips are unreachable by touch. */
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  delayDuration = 250,
  className,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={8}
            collisionPadding={12}
            className={cn(
              "z-tooltip max-w-64 rounded-md border px-3 py-1.5 text-xs",
              "border-border-strong bg-surface-raised text-foreground shadow-panel",
              "data-[state=delayed-open]:animate-fade-in data-[state=closed]:animate-fade-out",
              className,
            )}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
