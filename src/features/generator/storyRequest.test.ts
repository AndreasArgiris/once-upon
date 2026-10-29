import { describe, expect, it } from "vitest";
import { DEFAULT_FILTERS } from "../story/model/options";
import { CHARACTER_NAME_MAX_LENGTH, sanitizeCharacterName, toStoryRequest } from "./storyRequest";

describe("sanitizeCharacterName", () => {
  it("drops digits, spaces and symbols", () => {
    expect(sanitizeCharacterName("Ana 123!")).toBe("Ana");
  });

  it("keeps letters from other alphabets and their accents", () => {
    expect(sanitizeCharacterName("Zoë")).toBe("Zoë");
    expect(sanitizeCharacterName("Νίκος")).toBe("Νίκος");
  });

  it("cuts the name at the maximum length", () => {
    expect(sanitizeCharacterName("Bartholomewson")).toHaveLength(CHARACTER_NAME_MAX_LENGTH);
  });
});

describe("toStoryRequest", () => {
  it("leaves the name out when it is blank", () => {
    expect(toStoryRequest({ ...DEFAULT_FILTERS, characterName: " 42 " })).not.toHaveProperty("characterName");
  });

  it("sends a cleaned-up name", () => {
    expect(toStoryRequest({ ...DEFAULT_FILTERS, characterName: "Milo7" }).characterName).toBe("Milo");
  });
});
