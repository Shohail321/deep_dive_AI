import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

function TestTabs() {
  return (
    <Tabs defaultValue="intuition" label="Lesson stages">
      <TabsList>
        <TabsTrigger value="intuition">Intuition</TabsTrigger>
        <TabsTrigger value="maths">Mathematics</TabsTrigger>
      </TabsList>
      <TabsContent value="intuition">Start from the shape.</TabsContent>
      <TabsContent value="maths">Then formalise it.</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("exposes a labelled tablist with the default tab selected", () => {
    render(<TestTabs />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Intuition" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Start from the shape.",
    );
  });

  it("moves between tabs with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);

    await user.tab();
    expect(screen.getByRole("tab", { name: "Intuition" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Mathematics" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Then formalise it.",
    );
  });

  it("has no axe violations", async () => {
    const { container } = render(<TestTabs />);
    await expectNoAxeViolations(container);
  });
});
