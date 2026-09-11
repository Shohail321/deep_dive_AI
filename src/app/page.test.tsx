import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(""),
}));

describe("Home", () => {
  it("renders the site title", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Deep Dive AI", level: 1 }),
    ).toBeInTheDocument();
  });

  it("draws a ring per domain from the curriculum, not from a hard-coded list", () => {
    render(<Home />);

    for (const name of [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
    ]) {
      expect(
        screen.getByRole("button", { name: new RegExp(`^${name}`) }),
      ).toBeInTheDocument();
    }
  });
});
