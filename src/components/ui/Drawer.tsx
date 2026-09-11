"use client";

import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib";
import { OverlayCloseButton, OverlayScrim } from "./overlayParts";

export interface DrawerProps {
  title: string;
  children: ReactNode;
  description?: string;
  trigger?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right";
  className?: string;
}

/** Edge-anchored panel for secondary navigation or filters on wide screens. */
export function Drawer({
  title,
  children,
  description,
  trigger,
  footer,
  open,
  onOpenChange,
  side = "right",
  className,
}: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <OverlayScrim className="z-drawer" />
        <Dialog.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(
            "z-drawer fixed inset-y-0 flex w-[min(24rem,calc(100vw-3rem))] flex-col",
            "border-border bg-surface shadow-overlay",
            "focus:outline-none",
            side === "right"
              ? "data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right right-0 border-l"
              : "data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left left-0 border-r",
            className,
          )}
        >
          <div className="border-border flex items-start justify-between gap-4 border-b p-5">
            <div className="space-y-1">
              <Dialog.Title className="text-base font-semibold tracking-tight">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-foreground-secondary text-sm">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <OverlayCloseButton />
          </div>
          <div className="text-foreground-secondary flex-1 overflow-y-auto p-5 text-sm">
            {children}
          </div>
          {footer && (
            <div className="border-border flex flex-wrap justify-end gap-2 border-t p-5">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
