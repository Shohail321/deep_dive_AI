import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { expectNoAxeViolations } from "@/test/axe";
import { SearchBar } from "./SearchBar";

const concepts = [
  makeConcept({
    id: "linear-regression",
    title: "Linear Regression",
    domain: "ml",
  }),
  makeConcept({ id: "neural-network", title: "Neural Network", domain: "dl" }),
];

describe("SearchBar", () => {
  it("shows no results before anything is typed", () => {
    render(<SearchBar concepts={concepts} onSelect={() => {}} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("lists matching concepts as the query changes", async () => {
    const user = userEvent.setup();
    render(<SearchBar concepts={concepts} onSelect={() => {}} />);

    await user.type(screen.getByRole("searchbox"), "neural");

    expect(screen.getByText("Neural Network")).toBeInTheDocument();
    expect(screen.queryByText("Linear Regression")).not.toBeInTheDocument();
  });

  it("shows each result's domain alongside its title", async () => {
    const user = userEvent.setup();
    render(<SearchBar concepts={concepts} onSelect={() => {}} />);

    await user.type(screen.getByRole("searchbox"), "neural");

    expect(screen.getByText("Deep Learning")).toBeInTheDocument();
  });

  it("calls onSelect and clears the query when a result is chosen", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar concepts={concepts} onSelect={onSelect} />);

    await user.type(screen.getByRole("searchbox"), "neural");
    await user.click(screen.getByRole("button", { name: /Neural Network/ }));

    expect(onSelect).toHaveBeenCalledWith("neural-network");
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("has no axe violations with results open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchBar concepts={concepts} onSelect={() => {}} />,
    );
    await user.type(screen.getByRole("searchbox"), "e");
    await expectNoAxeViolations(container);
  });
});
