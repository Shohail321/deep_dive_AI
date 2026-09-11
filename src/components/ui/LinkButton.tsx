import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib";
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

export interface LinkButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Opens in a new tab and appends a screen-reader-only destination hint. */
  external?: boolean;
  /** Renders inert, non-focusable text — a link cannot be natively disabled. */
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function LinkButton({
  href,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  external = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const styles = cn(buttonStyles({ variant, size, fullWidth }), className);
  const content = (
    <>
      {leadingIcon && (
        <span aria-hidden className="[&>svg]:size-4">
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon && (
        <span aria-hidden className="[&>svg]:size-4">
          {trailingIcon}
        </span>
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );

  if (disabled) {
    return (
      <span aria-disabled="true" className={styles}>
        {content}
      </span>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={styles} {...props}>
      {content}
    </Link>
  );
}
