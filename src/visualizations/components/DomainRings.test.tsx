import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { DomainRings, type DomainRing } from "./DomainRings";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const rings: DomainRing[] = [
  {
    domain: "ai",
    label: "Artificial Intelligence",
    description:
      "Machines performing tasks associated with intelligent behavior.",
    href: "/domains/ai",
    containsLabel: "Machine Learning",
  },
  {
    domain: "ml",
    label: "Machine Learning",
    description: "Systems learning patterns from data.",
    href: "/domains/ml",
    containsLabel: "Deep Learning",
  },
  {
    domain: "dl",
    label: "Deep Learning",
    description: "Machine learning using multi-layer neural networks.",
    href: "/domains/dl",
  },
];

beforeEach(() => {
  push.mockClear();
});

describe("DomainRings", () => {
  it("renders one link per field, each pointing at its own field", () => {
    render(<DomainRings rings={rings} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/domains/ai");
    expect(links[2]).toHaveAttribute("href", "/domains/dl");
  });

  it("states the containment in each accessible name, so the picture is not the only cue", () => {
    render(<DomainRings rings={rings} />);

    expect(
      screen.getByRole("link", {
        name: "Artificial Intelligence, which contains Machine Learning",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Deep Learning" }),
    ).toBeInTheDocument();
  });

  it("orders the controls outermost first, so Tab walks inwards", () => {
    render(<DomainRings rings={rings} />);

    const names = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("aria-label"));

    expect(names[0]).toContain("Artificial Intelligence");
    expect(names[2]).toContain("Deep Learning");
  });

  it("navigates to the field's own route on a plain click", async () => {
    const user = userEvent.setup();
    render(<DomainRings rings={rings} />);

    await user.click(screen.getByRole("link", { name: "Deep Learning" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/domains/dl"));
  });

  it("selects a field by keyboard", async () => {
    const user = userEvent.setup();
    render(<DomainRings rings={rings} />);

    await user.tab();
    await user.keyboard("{Enter}");

    await waitFor(() => expect(push).toHaveBeenCalledWith("/domains/ai"));
  });

  it("shows a short description on hover and clears it when the pointer leaves", async () => {
    const user = userEvent.setup();
    render(<DomainRings rings={rings} />);

    expect(
      screen.queryByText("Systems learning patterns from data."),
    ).not.toBeInTheDocument();

    await user.hover(screen.getByRole("link", { name: /^Machine Learning/ }));
    expect(
      await screen.findByText("Systems learning patterns from data."),
    ).toBeInTheDocument();

    await user.unhover(screen.getByRole("link", { name: /^Machine Learning/ }));
    await waitFor(() =>
      expect(
        screen.queryByText("Systems learning patterns from data."),
      ).not.toBeInTheDocument(),
    );
  });

  it("shows the description on keyboard focus too, not only on hover", async () => {
    const user = userEvent.setup();
    render(<DomainRings rings={rings} />);

    await user.tab();

    expect(
      await screen.findByText(
        "Machines performing tasks associated with intelligent behavior.",
      ),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<DomainRings rings={rings} />);
    await expectNoAxeViolations(container);
  });
});
