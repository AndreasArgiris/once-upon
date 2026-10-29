import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_FILTERS } from "./model/options";
import type { Story } from "./model/types";
import { loadStory, saveStory } from "./storyStorage";

const story: Story = {
  id: "abc",
  title: "The Bridge",
  paragraphs: [{ text: "Once." }],
  summary: "Short.",
  filters: DEFAULT_FILTERS,
  createdAt: 0,
};

describe("storyStorage", () => {
  beforeEach(() => sessionStorage.clear());

  it("loads a story that was saved", () => {
    saveStory(story);
    expect(loadStory("abc")).toEqual(story);
  });

  it("throws for a story that was never saved", () => {
    expect(() => loadStory("missing")).toThrow(/drifted away/);
  });
});
