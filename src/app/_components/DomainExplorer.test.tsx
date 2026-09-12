import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { DomainExplorer, type DomainSummary } from "./DomainExplorer";

const { push, search } = vi.hoisted(() => ({
  push: vi.fn(),
  search: { current: "" },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(search.current),
}));

const domains: DomainSummary[] = [
  {
    domain: "ai",
    title: "Artificial Intelligence",
    shortTitle: "AI",
    summary: "The broad pursuit of building systems that act intelligently.",
    learningObjectives: ["Place machine learning inside the wider field"],
    status: "drafting",
    conceptCount: 1,
    concepts: [
      {
        id: "artificial-intelligence",
        title: "Artificial Intelligence",
        status: "drafting",
      },
    ],
  },
  {
    domain: "ml",
    title: "Machine Learning",
    shortTitle: "ML",
    summary: "Systems that improve at a task by finding patterns in data.",
    learningObjectives: ["Distinguish supervised from unsupervised learning"],
    status: "drafting",
    conceptCount: 9,
    concepts: [
      { id: "machine-learning", title: "Machine Learning", status: "drafting" },
      {
        id: "linear-regression",
        title: "Linear Regression",
        status: "drafting",
      },
    ],
  },
];

beforeEach(() => {
  push.mockClear();
  search.current = "";
});

describe("DomainExplorer", () => {
  it("shows the rings when no field is selected", () => {
    render(<DomainExplorer domains={domains} />);

    expect(
      screen.getByRole("button", {
        name: "Artificial Intelligence, which contains Machine Learning",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("puts the opened field in the URL rather than in local state alone", async () => {
    const user = userEvent.setup();
    render(<DomainExplorer domains={domains} />);

    await user.click(screen.getByRole("button", { name: "Machine Learning" }));

    expect(push).toHaveBeenCalledWith("/?domain=ml", { scroll: false });
  });

  it("opens the field named by the URL, so the view can be linked to", () => {
    search.current = "domain=ml";
    render(<DomainExplorer domains={domains} />);

    expect(
      screen.getByRole("heading", { name: "Machine Learning", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Systems that improve at a task/),
    ).toBeInTheDocument();
  });

  it("ignores a domain in the URL that is not a real domain", () => {
    search.current = "domain=quantum";
    render(<DomainExplorer domains={domains} />);

    expect(screen.getAllByRole("button").length).toBeGreaterThan(1);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("moves focus into the panel when the learner opens a field", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DomainExplorer domains={domains} />);

    await user.click(screen.getByRole("button", { name: /^Machine Learning/ }));

    // The router is mocked, so stand in for the navigation it would have done.
    search.current = "domain=ml";
    rerender(<DomainExplorer domains={domains} />);

    expect(
      await screen.findByRole("heading", {
        name: "Machine Learning",
        level: 2,
      }),
    ).toHaveFocus();
  });

  it("does not steal focus when a field is opened by a deep link", () => {
    search.current = "domain=ml";
    render(<DomainExplorer domains={domains} />);

    // Arriving at a URL is not the same as asking for the panel: yanking focus
    // out of the top of the page on load would be hostile.
    expect(
      screen.getByRole("heading", { name: "Machine Learning", level: 2 }),
    ).not.toHaveFocus();
  });

  it("returns focus to the ring that opened the panel when it closes", async () => {
    search.current = "domain=ml";
    const user = userEvent.setup();
    const { rerender } = render(<DomainExplorer domains={domains} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    search.current = "";
    rerender(<DomainExplorer domains={domains} />);

    expect(
      await screen.findByRole("button", { name: /^Machine Learning/ }),
    ).toHaveFocus();
  });

  it("closes on Escape", async () => {
    search.current = "domain=ml";
    const user = userEvent.setup();
    render(<DomainExplorer domains={domains} />);

    await user.keyboard("{Escape}");

    expect(push).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("closes from the close control", async () => {
    search.current = "domain=ml";
    const user = userEvent.setup();
    render(<DomainExplorer domains={domains} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(push).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("lists the concepts the field actually contains", () => {
    search.current = "domain=ml";
    render(<DomainExplorer domains={domains} />);

    expect(screen.getByText("Linear Regression")).toBeInTheDocument();
  });

  it("says how many concepts were not shown", () => {
    search.current = "domain=ml";
    render(<DomainExplorer domains={domains} />);

    // A domain with a hundred concepts must not render a hundred chips.
    expect(screen.getByText(/and 7 more/)).toBeInTheDocument();
  });

  it("says nothing about extras when the field is fully listed", () => {
    search.current = "domain=ai";
    render(<DomainExplorer domains={domains} />);

    expect(screen.queryByText(/more$/)).not.toBeInTheDocument();
  });

  it("has no axe violations in either state", async () => {
    const closed = render(<DomainExplorer domains={domains} />);
    await expectNoAxeViolations(closed.container);
    closed.unmount();

    search.current = "domain=ml";
    const open = render(<DomainExplorer domains={domains} />);
    await expectNoAxeViolations(open.container);
  });
});
