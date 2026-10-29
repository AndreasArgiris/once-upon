import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Generator from "./Generator";

function renderGenerator() {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <Generator />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("Generator", () => {
  it("starts with the default choices selected", () => {
    renderGenerator();
    expect(screen.getByRole("button", { name: "4–5" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Medium" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("combobox", { name: "Language" })).toHaveValue("English");
  });

  it("moves the selection when another chip is picked", async () => {
    renderGenerator();
    await userEvent.click(screen.getByRole("button", { name: "Long" }));
    expect(screen.getByRole("button", { name: "Long" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Medium" })).toHaveAttribute("aria-pressed", "false");
  });

  it("labels the hero icons for screen readers", () => {
    renderGenerator();
    expect(screen.getByRole("button", { name: "Girl" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Boy" })).toBeInTheDocument();
  });

  it("only lets letters into the character's name", async () => {
    renderGenerator();
    const nameInput = screen.getByPlaceholderText("e.g. Sofia");
    await userEvent.type(nameInput, "Ana 12!");
    expect(nameInput).toHaveValue("Ana");
  });
});
