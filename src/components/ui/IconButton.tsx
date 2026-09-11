"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib";
import {
  iconButtonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Required: an icon-only control has no visible text to name it. */
  label: string;
  icon: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function IconButton({
  label,
  icon,
  variant = "ghost",
  size = "md",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(iconButtonStyles({ variant, size }), className)}
      {...props}
    >
      <span aria-hidden className="[&>svg]:size-4">
        {icon}
      </span>
    </button>
  );
}
