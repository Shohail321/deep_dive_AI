import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import Home from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Home", () => {
  it("renders the site title", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Deep Dive AI", level: 1 }),
    ).toBeInTheDocument();
  });

  it("draws a ring for every field in the containment spine, outermost first", () => {
    render(<Home />);

    for (const name of [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
    ]) {
      // The ring and the always-visible legend both link to the same field.
      expect(
        screen.getAllByRole("link", { name: new RegExp(`^${name}`) }).length,
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("names the minimal below-hero content", () => {
    render(<Home />);

    expect(screen.getByText("Explore visually")).toBeInTheDocument();
    expect(screen.getByText("Interact with concepts")).toBeInTheDocument();
    expect(screen.getByText("Build your knowledge map")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Home />);
    await expectNoAxeViolations(container);
  });
});
