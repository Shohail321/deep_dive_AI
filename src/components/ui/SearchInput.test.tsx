import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("labels the field even when the label is visually hidden", () => {
    render(<SearchInput />);
    expect(
      screen.getByRole("searchbox", { name: "Search" }),
    ).toBeInTheDocument();
  });

  it("works uncontrolled", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);

    await user.type(screen.getByRole("searchbox"), "gradient");
    expect(screen.getByRole("searchbox")).toHaveValue("gradient");
  });

  it("shows a clear button only once there is something to clear", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);

    expect(
      screen.queryByRole("button", { name: /clear/i }),
    ).not.toBeInTheDocument();

    await user.type(screen.getByRole("searchbox"), "tree");
    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("clears on Escape", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchInput onValueChange={onValueChange} />);

    await user.type(screen.getByRole("searchbox"), "tree");
    await user.keyboard("{Escape}");

    expect(onValueChange).toHaveBeenLastCalledWith("");
  });

  it("has no axe violations", async () => {
    const { container } = render(<SearchInput />);
    await expectNoAxeViolations(container);
  });
});
