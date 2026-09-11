import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Badge } from "./Badge";
import { Breadcrumb } from "./Breadcrumb";
import { ConceptLabel } from "./ConceptLabel";
import { EquationContainer } from "./EquationContainer";
import { ErrorState } from "./ErrorState";
import { InfoCallout } from "./InfoCallout";
import { ProgressIndicator } from "./ProgressIndicator";

describe("ConceptLabel", () => {
  it("announces the track and mastery, so colour is never the only signal", () => {
    render(
      <ConceptLabel domain="ml" mastery="familiar">
        Linear regression
      </ConceptLabel>,
    );

    expect(screen.getByText(/Machine Learning, familiar/)).toBeInTheDocument();
  });
});

describe("ProgressIndicator", () => {
  it("reports its value and derived state on the progressbar", () => {
    render(<ProgressIndicator value={45} label="Machine learning" />);

    const bar = screen.getByRole("progressbar", {
      name: "Machine learning: In progress",
    });
    expect(bar).toHaveAttribute("aria-valuenow", "45");
  });

  it("clamps out-of-range values", () => {
    render(<ProgressIndicator value={140} label="Foundations" />);

    expect(
      screen.getByRole("progressbar", { name: /Completed/ }),
    ).toHaveAttribute("aria-valuenow", "100");
  });
});

describe("Breadcrumb", () => {
  it("marks the last item as the current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Machine Learning", href: "/ml" },
          { label: "Linear regression" },
        ]}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Linear regression")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

describe("EquationContainer", () => {
  it("names the equation region with its plain-language description", () => {
    render(
      <EquationContainer description="Mean squared error." number="1">
        MSE
      </EquationContainer>,
    );

    const region = screen.getByRole("group", { name: "Mean squared error." });
    expect(region).toHaveAttribute("tabindex", "0");
  });
});

describe("ErrorState", () => {
  it("announces itself as an alert by default", () => {
    render(<ErrorState title="Could not load" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Could not load");
  });

  it("can opt out of the live region", () => {
    render(<ErrorState title="Could not load" live={false} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("content components", () => {
  it("have no axe violations", async () => {
    const { container } = render(
      <main>
        <Badge tone="ai">AI</Badge>
        <ConceptLabel domain="dl" mastery="mastered">
          Backpropagation
        </ConceptLabel>
        <ProgressIndicator value={45} label="Machine learning" />
        <Breadcrumb
          items={[{ label: "ML", href: "/ml" }, { label: "Linear regression" }]}
        />
        <InfoCallout tone="warning">Holds only for convex losses.</InfoCallout>
        <EquationContainer description="Mean squared error.">
          MSE
        </EquationContainer>
        <ErrorState title="Could not load" live={false} />
      </main>,
    );

    await expectNoAxeViolations(container);
  });
});
