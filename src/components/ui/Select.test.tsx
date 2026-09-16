import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Select } from "./Select";

const options = [
  { value: "all", label: "All domains" },
  { value: "ml", label: "Machine Learning" },
  { value: "dl", label: "Deep Learning" },
];

describe("Select", () => {
  it("labels the field even when the label is visually hidden", () => {
    render(
      <Select
        label="Domain"
        value="all"
        onValueChange={() => {}}
        options={options}
      />,
    );
    expect(
      screen.getByRole("combobox", { name: "Domain" }),
    ).toBeInTheDocument();
  });

  it("reports the current value", () => {
    render(
      <Select
        label="Domain"
        value="ml"
        onValueChange={() => {}}
        options={options}
      />,
    );
    expect(screen.getByRole("combobox")).toHaveValue("ml");
  });

  it("changes value by keyboard", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select
        label="Domain"
        value="all"
        onValueChange={onValueChange}
        options={options}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "dl");

    expect(onValueChange).toHaveBeenCalledWith("dl");
  });

  it("does not accept input while disabled", () => {
    render(
      <Select
        label="Domain"
        value="all"
        onValueChange={() => {}}
        options={options}
        disabled
      />,
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Select
        label="Domain"
        value="all"
        onValueChange={() => {}}
        options={options}
        showLabel
      />,
    );
    await expectNoAxeViolations(container);
  });
});
