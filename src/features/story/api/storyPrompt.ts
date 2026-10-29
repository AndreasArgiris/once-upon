import { pagesFor } from "../model/options";
import type { StoryFilters } from "../model/types";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Each language's own name; models hold the language better when it is also named in its own script.
const NATIVE_LANGUAGE_NAMES: Record<string, string> = {
  English: "English",
  Greek: "Ελληνικά",
  Spanish: "Español",
  French: "Français",
  German: "Deutsch",
  Italian: "Italiano",
  Portuguese: "Português",
  Dutch: "Nederlands",
  Polish: "Polski",
  Romanian: "Română",
  Turkish: "Türkçe",
  Russian: "Русский",
  Ukrainian: "Українська",
  Arabic: "العربية",
  Hindi: "हिन्दी",
  Chinese: "中文",
  Japanese: "日本語",
};

const SYSTEM_PROMPT =
  "You are a gentle, award-winning children's author. You write original, age-appropriate fairy tales: warm, imaginative, never violent or frightening, always ending happily. You reply ONLY with valid JSON.";

/** "Greek (Ελληνικά)", or just the name when it is already in its own script. */
function describeLanguage(language: string) {
  const nativeName = NATIVE_LANGUAGE_NAMES[language];
  return nativeName && nativeName !== language ? `${language} (${nativeName})` : language;
}

/** Keeps smaller models from drifting into English or mixing in words from other languages. */
function languageRule(language: string) {
  return `Write the title, every paragraph, the summary and the moral ONLY in ${describeLanguage(language)}, as a native ${language}-speaking children's author would: natural, correct grammar and spelling, no words from any other language, no translations or notes. Only the JSON keys stay in English.`;
}

/** The chat messages asking a model for one fairy tale matching the reader's choices. */
export function buildStoryPrompt(filters: StoryFilters): ChatMessage[] {
  const paragraphCount = pagesFor(filters.length);
  const hero = filters.gender === "any" ? "child of any gender" : filters.gender;
  const nameLine = filters.characterName ? `\nThe main character is named "${filters.characterName}".` : "";
  const rule = languageRule(filters.language);

  return [
    { role: "system", content: `${SYSTEM_PROMPT} ${rule}` },
    {
      role: "user",
      content: `Write an original fairy tale.

Reader age: ${filters.age} years old (match vocabulary and sentence length to this age).
Theme: ${filters.theme}.
Language: ${rule}
The hero is a ${hero}.${nameLine}
Length: exactly ${paragraphCount} paragraphs, each 2 to 4 sentences. Give the story a real beginning, middle and end across all ${paragraphCount} paragraphs.
Include a short gentle moral.
Use plain text only: no emoji anywhere.

Return JSON with this exact shape:
{
  "title": string,
  "paragraphs": [{ "text": string }],
  "summary": string (2-3 sentences),
  "moral": string
}

Remember: the whole story must be in ${describeLanguage(filters.language)}.`,
    },
  ];
}
