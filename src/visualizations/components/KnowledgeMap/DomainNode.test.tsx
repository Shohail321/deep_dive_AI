import { ReactFlowProvider } from "@xyflow/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { DomainNode, type DomainNodeData } from "./DomainNode";

function makeData(overrides: Partial<DomainNodeData> = {}): DomainNodeData {
  return {
    domain: "ml",
    label: "Machine Learning",
    conceptCount: 122,
    expanded: false,
    onToggle: vi.fn(),
    onFocus: vi.fn(),
    ...overrides,
  };
}

/**
 * Only `id` and `data` are actually read by `DomainNode` — the rest of
 * `NodeProps` (React Flow's own bookkeeping: selection, drag state,
 * z-index...) is required by its type but irrelevant here, so this fills
 * in inert defaults rather than repeating them at every call site.
 * `<Handle>` still needs a `ReactFlowProvider` ancestor to find the store
 * it reads from, even outside an actual `<ReactFlow>` canvas.
 */
function renderDomainNode(overrides: Partial<DomainNodeData> = {}) {
  return render(
    <ReactFlowProvider>
      <DomainNode
        id="ml"
        type="domain"
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

// DomainNode is a React Flow custom node component. It reads only `data`
// (never a React Flow context hook), so it renders and is testable as a
// plain component — no <ReactFlowProvider> required.
describe("DomainNode", () => {
  it("shows the field's label and concept count", () => {
    renderDomainNode();

    expect(screen.getByText("Machine Learning")).toBeInTheDocument();
    expect(screen.getByText("122 concepts")).toBeInTheDocument();
  });

  it("toggles expansion when clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    renderDomainNode({ onToggle });

    await user.click(
      screen.getByRole("button", { name: "Expand Machine Learning" }),
    );

    expect(onToggle).toHaveBeenCalled();
  });

  it("labels the toggle as Collapse once expanded", () => {
    renderDomainNode({ expanded: true });

    expect(
      screen.getByRole("button", { name: "Collapse Machine Learning" }),
    ).toBeInTheDocument();
  });

  it("fires onFocus from its own control, independent of the toggle", async () => {
    const onToggle = vi.fn();
    const onFocus = vi.fn();
    const user = userEvent.setup();
    renderDomainNode({ onToggle, onFocus });

    await user.click(
      screen.getByRole("button", { name: "Focus Machine Learning" }),
    );

    expect(onFocus).toHaveBeenCalled();
    expect(onToggle).not.toHaveBeenCalled();
  });

  it("has no axe violations — including no nested interactive controls", async () => {
    const { container } = renderDomainNode();
    await expectNoAxeViolations(container);
  });
});
