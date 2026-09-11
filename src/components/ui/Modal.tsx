"use client";

import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib";
import { OverlayCloseButton, OverlayScrim } from "./overlayParts";

export interface ModalProps {
  /** Required: an unlabelled dialog is unusable with a screen reader. */
  title: string;
  children: ReactNode;
  description?: string;
  trigger?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

/**
 * Radix Dialog supplies the parts that are easy to get wrong: focus trap,
 * focus restoration on close, Escape handling, scroll locking, and
 * aria-modal wiring.
 */
export function Modal({
  title,
  children,
  description,
  trigger,
  footer,
  open,
  onOpenChange,
  size = "md",
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <OverlayScrim className="z-modal" />
        <Dialog.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(
            "z-modal fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2",
            "border-border bg-surface shadow-overlay rounded-xl border p-6",
            "focus:outline-none",
            "data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out",
            sizeStyles[size],
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Dialog.Title className="text-lg font-semibold tracking-tight">
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
          <div className="text-foreground-secondary mt-4 text-sm">
            {children}
          </div>
          {footer && (
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
