import {
  DsExample,
  DsSection,
  DsSpec,
  DsSwatch,
} from "../_components/Showcase";

const typeScale: { token: string; className: string }[] = [
  { token: "text-5xl", className: "text-5xl" },
  { token: "text-4xl", className: "text-4xl" },
  { token: "text-3xl", className: "text-3xl" },
  { token: "text-2xl", className: "text-2xl" },
  { token: "text-xl", className: "text-xl" },
  { token: "text-lg", className: "text-lg" },
  { token: "text-base", className: "text-base" },
  { token: "text-sm", className: "text-sm" },
  { token: "text-xs", className: "text-xs" },
  { token: "text-2xs", className: "text-2xs" },
];

// Written out rather than built from a template so Tailwind's scanner sees them.
const leadings: { token: string; className: string }[] = [
  { token: "leading-tight", className: "leading-tight" },
  { token: "leading-snug", className: "leading-snug" },
  { token: "leading-normal", className: "leading-normal" },
  { token: "leading-relaxed", className: "leading-relaxed" },
];

const spacingSteps = [1, 2, 3, 4, 6, 8, 12, 16, 24];
const radii = ["xs", "sm", "md", "lg", "xl", "2xl"];
const shadows = ["subtle", "raised", "panel", "overlay"];

export function TokensSection() {
  return (
    <>
      <DsSection
        id="colour"
        title="Colour"
        description="Track accents clear 3:1 against the background, so they are safe for fills, strokes and borders but not for small text. Every accent has a lighter -text variant that clears 4.5:1, and that is the only variant allowed for label or body text."
      >
        <DsExample title="Surfaces">
          <DsSwatch token="--color-background" note="Page" border />
          <DsSwatch token="--color-surface" note="Elevated" border />
          <DsSwatch token="--color-surface-raised" note="Secondary" border />
          <DsSwatch token="--color-scrim" note="Overlay scrim" border />
        </DsExample>

        <DsExample
          title="Text"
          note="Muted is #7C7C85, lightened from the specified #707077: that value measures 4.14:1 here, under the 4.5:1 normal text requires. The original is kept for non-text uses below (state and mastery dots), which only need 3:1."
        >
          <DsSwatch token="--color-foreground" note="Primary" />
          <DsSwatch token="--color-foreground-secondary" note="Secondary" />
          <DsSwatch token="--color-foreground-muted" note="Muted — 4.9:1" />
        </DsExample>

        <DsExample title="Borders">
          <DsSwatch token="--color-border" note="Subtle" border />
          <DsSwatch token="--color-border-strong" note="Stronger" border />
        </DsExample>

        <DsExample
          title="Track accents"
          note="Fills, strokes, icons and borders only."
        >
          <DsSwatch token="--color-ai" note="Artificial Intelligence" />
          <DsSwatch token="--color-ml" note="Machine Learning" />
          <DsSwatch token="--color-dl" note="Deep Learning" />
        </DsExample>

        <DsExample title="Track accents — text variants" note="Safe for text.">
          <DsSwatch token="--color-ai-text" />
          <DsSwatch token="--color-ml-text" />
          <DsSwatch token="--color-dl-text" />
        </DsExample>

        <DsExample title="Semantic">
          <DsSwatch token="--color-accent-solid" note="Primary accent fill" />
          <DsSwatch token="--color-success" />
          <DsSwatch token="--color-warning" />
          <DsSwatch token="--color-danger" />
          <DsSwatch token="--color-info" />
          <DsSwatch token="--color-focus-ring" />
        </DsExample>

        <DsExample
          title="Learning states"
          note="Violet marks active engagement rather than reusing a track colour, so progress never reads as a track label."
        >
          <DsSwatch token="--color-state-not-started" note="not-started" />
          <DsSwatch token="--color-state-in-progress" note="in-progress" />
          <DsSwatch token="--color-state-completed" note="completed" />
        </DsExample>

        <DsExample
          title="Concept mastery"
          note="A teal to emerald ramp that brightens as mastery deepens."
        >
          <DsSwatch token="--color-mastery-unexplored" note="unexplored" />
          <DsSwatch token="--color-mastery-familiar" note="familiar" />
          <DsSwatch token="--color-mastery-practiced" note="practiced" />
          <DsSwatch token="--color-mastery-mastered" note="mastered" />
        </DsExample>

        <DsExample title="Knowledge-graph states">
          <DsSwatch token="--color-graph-node" note="Node" border />
          <DsSwatch token="--color-graph-node-hover" note="Node hover" border />
          <DsSwatch token="--color-graph-node-active" note="Node active" />
          <DsSwatch token="--color-graph-node-locked" note="Locked" border />
          <DsSwatch token="--color-graph-edge" note="Edge" border />
          <DsSwatch token="--color-graph-edge-active" note="Edge active" />
          <DsSwatch token="--color-graph-edge-muted" note="Edge muted" border />
        </DsExample>
      </DsSection>

      <DsSection
        id="typography"
        title="Typography"
        description="Geist, already licensed and loaded through next/font, over a system fallback stack. Weights stop at semibold — restraint is part of the identity."
      >
        <DsExample title="Scale" className="flex-col items-start gap-4">
          {typeScale.map(({ token, className }) => (
            <div key={token} className="flex w-full items-baseline gap-6">
              <span className="text-foreground-muted w-20 shrink-0 font-mono text-xs">
                {token}
              </span>
              <span className={`${className} truncate`}>
                Gradient descent converges
              </span>
            </div>
          ))}
        </DsExample>

        <DsExample title="Weights" className="flex-col items-start gap-2">
          <p className="font-normal">Normal 400 — body copy and explanations</p>
          <p className="font-medium">Medium 500 — labels, controls, emphasis</p>
          <p className="font-semibold">Semibold 600 — headings</p>
        </DsExample>

        <DsExample title="Line heights" className="flex-col items-start gap-4">
          {leadings.map(({ token, className }) => (
            <div key={token} className="w-full max-w-xl">
              <span className="text-foreground-muted font-mono text-xs">
                {token}
              </span>
              <p className={`${className} text-sm`}>
                A neural network learns by adjusting weights so that its
                predictions drift steadily closer to the observed data.
              </p>
            </div>
          ))}
        </DsExample>
      </DsSection>

      <DsSection
        id="spacing"
        title="Spacing, radii and elevation"
        description="A 4px base unit drives the whole numeric scale. Elevation pairs a soft shadow with a hairline border rather than blur — no glassmorphism."
      >
        <DsExample title="Spacing scale" className="items-end">
          {spacingSteps.map((step) => (
            <div key={step} className="space-y-1.5 text-center">
              <div
                className="bg-accent-solid/40 border-accent-solid/60 rounded-xs border"
                style={{
                  width: `calc(var(--spacing) * ${step})`,
                  height: `calc(var(--spacing) * ${step})`,
                }}
              />
              <p className="text-foreground-muted font-mono text-[0.6875rem]">
                {step}
              </p>
            </div>
          ))}
        </DsExample>

        <DsExample title="Radii">
          {radii.map((radius) => (
            <div key={radius} className="space-y-1.5 text-center">
              <div
                className="bg-surface-raised border-border-strong size-16 border"
                style={{ borderRadius: `var(--radius-${radius})` }}
              />
              <p className="text-foreground-muted font-mono text-[0.6875rem]">
                {radius}
              </p>
            </div>
          ))}
        </DsExample>

        <DsExample title="Shadows">
          {shadows.map((shadow) => (
            <div key={shadow} className="space-y-1.5 text-center">
              <div
                className="bg-surface border-border size-20 rounded-lg border"
                style={{ boxShadow: `var(--shadow-${shadow})` }}
              />
              <p className="text-foreground-muted font-mono text-[0.6875rem]">
                {shadow}
              </p>
            </div>
          ))}
        </DsExample>
      </DsSection>

      <DsSection
        id="motion"
        title="Motion, layering and focus"
        description="Motion explains a change of state; it is never decoration. A single prefers-reduced-motion rule in globals.css collapses every duration app-wide, so no component can opt out."
      >
        <DsExample
          title="Durations and easing"
          note="Hover each tile to compare. Each uses the token named on it."
        >
          {(
            [
              ["fast", "duration-fast"],
              ["base", "duration-base"],
              ["slow", "duration-slow"],
            ] as const
          ).map(([name, durationClass]) => (
            <div
              key={name}
              className={`bg-surface-raised border-border hover:bg-accent-solid/30 flex size-24 items-center justify-center rounded-lg border text-xs transition-colors ${durationClass} ease-smooth`}
            >
              {name}
            </div>
          ))}
        </DsExample>

        <DsSpec
          items={[
            ["--duration-instant", "80ms — state flips with no travel"],
            ["--duration-fast", "140ms — hover, focus, small fades"],
            ["--duration-base", "220ms — panels and dialogs entering"],
            ["--duration-slow", "360ms — progress and value changes"],
            ["--duration-deliberate", "600ms — guided, explanatory motion"],
            ["--ease-smooth", "cubic-bezier(0.2, 0, 0, 1) — default"],
            ["--ease-entrance", "cubic-bezier(0.16, 1, 0.3, 1) — arriving"],
            ["--ease-exit", "cubic-bezier(0.4, 0, 1, 1) — leaving"],
          ]}
        />

        <DsExample
          title="Z-index conventions"
          note="Overlays render in a portal at the end of <body>, so these values — not DOM order — decide what covers what."
          className="flex-col items-stretch"
        >
          <DsSpec
            items={[
              ["--z-canvas-overlay", "10 — annotations inside a canvas"],
              ["--z-sticky", "20 — sticky headers and rails"],
              ["--z-floating-panel", "30 — controls over a visualization"],
              ["--z-drawer", "40 — drawers and bottom sheets"],
              ["--z-modal", "50 — modal dialogs"],
              ["--z-popover", "60 — popovers"],
              ["--z-tooltip", "70 — tooltips, always on top"],
            ]}
          />
        </DsExample>

        <DsExample
          title="Focus ring"
          note="One treatment everywhere, via the focus-ring utility. Tab to these — it appears for keyboard users only, never on mouse click."
        >
          <button
            type="button"
            className="focus-ring border-border bg-surface rounded-md border px-4 py-2 text-sm"
          >
            Focus me
          </button>
          <button
            type="button"
            className="focus-ring border-border bg-surface rounded-md border px-4 py-2 text-sm"
          >
            Then me
          </button>
        </DsExample>
      </DsSection>

      <DsSection
        id="breakpoints"
        title="Breakpoints"
        description="Resize the window: the live indicator below reports the active breakpoint, and every component on this page reflows at the same stops."
      >
        <DsExample title="Active breakpoint">
          <div className="border-border bg-surface rounded-md border px-4 py-2 font-mono text-sm">
            <span className="sm:hidden">base — under 40rem</span>
            <span className="hidden sm:inline md:hidden">sm — 40rem</span>
            <span className="hidden md:inline lg:hidden">md — 48rem</span>
            <span className="hidden lg:inline xl:hidden">lg — 64rem</span>
            <span className="hidden xl:inline 2xl:hidden">xl — 80rem</span>
            <span className="hidden 2xl:inline">2xl — 96rem</span>
          </div>
        </DsExample>

        <DsSpec
          items={[
            ["--breakpoint-sm", "40rem / 640px"],
            ["--breakpoint-md", "48rem / 768px"],
            ["--breakpoint-lg", "64rem / 1024px"],
            ["--breakpoint-xl", "80rem / 1280px"],
            ["--breakpoint-2xl", "96rem / 1536px"],
          ]}
        />
      </DsSection>
    </>
  );
}
