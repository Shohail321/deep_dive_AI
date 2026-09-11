"use client";

import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib";
import { IconButton } from "./IconButton";

/** Shared by Modal, Drawer, and BottomSheet — all three are Radix Dialogs. */
export function OverlayScrim({ className }: { className?: string }) {
  return (
    <Dialog.Overlay
      className={cn(
        "bg-scrim fixed inset-0",
        "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
        className,
      )}
    />
  );
}

export function OverlayCloseButton({ label = "Close" }: { label?: string }) {
  return (
    <Dialog.Close asChild>
      <IconButton label={label} icon={<X />} size="sm" />
    </Dialog.Close>
  );
}
