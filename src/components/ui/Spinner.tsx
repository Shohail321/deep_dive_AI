import { cn } from "@/lib";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "border-foreground/20 border-t-foreground inline-block size-6 animate-spin rounded-full border-2",
        className,
      )}
    />
  );
}
