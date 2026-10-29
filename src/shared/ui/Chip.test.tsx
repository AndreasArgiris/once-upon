import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Chip from "./Chip";

describe("Chip", () => {
  it("reports whether it is selected", () => {
    render(
      <Chip isSelected layoutGroup="test" onClick={() => {}}>
        Short
      </Chip>,
    );
    expect(screen.getByRole("button", { name: "Short" })).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onClick when pressed", async () => {
    const handleClick = vi.fn();
    render(
      <Chip isSelected={false} layoutGroup="test" onClick={handleClick}>
        Long
      </Chip>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Long" }));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
