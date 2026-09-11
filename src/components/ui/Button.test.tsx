import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "@/test/axe";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { LinkButton } from "./LinkButton";

describe("Button", () => {
  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Run</Button>);
    expect(screen.getByRole("button", { name: "Run" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("is activated by keyboard", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Run</Button>);

    await user.tab();
    expect(screen.getByRole("button", { name: "Run" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("blocks interaction and announces a busy state while loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button loading onClick={onClick}>
        Training
      </Button>,
    );

    const button = screen.getByRole("button", { name: /training/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        Run
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Run" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has no axe violations across its variants", async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
        <Button loading>Loading</Button>
      </>,
    );
    await expectNoAxeViolations(container);
  });
});

describe("IconButton", () => {
  it("names itself from the required label prop", () => {
    render(<IconButton label="Open settings" icon={<svg />} />);
    expect(
      screen.getByRole("button", { name: "Open settings" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <IconButton label="Open settings" icon={<svg />} />,
    );
    await expectNoAxeViolations(container);
  });
});

describe("LinkButton", () => {
  it("renders a link", () => {
    render(<LinkButton href="/concepts">Browse</LinkButton>);
    expect(screen.getByRole("link", { name: "Browse" })).toHaveAttribute(
      "href",
      "/concepts",
    );
  });

  it("warns screen readers when a link opens a new tab", () => {
    render(
      <LinkButton href="https://example.com" external>
        Docs
      </LinkButton>,
    );
    const link = screen.getByRole("link", { name: /opens in a new tab/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders inert, unfocusable text when disabled", () => {
    render(
      <LinkButton href="/concepts" disabled>
        Browse
      </LinkButton>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
