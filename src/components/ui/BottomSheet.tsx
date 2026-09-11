"use client";

import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib";
import { OverlayCloseButton, OverlayScrim } from "./overlayParts";

export interface BottomSheetProps {
  title: string;
  children: ReactNode;
  description?: string;
  trigger?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * The touch-first counterpart to Drawer: anchored to the bottom edge, within
 * thumb reach, and capped so the scrim stays tappable to dismiss.
 */
export function BottomSheet({
  title,
  children,
  description,
  trigger,
  footer,
  open,
  onOpenChange,
  className,
}: BottomSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <OverlayScrim className="z-drawer" />
        <Dialog.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(
            "z-drawer fixed inset-x-0 bottom-0 flex max-h-[85vh] flex-col",
            "border-border bg-surface shadow-overlay rounded-t-2xl border-t",
            "focus:outline-none",
            "data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom",
            className,
          )}
        >
          <div className="flex justify-center pt-3 pb-1">
            <span
              aria-hidden
              className="bg-border-strong h-1 w-9 rounded-full"
            />
          </div>
          <div className="flex items-start justify-between gap-4 px-5 pb-4">
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
          <div className="text-foreground-secondary flex-1 overflow-y-auto px-5 pb-5 text-sm">
            {children}
          </div>
          {footer && (
            <div className="border-border flex flex-wrap justify-end gap-2 border-t p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
