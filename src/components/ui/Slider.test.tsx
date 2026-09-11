import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("exposes a labelled slider with a formatted value text", () => {
    render(
      <Slider
        label="Learning rate"
        value={0.03}
        onValueChange={() => {}}
        min={0}
        max={1}
        step={0.001}
        formatValue={(value) => value.toFixed(3)}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Learning rate" });
    expect(slider).toHaveAttribute("aria-valuetext", "0.030");
  });

  it("steps with arrow keys", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Slider
        label="Epochs"
        value={50}
        onValueChange={onValueChange}
        max={200}
      />,
    );

    await user.tab();
    expect(screen.getByRole("slider")).toHaveFocus();
    await user.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenCalledWith(51);
  });

  it("does not change when disabled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Slider
        label="Epochs"
        value={50}
        onValueChange={onValueChange}
        disabled
      />,
    );

    await user.click(screen.getByRole("slider"));
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Slider label="Epochs" value={50} onValueChange={() => {}} />,
    );
    await expectNoAxeViolations(container);
  });
});
