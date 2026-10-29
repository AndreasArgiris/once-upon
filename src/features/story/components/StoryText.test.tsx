import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DEFAULT_FILTERS } from "../model/options";
import type { Story } from "../model/types";
import StoryText from "./StoryText";

const story: Story = {
  id: "abc",
  title: "The Bridge",
  paragraphs: [{ text: "Pip woke up. The sun was out." }, { text: "Pip went outside." }],
  summary: "Short.",
  filters: DEFAULT_FILTERS,
  createdAt: 0,
};

describe("StoryText", () => {
  it("puts every sentence on its own line, grouped by paragraph", () => {
    const { container } = render(<StoryText story={story} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2);
    expect(screen.getByText("Pip woke up.")).toBeInTheDocument();
    expect(screen.getByText("The sun was out.")).toBeInTheDocument();
  });

  it("gives only the opening paragraph the drop cap", () => {
    const { container } = render(<StoryText story={story} />);
    const [first, second] = container.querySelectorAll("p");
    expect(first).toHaveClass("drop-cap");
    expect(second).not.toHaveClass("drop-cap");
  });
});
