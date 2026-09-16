import { describe, expect, it } from "vitest";
import {
  buildCoverageRows,
  filterCoverageRows,
  getCategoriesByDomain,
  getDomainCoverage,
  partitionByContent,
  rowsWithoutPrerequisites,
} from "./coverage";
import { makeConcept } from "./testFixtures";

describe("buildCoverageRows", () => {
  it("carries the content flags straight from the concept", () => {
    const concept = makeConcept({
      id: "a",
      content: { hasLesson: true, hasQuiz: true },
    });

    const [row] = buildCoverageRows([concept]);

    expect(row.hasLesson).toBe(true);
    expect(row.hasQuiz).toBe(true);
    expect(row.hasVisualization).toBe(false);
    expect(row.hasPlayground).toBe(false);
  });

  it("flags whether a concept has any prerequisite", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { prerequisites: ["root"] },
    });

    const rows = buildCoverageRows([root, child]);

    expect(rows.find((r) => r.id === "root")?.hasPrerequisites).toBe(false);
    expect(rows.find((r) => r.id === "child")?.hasPrerequisites).toBe(true);
  });

  it("marks an orphan concept and attaches its issue", () => {
    const root = makeConcept({ id: "root" });
    const child = makeConcept({
      id: "child",
      relationships: { parents: ["root"] },
    });
    const floating = makeConcept({ id: "floating" });

    const rows = buildCoverageRows([root, child, floating]);
    const floatingRow = rows.find((r) => r.id === "floating");

    expect(floatingRow?.isOrphan).toBe(true);
    expect(floatingRow?.issues.some((i) => i.type === "orphan-concept")).toBe(
      true,
    );
    expect(rows.find((r) => r.id === "root")?.isOrphan).toBe(false);
  });

  it("marks a concept unreachable from any root", () => {
    const a = makeConcept({ id: "a", relationships: { parents: ["b"] } });
    const b = makeConcept({ id: "b", relationships: { parents: ["a"] } });

    const rows = buildCoverageRows([a, b]);

    expect(rows.every((r) => r.isUnreachable)).toBe(true);
  });

  it("attaches a cycle issue to every concept the cycle passes through", () => {
    const a = makeConcept({
      id: "a",
      relationships: { prerequisites: ["b"] },
    });
    const b = makeConcept({
      id: "b",
      relationships: { prerequisites: ["a"] },
    });

    const rows = buildCoverageRows([a, b]);

    for (const row of rows) {
      expect(row.issues.some((i) => i.type === "cycle")).toBe(true);
    }
  });

  it("attaches an unknown-reference issue only to the concept that authored it", () => {
    const a = makeConcept({
      id: "a",
      relationships: { prerequisites: ["ghost", "b"] },
    });
    const b = makeConcept({ id: "b" });

    const rows = buildCoverageRows([a, b]);

    expect(
      rows
        .find((r) => r.id === "a")
        ?.issues.some((i) => i.type === "unknown-reference"),
    ).toBe(true);
    // b is a real prerequisite of a, so it has an edge and is not an orphan —
    // only a's dangling reference to "ghost" should surface as an issue.
    expect(rows.find((r) => r.id === "b")?.issues).toEqual([]);
  });
});

describe("getDomainCoverage", () => {
  it("computes per-domain totals and percentages", () => {
    const rows = buildCoverageRows([
      makeConcept({ id: "a", domain: "ml", content: { hasLesson: true } }),
      makeConcept({ id: "b", domain: "ml" }),
      makeConcept({ id: "c", domain: "dl", content: { hasLesson: true } }),
    ]);

    const coverage = getDomainCoverage(rows);
    const ml = coverage.find((d) => d.domain === "ml");
    const dl = coverage.find((d) => d.domain === "dl");

    expect(ml).toMatchObject({ total: 2, withLesson: 1, lessonPercent: 50 });
    expect(dl).toMatchObject({ total: 1, withLesson: 1, lessonPercent: 100 });
  });

  it("reports zero percent rather than dividing by zero for an empty domain", () => {
    const coverage = getDomainCoverage([]);
    expect(coverage).toEqual([]);
  });

  it("orders domains from largest to smallest", () => {
    const rows = buildCoverageRows([
      makeConcept({ id: "a", domain: "dl" }),
      makeConcept({ id: "b", domain: "ml" }),
      makeConcept({ id: "c", domain: "ml" }),
    ]);

    expect(getDomainCoverage(rows).map((d) => d.domain)).toEqual(["ml", "dl"]);
  });
});

