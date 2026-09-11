import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Button } from "./Button";
import { Modal } from "./Modal";

function TestModal() {
  return (
    <Modal
      title="Reset playground"
      description="Every parameter returns to its starting value."
      trigger={<Button>Open</Button>}
      footer={<Button variant="danger">Reset</Button>}
    >
      <p>Nothing you have learned is lost.</p>
    </Modal>
  );
}

describe("Modal", () => {
  it("opens from its trigger and exposes a labelled dialog", async () => {
    const user = userEvent.setup();
    render(<TestModal />);

    await user.click(screen.getByRole("button", { name: "Open" }));

    const dialog = await screen.findByRole("dialog", {
      name: "Reset playground",
    });
    expect(dialog).toHaveAccessibleDescription(
      "Every parameter returns to its starting value.",
    );
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<TestModal />);

    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes from its close button", async () => {
    const user = userEvent.setup();
    render(<TestModal />);

    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<TestModal />);

    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");

    await expectNoAxeViolations(baseElement as HTMLElement);
  });
});
