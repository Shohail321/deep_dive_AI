"use client";

import { Tabs as RadixTabs } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Names the tab list for screen readers. */
  label: string;
  className?: string;
}

/**
 * Radix supplies roving-tabindex keyboard navigation: Arrow keys move between
 * tabs, Home/End jump to the ends, and Tab moves on to the panel.
 */
export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  label,
  className,
}: TabsProps) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      aria-label={label}
      className={cn("w-full", className)}
    >
      {children}
    </RadixTabs.Root>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixTabs.List
      className={cn("border-border flex gap-1 border-b", className)}
    >
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({
  value,
  children,
  disabled,
  className,
}: {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <RadixTabs.Trigger
      value={value}
      disabled={disabled}
      className={cn(
        "focus-ring relative -mb-px px-3 py-2 text-sm font-medium",
        "text-foreground-muted hover:text-foreground-secondary",
        "duration-fast ease-smooth transition-colors",
        "disabled:pointer-events-none disabled:opacity-40",
        "data-[state=active]:text-foreground",
        "data-[state=active]:after:bg-accent-solid data-[state=active]:after:absolute",
        "data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-px",
        className,
      )}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixTabs.Content
      value={value}
      className={cn("focus-ring pt-4 text-sm", className)}
    >
      {children}
    </RadixTabs.Content>
  );
}
