import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children inside a div by default", () => {
    render(<Container>content</Container>);
    const element = screen.getByText("content");
    expect(element.tagName).toBe("DIV");
  });

  it("renders as the given element and merges className", () => {
    render(
      <Container as="section" className="extra">
        content
      </Container>,
    );
    const element = screen.getByText("content");
    expect(element.tagName).toBe("SECTION");
    expect(element.className).toContain("extra");
  });
});
