import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { expectNoAxeViolations } from "@/test/axe";
import { WhereAmI } from "./WhereAmI";

const path = [
  makeConcept({ id: "ai", title: "Artificial Intelligence" }),
  makeConcept({ id: "ml", title: "Machine Learning" }),
  makeConcept({ id: "supervised", title: "Supervised Learning" }),
  makeConcept({ id: "regression", title: "Regression" }),
  makeConcept({ id: "linear-regression", title: "Linear Regression" }),
];

describe("WhereAmI", () => {
  it("renders nothing for an empty path", () => {
    const { container } = render(<WhereAmI path={[]} onNavigate={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders every step of the path in order", () => {
    render(<WhereAmI path={path} onNavigate={() => {}} />);

    const nav = screen.getByRole("navigation", {
      name: "Where this concept fits in AI",
    });
    expect(nav).toHaveTextContent(
      "Artificial IntelligenceMachine LearningSupervised LearningRegressionLinear Regression",
    );
  });

  it("marks the final step as the current one, not a control", () => {
    render(<WhereAmI path={path} onNavigate={() => {}} />);

    const current = screen.getByText("Linear Regression");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("navigates to an ancestor when its step is clicked", async () => {
    const onNavigate = vi.fn();
    const user = userEvent.setup();
    render(<WhereAmI path={path} onNavigate={onNavigate} />);

    await user.click(screen.getByRole("button", { name: "Machine Learning" }));

    expect(onNavigate).toHaveBeenCalledWith("ml");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <WhereAmI path={path} onNavigate={() => {}} />,
    );
    await expectNoAxeViolations(container);
  });
});
