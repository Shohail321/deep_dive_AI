import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { DomainRings } from "./DomainRings";

const rings = [
  {
    domain: "ai" as const,
    label: "Artificial Intelligence",
    containsLabel: "Machine Learning",
  },
  {
    domain: "ml" as const,
    label: "Machine Learning",
    containsLabel: "Deep Learning",
  },
  { domain: "dl" as const, label: "Deep Learning" },
];

describe("DomainRings", () => {
  it("renders one control per field", () => {
    render(<DomainRings rings={rings} onSelect={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("states the containment in each accessible name, so the picture is not the only cue", () => {
    render(<DomainRings rings={rings} onSelect={() => {}} />);

    expect(
      screen.getByRole("button", {
        name: "Artificial Intelligence, which contains Machine Learning",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Deep Learning" }),
    ).toBeInTheDocument();
  });

  it("orders the controls outermost first, so Tab walks inwards", () => {
    render(<DomainRings rings={rings} onSelect={() => {}} />);

    const names = screen
      .getAllByRole("button")
      .map((button) => button.getAttribute("aria-label"));

    expect(names?.[0]).toContain("Artificial Intelligence");
    expect(names?.[2]).toContain("Deep Learning");
  });

  it("selects a field by keyboard", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DomainRings rings={rings} onSelect={onSelect} />);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledWith("ai");
  });

  it("selects a field by pointer", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DomainRings rings={rings} onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "Deep Learning" }));

    expect(onSelect).toHaveBeenCalledWith("dl");
  });

  it("hands each control back to the caller so focus can be restored", () => {
    const registerRef = vi.fn();
    render(
      <DomainRings
        rings={rings}
        onSelect={() => {}}
        registerRef={registerRef}
      />,
    );

    expect(registerRef).toHaveBeenCalledWith("ai", expect.any(HTMLElement));
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <DomainRings rings={rings} onSelect={() => {}} />,
    );
    await expectNoAxeViolations(container);
  });
});
