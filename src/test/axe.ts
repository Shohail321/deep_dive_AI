import axe from "axe-core";
import { expect } from "vitest";

/**
 * Runs axe against rendered markup and fails with the specific rule
 * violations rather than a bare boolean.
 *
 * jsdom has no layout engine, so rules that depend on computed geometry
 * (colour contrast, target size) cannot run here — those are design-time
 * decisions, recorded against the tokens in /design-system instead.
 */
export async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });

  const summary = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} (${violation.nodes.length} node(s))`,
  );

  expect(summary).toEqual([]);
}
