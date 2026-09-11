"use client";

import { ArrowRight, Plus, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Button,
  IconButton,
  LinkButton,
  SearchInput,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
} from "@/components/ui";
import { DsExample, DsSection } from "../_components/Showcase";

export function ControlsSection() {
  const [learningRate, setLearningRate] = useState(0.03);
  const [epochs, setEpochs] = useState(50);
  const [showGrid, setShowGrid] = useState(true);
  const [query, setQuery] = useState("");

  return (
    <>
      <DsSection
        id="buttons"
        title="Buttons"
        description="Primary is neutral white so violet stays an identity colour rather than the colour of every action. The accent fill is deliberately lighter than the base track colour: neither near-black nor white text clears 4.5:1 on #8B5CF6."
      >
        <DsExample title="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </DsExample>

        <DsExample title="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </DsExample>

        <DsExample
          title="States"
          note="A loading button is disabled and marked aria-busy; its spinner carries the accessible name."
        >
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Training
          </Button>
        </DsExample>

        <DsExample title="With icons">
          <Button leadingIcon={<Plus />}>Add concept</Button>
          <Button variant="accent" trailingIcon={<ArrowRight />}>
            Continue
          </Button>
          <Button variant="danger" leadingIcon={<Trash2 />}>
            Delete
          </Button>
        </DsExample>

        <DsExample
          title="IconButton"
          note="The label prop is required, so an icon-only control cannot ship without an accessible name."
        >
          <IconButton label="Open settings" icon={<Settings2 />} />
          <IconButton
            label="Open settings"
            icon={<Settings2 />}
            variant="secondary"
          />
          <IconButton
            label="Delete run"
            icon={<Trash2 />}
            variant="danger"
            size="sm"
          />
          <IconButton label="Open settings" icon={<Settings2 />} disabled />
        </DsExample>

        <DsExample
          title="LinkButton"
          note="Navigation that looks like a button. Disabled renders inert text, because a link cannot be natively disabled."
        >
          <LinkButton href="/design-system">Internal route</LinkButton>
          <LinkButton href="https://nextjs.org" external variant="ghost">
            External
          </LinkButton>
          <LinkButton href="/design-system" disabled>
            Disabled
          </LinkButton>
        </DsExample>
      </DsSection>

      <DsSection
        id="inputs"
        title="Inputs"
        description="Sliders drive simulations, so keyboard parity is not optional: arrow keys step, Home and End jump to the range ends, and the readout is announced through aria-valuetext."
      >
        <DsExample title="Slider" className="flex-col items-stretch gap-6">
          <Slider
            label="Learning rate"
            value={learningRate}
            onValueChange={setLearningRate}
            min={0.001}
            max={0.5}
            step={0.001}
            formatValue={(value) => value.toFixed(3)}
            className="max-w-sm"
          />
          <Slider
            label="Epochs"
            value={epochs}
            onValueChange={setEpochs}
            min={1}
            max={200}
            className="max-w-sm"
          />
          <Slider
            label="Disabled"
            value={25}
            onValueChange={() => {}}
            disabled
            className="max-w-sm"
          />
        </DsExample>

        <DsExample title="Toggle" className="flex-col items-stretch gap-5">
          <Toggle
            label="Show grid"
            description="Overlays coordinate gridlines on the canvas."
            checked={showGrid}
            onCheckedChange={setShowGrid}
            className="max-w-sm"
          />
          <Toggle
            label="Disabled setting"
            description="Unavailable until a model is trained."
            disabled
            className="max-w-sm"
          />
        </DsExample>

        <DsExample
          title="SearchInput"
          note="Escape clears the field without closing an enclosing overlay. The clear button appears only when there is something to clear."
        >
          <SearchInput
            value={query}
            onValueChange={setQuery}
            className="w-full max-w-sm"
          />
        </DsExample>
      </DsSection>

      <DsSection
        id="tabs"
        title="Tabs"
        description="Arrow keys move between tabs, Home and End jump to the ends, and Tab moves on into the panel."
      >
        <DsExample title="Tabs" className="flex-col items-stretch">
          <Tabs defaultValue="intuition" label="Lesson stages">
            <TabsList>
              <TabsTrigger value="intuition">Intuition</TabsTrigger>
              <TabsTrigger value="maths">Mathematics</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="locked" disabled>
                Locked
              </TabsTrigger>
            </TabsList>
            <TabsContent value="intuition">
              <p className="text-foreground-secondary">
                Start from the shape of the problem before any notation appears.
              </p>
            </TabsContent>
            <TabsContent value="maths">
              <p className="text-foreground-secondary">
                Formalise the intuition once it is already believable.
              </p>
            </TabsContent>
            <TabsContent value="code">
              <p className="text-foreground-secondary">
                Then make it runnable, and let the learner change it.
              </p>
            </TabsContent>
          </Tabs>
        </DsExample>
      </DsSection>
    </>
  );
}
