import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Hero, type HeroDomain } from "./Hero";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const domains: HeroDomain[] = [
  {
    domain: "ai",
    description:
      "Machines performing tasks associated with intelligent behavior.",
  },
  { domain: "ml", description: "Systems learning patterns from data." },
  {
    domain: "dl",
    description: "Machine learning using multi-layer neural networks.",
  },
];

describe("Hero", () => {
  it("draws a ring and a legend entry for every field it is given", () => {
    render(<Hero domains={domains} />);

    expect(
      screen.getAllByRole("link", { name: /Artificial Intelligence/ }),
    ).toHaveLength(2); // the ring and the legend row
  });

  it("provides a hover-independent way to reach every field", () => {
    render(<Hero domains={domains} />);

    const nav = screen.getByRole("navigation", { name: "Explore each field" });
    expect(nav.querySelectorAll("a")).toHaveLength(3);
    // Descriptions are always in the document here — not revealed by hover —
    // which is what makes this the equivalent for touch and keyboard use.
    expect(
      screen.getByText("Systems learning patterns from data."),
    ).toBeInTheDocument();
  });

  it("links each legend row and ring to the field's own route", () => {
    render(<Hero domains={domains} />);

    const dlLinks = screen.getAllByRole("link", { name: /^Deep Learning/ });
    for (const link of dlLinks) {
      expect(link).toHaveAttribute("href", "/domains/dl");
    }
  });

  it("has no axe violations", async () => {
    const { container } = render(<Hero domains={domains} />);
    await expectNoAxeViolations(container);
  });
});
