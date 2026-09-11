import { cn } from "@/lib";

export function Spinner({
  className,
  label = "Loading",
}: {
  className?: string;
  /** Accessible name. Pass an empty string when an ancestor already announces the busy state. */
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn(
        "border-foreground/20 border-t-foreground inline-block size-6 animate-spin rounded-full border-2",
        className,
      )}
    />
  );
}
