import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("supports conditional object syntax", () => {
    expect(cn({ active: true, hidden: false })).toBe("active");
  });
});
