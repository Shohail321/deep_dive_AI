import { Compass, RefreshCw } from "lucide-react";
import {
  Badge,
  Breadcrumb,
  Button,
  ConceptLabel,
  EmptyState,
  EquationContainer,
  ErrorState,
  ExplanationPanel,
  FloatingPanel,
  InfoCallout,
  InteractiveCanvas,
  ProgressIndicator,
  Skeleton,
} from "@/components/ui";
import { DsExample, DsSection } from "../_components/Showcase";

export function ContentSection() {
  return (
    <>
      <DsSection
        id="labels"
        title="Labels and status"
        description="Colour never carries meaning alone: every track, tone and state is also announced as text."
      >
        <DsExample title="Badge">
          <Badge>Neutral</Badge>
          <Badge tone="ai">AI</Badge>
          <Badge tone="ml">ML</Badge>
          <Badge tone="dl">DL</Badge>
          <Badge tone="success">Complete</Badge>
          <Badge tone="warning">Draft</Badge>
          <Badge tone="danger">Blocked</Badge>
          <Badge tone="info">New</Badge>
        </DsExample>

        <DsExample
          title="ConceptLabel"
          note="Takes the Domain and MasteryLevel unions straight from the curriculum and progress domains rather than restating them."
        >
          <ConceptLabel domain="ai">Search</ConceptLabel>
          <ConceptLabel domain="ml" mastery="familiar">
            Linear regression
          </ConceptLabel>
          <ConceptLabel domain="dl" mastery="mastered">
            Backpropagation
          </ConceptLabel>
          <ConceptLabel domain="ml" mastery="unexplored" href="/design-system">
            Decision trees
          </ConceptLabel>
        </DsExample>

        <DsExample
          title="ProgressIndicator"
          note="The state name sits in the accessible label, so the bar is not the only signal."
          className="flex-col items-stretch gap-5"
        >
          <ProgressIndicator
            value={0}
            label="Deep learning"
            className="max-w-sm"
          />
          <ProgressIndicator
            value={45}
            label="Machine learning"
            className="max-w-sm"
          />
          <ProgressIndicator
            value={100}
            label="Foundations"
            className="max-w-sm"
          />
        </DsExample>

        <DsExample title="Breadcrumb" className="flex-col items-start">
          <Breadcrumb
            items={[
              { label: "Machine Learning", href: "/design-system" },
              { label: "Supervised learning", href: "/design-system" },
              { label: "Linear regression" },
            ]}
          />
        </DsExample>
      </DsSection>

      <DsSection
        id="explanation"
        title="Explanation surfaces"
        description="The reading half of the platform. Deliberately not cards — a rule and a heading separate ideas with less furniture than a box."
      >
        <DsExample title="ExplanationPanel" className="flex-col items-stretch">
          <ExplanationPanel
            title="Why the line moves"
            eyebrow="Intuition"
            domain="ml"
            className="max-w-2xl"
          >
            <p>
              Each step nudges the line towards the points it currently misses
              by the most. Watch the slope settle once those errors balance out.
            </p>
          </ExplanationPanel>
        </DsExample>

        <DsExample
          title="InfoCallout"
          className="flex-col items-stretch gap-3"
          note="The tone is spelled out for screen readers as well as coloured."
        >
          <InfoCallout className="max-w-2xl">
            A higher learning rate is not always faster — it can overshoot the
            minimum entirely.
          </InfoCallout>
          <InfoCallout
            tone="success"
            title="Checkpoint reached"
            className="max-w-2xl"
          >
            You have seen every stage of this concept.
          </InfoCallout>
          <InfoCallout tone="warning" className="max-w-2xl">
            This approximation only holds for convex loss surfaces.
          </InfoCallout>
          <InfoCallout
            tone="danger"
            title="Common misconception"
            className="max-w-2xl"
          >
            Correlation between two variables does not establish that one causes
            the other.
          </InfoCallout>
        </DsExample>

        <DsExample
          title="EquationContainer"
          note="The description is the accessible name, not a caption: announcing rendered maths symbol by symbol is close to useless. The scroll area is focusable so a keyboard user can pan a wide equation."
          className="flex-col items-stretch"
        >
          <EquationContainer
            description="The mean squared error equals one over n times the sum of squared differences between each observed value and its prediction."
            number="1"
            caption="Mean squared error — the quantity gradient descent minimises."
            className="max-w-2xl"
          >
            MSE = (1/n) Σ (yᵢ − ŷᵢ)²
          </EquationContainer>
        </DsExample>
      </DsSection>

      <DsSection
        id="canvas"
        title="Interactive canvas"
        description="The shell every visualization and playground renders into. It owns no rendering logic — that lives in src/visualizations, with the maths in src/simulations."
      >
        <DsExample title="InteractiveCanvas" className="flex-col items-stretch">
          <InteractiveCanvas
            label="Gradient descent on a loss surface"
            description="A contour plot of a loss surface with a path descending towards the minimum."
            keyboardHint="Use arrow keys to step the optimiser, and Escape to reset."
            caption="A placeholder frame — the visualization itself lands with its playground."
            toolbar={
              <>
                <Button size="sm" variant="ghost">
                  Step
                </Button>
                <Button size="sm" variant="ghost">
                  Run
                </Button>
                <Button size="sm" variant="ghost">
                  Reset
                </Button>
              </>
            }
            className="max-w-3xl"
          >
            <div className="relative size-full">
              <div className="text-foreground-muted flex size-full items-center justify-center text-xs">
                Visualization mounts here
              </div>
              <FloatingPanel label="Canvas controls" title="Parameters">
                <p className="text-xs">
                  Floating controls layer over the canvas at z-floating-panel.
                </p>
              </FloatingPanel>
            </div>
          </InteractiveCanvas>
        </DsExample>
      </DsSection>

      <DsSection
        id="feedback"
        title="Loading, empty and error states"
        description="Skeletons are hidden from assistive technology — a screen reader should hear the region's busy state, not a pile of empty boxes."
      >
        <DsExample title="Skeleton" className="flex-col items-stretch">
          <div
            role="status"
            aria-busy
            aria-label="Loading concept"
            className="max-w-sm space-y-3"
          >
            <Skeleton shape="text" className="w-1/3" />
            <Skeleton shape="block" />
            <Skeleton shape="text" />
            <Skeleton shape="text" className="w-2/3" />
          </div>
        </DsExample>

        <DsExample title="EmptyState" className="flex-col items-stretch">
          <EmptyState
            icon={<Compass />}
            title="No concepts match that search"
            description="Try a broader term, or explore the knowledge graph to find related ideas."
            action={<Button variant="secondary">Clear filters</Button>}
            className="max-w-xl"
          />
        </DsExample>

        <DsExample
          title="ErrorState"
          note="Announced as an alert when it appears after load; pass live={false} for a state that is present from the start."
          className="flex-col items-stretch"
        >
          <ErrorState
            title="Could not load this visualization"
            description="The simulation failed to start. Your progress is unaffected."
            live={false}
            action={
              <Button variant="secondary" leadingIcon={<RefreshCw />}>
                Try again
              </Button>
            }
            className="max-w-xl"
          />
        </DsExample>
      </DsSection>
    </>
  );
}
