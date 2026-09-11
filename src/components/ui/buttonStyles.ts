import { cn } from "@/lib";

export type ButtonVariant =
  "primary" | "accent" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap " +
  "transition-colors duration-fast ease-smooth focus-ring touch-manipulation " +
  "disabled:pointer-events-none disabled:opacity-40 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80",
  accent:
    "bg-accent-solid text-background hover:bg-accent-solid/90 active:bg-accent-solid/80",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-raised",
  ghost:
    "text-foreground-secondary hover:bg-foreground/5 hover:text-foreground",
  danger:
    "border border-danger/30 bg-danger/10 text-danger-text hover:bg-danger/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export function buttonStyles({
  variant = "secondary",
  size = "md",
  fullWidth = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
} = {}): string {
  return cn(
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
  );
}

export function iconButtonStyles({
  variant = "ghost",
  size = "md",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}): string {
  return cn(base, variantStyles[variant], iconSizeStyles[size], "px-0");
}
