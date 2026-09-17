import { ReactFlowProvider } from "@xyflow/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { expectNoAxeViolations } from "@/test/axe";
import { ConceptNode, type ConceptNodeData } from "./ConceptNode";
import type { NodeVisualState } from "./nodeState";

const baseVisualState: NodeVisualState = {
  mastery: "unexplored",
  relation: "none",
  locked: false,
  lockedBecause: [],
};

function makeData(overrides: Partial<ConceptNodeData> = {}): ConceptNodeData {
  return {
    concept: makeConcept({
      id: "linear-regression",
      title: "Linear Regression",
      difficulty: "beginner",
      estimatedMinutes: 20,
    }),
    visualState: baseVisualState,
    expanded: false,
    hasChildren: false,
    onSelect: vi.fn(),
    onToggleExpand: vi.fn(),
    onFocus: vi.fn(),
    ...overrides,
  };
}

/**
 * Only `id` and `data` are actually read by `ConceptNode` — the rest of
 * `NodeProps` (React Flow's own bookkeeping) is required by its type but
 * irrelevant here.
 */
function renderConceptNode(overrides: Partial<ConceptNodeData> = {}) {
  return render(
    <ReactFlowProvider>
      <ConceptNode
        id="linear-regression"
        type="concept"
        data={makeData(overrides)}
        selected={false}
        dragging={false}
        zIndex={0}
        selectable
        deletable
        draggable={false}
        isConnectable={false}
        positionAbsoluteX={0}
        positionAbsoluteY={0}
      />
    </ReactFlowProvider>,
  );
}

describe("ConceptNode", () => {
  it("shows the concept's title, difficulty and estimated time", () => {
    renderConceptNode();

    expect(screen.getByText("Linear Regression")).toBeInTheDocument();
    expect(screen.getByText("beginner · 20 min")).toBeInTheDocument();
  });

  it("selects the concept when its body is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    renderConceptNode({ onSelect });

    await user.click(screen.getByRole("button", { name: "Linear Regression" }));

    expect(onSelect).toHaveBeenCalled();
  });

  it("names the select control from the visible title rather than leaving it unnamed", () => {
    renderConceptNode();

    expect(
      screen.getByRole("button", { name: "Linear Regression" }),
    ).toBeInTheDocument();
  });

  it("shows no expand control when the concept has no children", () => {
    renderConceptNode({ hasChildren: false });

    expect(
      screen.queryByRole("button", { name: /Expand|Collapse/ }),
    ).not.toBeInTheDocument();
  });

  it("expands or collapses from its own control, independent of selecting", async () => {
    const onSelect = vi.fn();
    const onToggleExpand = vi.fn();
    const user = userEvent.setup();
    renderConceptNode({ hasChildren: true, onSelect, onToggleExpand });

    await user.click(
      screen.getByRole("button", { name: "Expand Linear Regression" }),
    );

    expect(onToggleExpand).toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("shows a relation badge and its text label when part of the current selection", () => {
    renderConceptNode({
      visualState: { ...baseVisualState, relation: "prerequisite" },
    });

    expect(screen.getByText("Prerequisite")).toBeInTheDocument();
  });

  it("marks mastery visually and for screen readers", () => {
    renderConceptNode({
      visualState: { ...baseVisualState, mastery: "mastered" },
    });

    expect(screen.getByText("Mastered")).toBeInTheDocument();
  });

  it("has no axe violations in any relation or mastery state", async () => {
    for (const relation of [
      "none",
      "selected",
      "prerequisite",
      "related",
    ] as const) {
      for (const mastery of ["unexplored", "completed", "mastered"] as const) {
        const { container, unmount } = renderConceptNode({
          visualState: { ...baseVisualState, relation, mastery },
          hasChildren: true,
        });
        await expectNoAxeViolations(container);
        unmount();
      }
    }
  });

  it("has no axe violations while locked", async () => {
    const prereq = makeConcept({ id: "prereq", title: "Prerequisite Concept" });
    const { container } = renderConceptNode({
      visualState: {
        ...baseVisualState,
        locked: true,
        lockedBecause: [prereq],
      },
    });
    await expectNoAxeViolations(container);
  });
});
