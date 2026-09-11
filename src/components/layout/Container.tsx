import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Constrains content to the app's reading/content width with consistent
 * side gutters. The single place page layouts should reach for instead of
 * repeating max-width/padding utilities per route.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full max-w-5xl px-6", className)}
      {...props}
    />
  );
}
