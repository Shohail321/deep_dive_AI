import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("exposes an accessible loading status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeVisible();
  });
});
