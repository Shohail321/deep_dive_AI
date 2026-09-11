import { cn } from "@/lib";

export type SkeletonShape = "text" | "block" | "circle";

const shapeStyles: Record<SkeletonShape, string> = {
  text: "h-4 rounded-xs",
  block: "h-24 rounded-lg",
  circle: "aspect-square rounded-full",
};

export interface SkeletonProps {
  shape?: SkeletonShape;
  className?: string;
}

/**
 * Purely decorative: hidden from assistive technology, which should hear the
 * enclosing region's `aria-busy` instead of a pile of empty boxes.
 */
export function Skeleton({ shape = "text", className }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-surface-raised block w-full",
        "bg-[linear-gradient(90deg,var(--color-surface-raised)_25%,var(--color-graph-node-hover)_50%,var(--color-surface-raised)_75%)]",
        "bg-[length:200%_100%]",
        "animate-shimmer motion-reduce:animate-none",
        shapeStyles[shape],
        className,
      )}
    />
  );
}
