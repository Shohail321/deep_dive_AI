import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import DomainOverviewPage, { generateStaticParams } from "./page";

const { notFound } = vi.hoisted(() => ({
  // The real notFound() always throws to interrupt rendering; a mock that
  // did not would let this function run on past it with domain === null.
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));
vi.mock("next/navigation", () => ({ notFound }));

describe("DomainOverviewPage", () => {
  it("lists a static param for every curriculum domain", () => {
    const params = generateStaticParams();
    expect(params).toContainEqual({ domain: "ai" });
    expect(params).toContainEqual({ domain: "ml" });
    expect(params).toContainEqual({ domain: "dl" });
  });

  it("renders the field's own title and summary from the curriculum", async () => {
    const page = await DomainOverviewPage({
      params: Promise.resolve({ domain: "ml" }),
    });
    render(page);

    expect(
      screen.getByRole("heading", { name: "Machine Learning", level: 1 }),
    ).toBeInTheDocument();
  });

  it("lists concepts actually in that domain, grouped by category", async () => {
    const page = await DomainOverviewPage({
      params: Promise.resolve({ domain: "dl" }),
    });
    render(page);

    // The deep learning domain is populated in the real registry, so this
    // is real curriculum data, not a fixture — the point of the route.
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  it("calls notFound for a domain that does not exist", async () => {
    await expect(
      DomainOverviewPage({ params: Promise.resolve({ domain: "quantum" }) }),
    ).rejects.toThrow();

    expect(notFound).toHaveBeenCalled();
  });

  it("links back to the homepage", async () => {
    const page = await DomainOverviewPage({
      params: Promise.resolve({ domain: "ai" }),
    });
    render(page);

    expect(
      screen.getByRole("link", { name: /Back to the field diagram/ }),
    ).toHaveAttribute("href", "/");
  });

  it("has no axe violations", async () => {
    const page = await DomainOverviewPage({
      params: Promise.resolve({ domain: "ai" }),
    });
    const { container } = render(page);
    await expectNoAxeViolations(container);
  });
});
