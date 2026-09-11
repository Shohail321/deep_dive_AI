import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("is a switch labelled by its visible label", () => {
    render(<Toggle label="Show grid" />);
    expect(
      screen.getByRole("switch", { name: "Show grid" }),
    ).toBeInTheDocument();
  });

  it("associates its description for screen readers", () => {
    render(<Toggle label="Show grid" description="Overlays gridlines." />);
    expect(screen.getByRole("switch")).toHaveAccessibleDescription(
      "Overlays gridlines.",
    );
  });

  it("toggles with the keyboard", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle label="Show grid" onCheckedChange={onCheckedChange} />);

    await user.tab();
    expect(screen.getByRole("switch")).toHaveFocus();
    await user.keyboard(" ");

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not change when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Toggle label="Show grid" disabled onCheckedChange={onCheckedChange} />,
    );

    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Toggle label="Show grid" description="Overlays gridlines." />,
    );
    await expectNoAxeViolations(container);
  });
});
