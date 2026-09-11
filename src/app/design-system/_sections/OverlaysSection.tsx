"use client";

import { Info } from "lucide-react";
import {
  BottomSheet,
  Button,
  Drawer,
  IconButton,
  Modal,
  Popover,
  Tooltip,
} from "@/components/ui";
import { DsExample, DsSection } from "../_components/Showcase";

export function OverlaysSection() {
  return (
    <DsSection
      id="overlays"
      title="Overlays"
      description="All four are Radix primitives, which supply the parts that are easy to get wrong: focus trapping, focus restoration on close, Escape handling, scroll locking and aria-modal wiring. Each animates in with a token duration and collapses to nothing under prefers-reduced-motion."
    >
      <DsExample
        title="Tooltip"
        note="Hover or focus. Tooltips are unreachable by touch, so never put information here that exists nowhere else — use a Popover when it must be tappable."
      >
        <Tooltip content="Steps the optimiser once">
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
        <Tooltip content="Adjusts how far each step moves" side="right">
          <IconButton label="About learning rate" icon={<Info />} />
        </Tooltip>
      </DsExample>

      <DsExample
        title="Popover"
        note="The tap-reachable counterpart: opens on click, traps nothing, and closes on Escape or an outside click."
      >
        <Popover
          label="About gradient descent"
          trigger={<Button variant="secondary">Open popover</Button>}
        >
          <p>
            Gradient descent walks downhill on the loss surface, one small step
            at a time, until the steps stop helping.
          </p>
        </Popover>
      </DsExample>

      <DsExample
        title="Modal"
        note="Focus moves in on open and returns to the trigger on close."
      >
        <Modal
          title="Reset this playground?"
          description="Every parameter returns to its starting value."
          trigger={<Button variant="secondary">Open modal</Button>}
          footer={
            <>
              <Button variant="ghost">Cancel</Button>
              <Button variant="danger">Reset</Button>
            </>
          }
        >
          <p>
            Nothing you have learned is lost — this only clears the current
            simulation state.
          </p>
        </Modal>
      </DsExample>

      <DsExample
        title="Drawer"
        note="Edge-anchored, for secondary navigation or filters on wide screens."
      >
        <Drawer
          title="Filter concepts"
          description="Narrow the knowledge graph."
          trigger={<Button variant="secondary">Open drawer (right)</Button>}
          footer={<Button variant="primary">Apply</Button>}
        >
          <p>Filter controls would sit here.</p>
        </Drawer>
        <Drawer
          title="Curriculum outline"
          side="left"
          trigger={<Button variant="ghost">Open drawer (left)</Button>}
        >
          <p>An outline of the current track would sit here.</p>
        </Drawer>
      </DsExample>

      <DsExample
        title="BottomSheet"
        note="The touch-first counterpart to Drawer: within thumb reach, capped so the scrim stays tappable to dismiss, and padded for the home indicator."
      >
        <BottomSheet
          title="Concept details"
          description="Linear regression"
          trigger={<Button variant="secondary">Open bottom sheet</Button>}
          footer={<Button variant="primary">Start lesson</Button>}
        >
          <p>
            On a narrow screen this is the right shape for supplementary detail
            — it never covers the whole page and it is reachable one-handed.
          </p>
        </BottomSheet>
      </DsExample>
    </DsSection>
  );
}
