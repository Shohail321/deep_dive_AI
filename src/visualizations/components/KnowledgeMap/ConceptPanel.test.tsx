import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { buildConceptGraph, getAncestorPath } from "@/curriculum/graph";
import { makeConcept } from "@/curriculum/graph/testFixtures";
import { expectNoAxeViolations } from "@/test/axe";
import type { ProgressStore } from "@/progress";
import { ConceptPanel } from "./ConceptPanel";
import type { SelectedConceptDetail } from "./useKnowledgeMapState";

function buildFixture() {
  const foundations = makeConcept({
    id: "math-foundations",
    title: "Mathematical Foundations",
    domain: "math",
  });
  const root = makeConcept({
    id: "ml-root",
    title: "Machine Learning",
    domain: "ml",
    relationships: { prerequisites: ["math-foundations"] },
  });
  const sibling = makeConcept({
    id: "ml-sibling",
    title: "Deep Learning",
    domain: "ml",
  });
  const concept = makeConcept({
    id: "linear-regression",
    title: "Linear Regression",
    domain: "ml",
    difficulty: "beginner",
    estimatedMinutes: 25,
    learningObjectives: ["Fit a line to data", "Interpret the coefficients"],
    relationships: {
      parents: ["ml-root"],
      prerequisites: ["math-foundations"],
      relatedConcepts: ["ml-sibling"],
    },
  });
  const concepts = [foundations, root, sibling, concept];
  const graph = buildConceptGraph(concepts);

  const detail: SelectedConceptDetail = {
    concept,
    ancestorPath: getAncestorPath(graph, concept.id),
    prerequisites: [foundations],
    related: [sibling],
    recommendedNext: [],
  };

  return { graph, detail, concepts };
}

function storeOf(
  entries: Record<string, { lesson?: "completed" }>,
): ProgressStore {
  return {
    getProgress: (id) => {
      const entry = entries[id];
      if (!entry) return undefined;
      return {
        conceptId: id,
        lesson: entry.lesson ?? "not-started",
        quiz: "not-started",
      };
    },
    setProgress: () => {},
  };
}

describe("ConceptPanel", () => {
  it("shows the concept's name, summary, difficulty and estimated time", () => {
    const { graph, detail } = buildFixture();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={() => {}}
        onNavigate={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Linear Regression" }),
    ).toBeInTheDocument();
    expect(screen.getByText(detail.concept.summary)).toBeInTheDocument();
    expect(screen.getByText("beginner")).toBeInTheDocument();
    expect(screen.getByText("25 min")).toBeInTheDocument();
  });

  it("shows the where-am-I trail for the selected concept", () => {
    const { graph, detail } = buildFixture();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={() => {}}
        onNavigate={() => {}}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Where this concept fits in AI" }),
    ).toHaveTextContent("Machine LearningLinear Regression");
  });

  it("lists learning objectives", () => {
    const { graph, detail } = buildFixture();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={() => {}}
        onNavigate={() => {}}
      />,
    );

    expect(screen.getByText("Fit a line to data")).toBeInTheDocument();
  });

  it("navigates to a prerequisite or related concept when its chip is clicked", async () => {
    const { graph, detail } = buildFixture();
    const onNavigate = vi.fn();
    const user = userEvent.setup();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={() => {}}
        onNavigate={onNavigate}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Mathematical Foundations" }),
    );
    expect(onNavigate).toHaveBeenCalledWith("math-foundations");

    await user.click(screen.getByRole("button", { name: "Deep Learning" }));
    expect(onNavigate).toHaveBeenCalledWith("ml-sibling");
  });

  it("links Start Learning to the concept's real place in the domain overview", () => {
    const { graph, detail } = buildFixture();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={() => {}}
        onNavigate={() => {}}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Start Learning" }),
    ).toHaveAttribute("href", "/domains/ml#linear-regression");
  });

  it("shows nothing about being locked when its prerequisite is already complete", () => {
    const { graph, detail } = buildFixture();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        progress={storeOf({ "math-foundations": { lesson: "completed" } })}
        onClose={() => {}}
        onNavigate={() => {}}
      />,
    );

    expect(screen.queryByText("Not yet unlocked")).not.toBeInTheDocument();
  });

  it("explains why a concept is locked and links to what unlocks it", async () => {
    const { graph, detail } = buildFixture();
    const onNavigate = vi.fn();
    const user = userEvent.setup();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        progress={storeOf({})}
        onClose={() => {}}
        onNavigate={onNavigate}
      />,
    );

    expect(screen.getByText("Not yet unlocked")).toBeInTheDocument();
    // "Mathematical Foundations" now appears twice — in the lock callout
    // and in the prerequisites chip list — so target the callout's link.
    const callout = screen.getByText("Not yet unlocked").closest("aside")!;
    await user.click(
      within(callout).getByRole("button", { name: "Mathematical Foundations" }),
    );
    expect(onNavigate).toHaveBeenCalledWith("math-foundations");
  });

  it("calls onClose when the panel is dismissed", async () => {
    const { graph, detail } = buildFixture();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={onClose}
        onNavigate={() => {}}
      />,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    const { graph, detail } = buildFixture();
    const { container } = render(
      <ConceptPanel
        detail={detail}
        graph={graph}
        onClose={() => {}}
        onNavigate={() => {}}
      />,
    );
    await expectNoAxeViolations(container);
  });
});
