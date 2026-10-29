import type { Story, StoryFilters, StoryParagraph } from "../model/types";

interface RawStory {
  title?: string;
  paragraphs?: StoryParagraph[];
  summary?: string;
  moral?: string | null;
}

/** Parses the model's JSON, tolerating code fences and chatter around the object. */
export function extractJson(raw: string): unknown {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const outerObject = start >= 0 && end > start ? cleaned.slice(start, end + 1) : null;
  for (const candidate of [cleaned, outerObject]) {
    if (!candidate) continue;
    try {
      return JSON.parse(candidate);
    } catch {
      /* try the next candidate */
    }
  }
  throw new Error("The storyteller's answer could not be read. Please try again.");
}

// Emoji, flag letters, and the zero-width joiners (U+200D) and variation selectors (U+FE0F) that glue them together.
const EMOJI = /\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|\u{200D}|\u{FE0F}/gu;

/** Models sometimes add emoji anyway; strip them. */
export const stripEmoji = (text: string) =>
  text
    .replace(EMOJI, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

/** Number of paragraphs written so far in a partially streamed story. */
export const countParagraphs = (partial: string) => partial.match(/"text"\s*:/g)?.length ?? 0;

/** Turns the model's answer into a Story, or throws if it has no title or no paragraphs. */
export function parseStory(content: string, filters: StoryFilters): Story {
  const raw = extractJson(content) as RawStory;

  const paragraphs = (raw.paragraphs ?? [])
    .map((paragraph) => ({ text: stripEmoji(paragraph?.text ?? "") }))
    .filter((paragraph) => paragraph.text);
  const title = stripEmoji(raw.title ?? "");
  if (!title || paragraphs.length === 0) {
    throw new Error("The story came back empty. Please try again.");
  }

  return {
    id: crypto.randomUUID(),
    title,
    paragraphs,
    summary: stripEmoji(raw.summary ?? ""),
    moral: raw.moral ? stripEmoji(raw.moral) : undefined,
    filters,
    createdAt: Date.now(),
  };
}
