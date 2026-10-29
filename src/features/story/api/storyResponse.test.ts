import { describe, expect, it } from "vitest";
import { DEFAULT_FILTERS } from "../model/options";
import { countParagraphs, extractJson, parseStory, stripEmoji } from "./storyResponse";

describe("extractJson", () => {
  it("reads JSON wrapped in a code fence", () => {
    expect(extractJson('```json\n{"title":"A"}\n```')).toEqual({ title: "A" });
  });

  it("finds the object inside surrounding chatter", () => {
    expect(extractJson('Here you go: {"title":"A"} Enjoy!')).toEqual({ title: "A" });
  });

  it("throws a readable error for garbled answers", () => {
    expect(() => extractJson("no json here")).toThrow(/could not be read/);
  });
});

describe("stripEmoji", () => {
  it("removes emoji and the doubled spaces they leave", () => {
    expect(stripEmoji("The fox 🦊 ran 👨‍👩‍👧 home")).toBe("The fox ran home");
  });
});

describe("countParagraphs", () => {
  it("counts paragraphs in a partial stream", () => {
    expect(countParagraphs('{"paragraphs":[{"text":"One"},{"text": "Tw')).toBe(2);
  });
});

describe("parseStory", () => {
  it("builds a story from the model's answer", () => {
    const story = parseStory(
      '{"title":"The Bridge","paragraphs":[{"text":"Once."}],"summary":"Short.","moral":"Be kind."}',
      DEFAULT_FILTERS,
    );
    expect(story).toMatchObject({ title: "The Bridge", paragraphs: [{ text: "Once." }], summary: "Short.", moral: "Be kind." });
    expect(story.id).toBeTruthy();
  });

  it("drops empty paragraphs and a missing moral", () => {
    const story = parseStory('{"title":"T","paragraphs":[{"text":""},{"text":"Kept."}],"moral":null}', DEFAULT_FILTERS);
    expect(story.paragraphs).toEqual([{ text: "Kept." }]);
    expect(story.moral).toBeUndefined();
  });

  it("rejects a story with no title or no paragraphs", () => {
    expect(() => parseStory('{"title":"","paragraphs":[{"text":"x"}]}', DEFAULT_FILTERS)).toThrow(/empty/);
    expect(() => parseStory('{"title":"T","paragraphs":[]}', DEFAULT_FILTERS)).toThrow(/empty/);
  });
});