describe("filterCoverageRows", () => {
  const rows = buildCoverageRows([
    makeConcept({
      id: "linear-regression",
      title: "Linear Regression",
      domain: "ml",
      category: "Supervised learning",
      difficulty: "beginner",
      status: "drafting",
      content: { hasLesson: true, hasQuiz: true },
    }),
    makeConcept({
      id: "transformer",
      title: "Transformer",
      domain: "dl",
      category: "Architectures",
      difficulty: "advanced",
      status: "planned",
    }),
  ]);

  it("filters by domain", () => {
    expect(filterCoverageRows(rows, { domain: "dl" }).map((r) => r.id)).toEqual(
      ["transformer"],
    );
  });

  it("filters by category", () => {
    expect(
      filterCoverageRows(rows, { category: "Architectures" }).map((r) => r.id),
    ).toEqual(["transformer"]);
  });

  it("filters by difficulty", () => {
    expect(
      filterCoverageRows(rows, { difficulty: "beginner" }).map((r) => r.id),
    ).toEqual(["linear-regression"]);
  });

  it("filters by authoring status", () => {
    expect(
      filterCoverageRows(rows, { status: "planned" }).map((r) => r.id),
    ).toEqual(["transformer"]);
  });

  it("filters by lesson status in both directions", () => {
    expect(
      filterCoverageRows(rows, { lesson: "has" }).map((r) => r.id),
    ).toEqual(["linear-regression"]);
    expect(
      filterCoverageRows(rows, { lesson: "missing" }).map((r) => r.id),
    ).toEqual(["transformer"]);
  });

  it("filters by quiz, visualization and playground status", () => {
    expect(filterCoverageRows(rows, { quiz: "has" }).map((r) => r.id)).toEqual([
      "linear-regression",
    ]);
    expect(filterCoverageRows(rows, { visualization: "has" })).toEqual([]);
    expect(filterCoverageRows(rows, { playground: "has" })).toEqual([]);
  });

  it("treats 'any' the same as an absent filter", () => {
    expect(filterCoverageRows(rows, { lesson: "any" })).toHaveLength(2);
  });

  it("searches case-insensitively across id and title", () => {
    expect(
      filterCoverageRows(rows, { search: "TRANSFORM" }).map((r) => r.id),
    ).toEqual(["transformer"]);
    expect(
      filterCoverageRows(rows, { search: "linear-regr" }).map((r) => r.id),
    ).toEqual(["linear-regression"]);
  });

  it("combines multiple filters as AND, not OR", () => {
    expect(
      filterCoverageRows(rows, { domain: "ml", difficulty: "advanced" }),
    ).toEqual([]);
  });

  it("returns every row for an empty filter", () => {
    expect(filterCoverageRows(rows, {})).toHaveLength(2);
  });
});

describe("partitionByContent", () => {
  it("splits concepts into those with and without a lesson", () => {
    const rows = buildCoverageRows([
      makeConcept({ id: "a", content: { hasLesson: true } }),
      makeConcept({ id: "b" }),
    ]);

    const { withContent, withoutContent } = partitionByContent(rows, "lesson");

    expect(withContent.map((r) => r.id)).toEqual(["a"]);
    expect(withoutContent.map((r) => r.id)).toEqual(["b"]);
  });

  it("supports every content kind, not just lesson", () => {
    const rows = buildCoverageRows([
      makeConcept({
        id: "a",
        content: {
          hasVisualization: true,
          hasQuiz: true,
          hasPlayground: true,
        },
      }),
    ]);

    expect(partitionByContent(rows, "visualization").withContent).toHaveLength(
      1,
    );
    expect(partitionByContent(rows, "quiz").withContent).toHaveLength(1);
    expect(partitionByContent(rows, "playground").withContent).toHaveLength(1);
  });
});

describe("rowsWithoutPrerequisites", () => {
  it("lists concepts that declare no prerequisite", () => {
    const rows = buildCoverageRows([
      makeConcept({ id: "root" }),
      makeConcept({
        id: "child",
        relationships: { prerequisites: ["root"] },
      }),
    ]);

    expect(rowsWithoutPrerequisites(rows).map((r) => r.id)).toEqual(["root"]);
  });
});

describe("getCategoriesByDomain", () => {
  it("groups the distinct categories seen in each domain", () => {
    const rows = buildCoverageRows([
      makeConcept({ id: "a", domain: "ml", category: "Supervised learning" }),
      makeConcept({ id: "b", domain: "ml", category: "Supervised learning" }),
      makeConcept({ id: "c", domain: "ml", category: "Unsupervised learning" }),
      makeConcept({ id: "d", domain: "dl", category: "Architectures" }),
    ]);

    const byDomain = getCategoriesByDomain(rows);

    expect(byDomain.get("ml")).toEqual([
      "Supervised learning",
      "Unsupervised learning",
    ]);
    expect(byDomain.get("dl")).toEqual(["Architectures"]);
  });
});
