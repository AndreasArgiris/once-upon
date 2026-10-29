import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorNotice from "./ErrorNotice";

describe("ErrorNotice", () => {
  it("shows nothing while hidden", () => {
    render(<ErrorNotice isVisible={false} onDismiss={() => {}} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("can be dismissed", async () => {
    const handleDismiss = vi.fn();
    render(<ErrorNotice isVisible onDismiss={handleDismiss} />);
    expect(screen.getByRole("alert")).toHaveTextContent(/error during your story generation/);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss message" }));
    expect(handleDismiss).toHaveBeenCalledOnce();
  });
});
