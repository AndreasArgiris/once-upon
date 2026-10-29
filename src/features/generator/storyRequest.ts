import type { StoryFilters } from "../story/model/types";

export const CHARACTER_NAME_MAX_LENGTH = 10;

/** Keeps letters from any alphabet (plus their accents/marks): no digits, spaces or symbols. */
export const sanitizeCharacterName = (value: string) =>
  Array.from(value.replace(/[^\p{L}\p{M}]/gu, ""))
    .slice(0, CHARACTER_NAME_MAX_LENGTH)
    .join("");

/** The filters to send, with the character name left out entirely when it's blank. */
export function toStoryRequest(filters: StoryFilters): StoryFilters {
  const { characterName, ...rest } = filters;
  const name = sanitizeCharacterName(characterName ?? "");
  return name ? { ...rest, characterName: name } : rest;
}
