"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ChevronDown, Crosshair } from "lucide-react";
import { IconButton } from "@/components/ui";
import type { Domain } from "@/curriculum/metadata";
import { cn } from "@/lib";

export interface DomainNodeData extends Record<string, unknown> {
  domain: Domain;
  label: string;
  conceptCount: number;
  expanded: boolean;
  onToggle: () => void;
  onFocus: () => void;
}

const domainAccent: Partial<Record<Domain, string>> = {
  ai: "border-ai/40 hover:border-ai/70",
  ml: "border-ml/40 hover:border-ml/70",
  dl: "border-dl/40 hover:border-dl/70",
};

const domainLabelAccent: Partial<Record<Domain, string>> = {
  ai: "text-ai-text",
  ml: "text-ml-text",
  dl: "text-dl-text",
};

/**
 * The top-level, always-visible entry point into a field. Clicking the node
 * body expands or collapses it — a domain is not a concept, so it never
 * opens the concept panel; there is nothing to inspect about it beyond
 * "what's inside".
 *
 * The toggle is a `<button>` that visually fills the card (`absolute
 * inset-0`) rather than the card itself carrying `role="button"`: axe's
 * `nested-interactive` check is right that a focusable icon button inside
 * an element the accessibility tree already exposes as a button is
 * ambiguous for assistive tech. This "stretched button" shape keeps the
 * whole card clickable while the Focus control, painted after it, remains
 * its own independent control rather than a descendant of the first.
 */
export function DomainNode({ data }: NodeProps & { data: DomainNodeData }) {
  return (
    <div
      className={cn(
        "bg-surface-raised shadow-overlay relative flex w-56 items-center gap-3 rounded-xl border-2 px-4 py-3",
        domainAccent[data.domain] ?? "border-border-strong",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        className="opacity-0"
      />

      <button
        type="button"
        aria-expanded={data.expanded}
        aria-label={`${data.expanded ? "Collapse" : "Expand"} ${data.label}`}
        onClick={data.onToggle}
        className={cn(
          "focus-ring absolute inset-0 cursor-pointer rounded-xl",
          "duration-fast ease-smooth transition-colors",
          "hover:bg-foreground/[0.03]",
        )}
      />

      <ChevronDown
        aria-hidden
        className={cn(
          "pointer-events-none size-4 shrink-0 transition-transform duration-150",
          data.expanded ? "rotate-0" : "-rotate-90",
        )}
      />

      <div className="pointer-events-none min-w-0 flex-1">
        <div
          className={cn(
            "truncate text-sm font-semibold tracking-tight",
            domainLabelAccent[data.domain] ?? "text-foreground",
          )}
        >
          {data.label}
        </div>
        <div className="text-foreground-secondary text-2xs">
          {data.conceptCount} concept{data.conceptCount === 1 ? "" : "s"}
        </div>
      </div>

      <IconButton
        label={`Focus ${data.label}`}
        icon={<Crosshair />}
        size="sm"
        onClick={data.onFocus}
        className="relative shrink-0"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        className="opacity-0"
      />
    </div>
  );
}
