"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib";
import { Spinner } from "./Spinner";
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Disables the button and announces a busy state while work is in flight. */
  loading?: boolean;
  loadingLabel?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  fullWidth = false,
  loading = false,
  loadingLabel = "Loading",
  leadingIcon,
  trailingIcon,
  disabled = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? (
        <Spinner className="size-4 border" label={loadingLabel} />
      ) : (
        leadingIcon && (
          <span aria-hidden className="[&>svg]:size-4">
            {leadingIcon}
          </span>
        )
      )}
      {children}
      {!loading && trailingIcon && (
        <span aria-hidden className="[&>svg]:size-4">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
