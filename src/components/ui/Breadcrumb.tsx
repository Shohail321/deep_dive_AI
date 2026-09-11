import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  /** Ordered from root to current page. The last item is treated as current. */
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  aria-hidden
                  className="text-foreground-muted size-3.5 shrink-0"
                />
              )}
              {isCurrent || !item.href ? (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    isCurrent ? "text-foreground" : "text-foreground-muted",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "focus-ring text-foreground-muted hover:text-foreground rounded-xs",
                    "duration-fast ease-smooth transition-colors",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
