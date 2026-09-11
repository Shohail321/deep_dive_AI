import type { ReactNode } from "react";
import { cn } from "@/lib";

export function DsSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className="border-border scroll-mt-8 border-t pt-10"
    >
      <h2 className="text-foreground text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-foreground-secondary mt-1 max-w-2xl text-sm leading-normal">
          {description}
        </p>
      )}
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  );
}

export function DsExample({
  title,
  note,
  children,
  className,
}: {
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <h3 className="text-foreground-secondary text-2xs font-medium tracking-wide uppercase">
          {title}
        </h3>
        {note && (
          <p className="text-foreground-muted max-w-2xl text-xs leading-normal">
            {note}
          </p>
        )}
      </div>
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {children}
      </div>
    </div>
  );
}

export function DsSwatch({
  token,
  note,
  border = false,
}: {
  token: string;
  note?: string;
  border?: boolean;
}) {
  return (
    <div className="w-40 space-y-1.5">
      <div
        className={cn(
          "h-12 w-full rounded-md",
          border && "border-border-strong border",
        )}
        style={{ background: `var(${token})` }}
      />
      <div>
        <p className="text-foreground font-mono text-[0.6875rem]">{token}</p>
        {note && <p className="text-foreground-muted text-xs">{note}</p>}
      </div>
    </div>
  );
}

export function DsSpec({ items }: { items: [string, string][] }) {
  return (
    <dl className="border-border divide-border w-full divide-y overflow-hidden rounded-lg border text-sm">
      {items.map(([term, value]) => (
        <div key={term} className="flex flex-wrap gap-x-6 gap-y-1 px-4 py-2.5">
          <dt className="text-foreground w-56 shrink-0 font-mono text-xs">
            {term}
          </dt>
          <dd className="text-foreground-secondary text-xs">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
