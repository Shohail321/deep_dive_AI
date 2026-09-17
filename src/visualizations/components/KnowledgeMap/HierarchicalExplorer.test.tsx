import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { expectNoAxeViolations } from "@/test/axe";
import { HierarchicalExplorer } from "./HierarchicalExplorer";
import { domainNodeId } from "./layout";
import { useKnowledgeMapState } from "./useKnowledgeMapState";

function makeFixture() {
  return [
    makeConcept({ id: "ml-root", domain: "ml", title: "Supervised Learning" }),
    makeConcept({
      id: "ml-child",
      domain: "ml",
      title: "Linear Regression",
      relationships: { parents: ["ml-root"] },
    }),
  ];
}

describe("HierarchicalExplorer", () => {
  it("lists every domain as a collapsed top-level item, with its concept count", () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));
    render(<HierarchicalExplorer state={result.current} />);

    expect(screen.getByText(/Machine Learning/)).toBeInTheDocument();
    expect(screen.getByText(/\(2\)/)).toBeInTheDocument();
    expect(screen.queryByText("Supervised Learning")).not.toBeInTheDocument();
  });

  it("expands to show a domain's entry-point concepts when its toggle is clicked", async () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));
    const user = userEvent.setup();
    const { rerender } = render(
      <HierarchicalExplorer state={result.current} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Expand Machine Learning" }),
    );
    rerender(<HierarchicalExplorer state={result.current} />);

    expect(screen.getByText("Supervised Learning")).toBeInTheDocument();
  });

  it("does not show a concept's children until it is separately expanded", async () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));
    act(() => result.current.toggleExpand(domainNodeId("ml")));
    const { rerender } = render(
      <HierarchicalExplorer state={result.current} />,
    );
    rerender(<HierarchicalExplorer state={result.current} />);

    expect(screen.queryByText("Linear Regression")).not.toBeInTheDocument();

    act(() => result.current.toggleExpand("ml-root" as never));
    rerender(<HierarchicalExplorer state={result.current} />);

    expect(screen.getByText("Linear Regression")).toBeInTheDocument();
  });

  it("selects a concept when its label is clicked, updating the shared state", async () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));
    act(() => result.current.toggleExpand(domainNodeId("ml")));
    const { rerender } = render(
      <HierarchicalExplorer state={result.current} />,
    );
    rerender(<HierarchicalExplorer state={result.current} />);
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "Supervised Learning" }),
    );

    expect(result.current.selected?.concept.id).toBe("ml-root");
  });

  it("has no axe violations", async () => {
    const { result } = renderHook(() => useKnowledgeMapState(makeFixture()));
    const { container } = render(
      <HierarchicalExplorer state={result.current} />,
    );
    await expectNoAxeViolations(container);
  });
});
