import type { AgeRange, Gender, StoryFilters, StoryLength } from "./types";

export const AGES: { value: AgeRange; label: string }[] = [
  { value: "2-3", label: "2–3" },
  { value: "4-5", label: "4–5" },
  { value: "6-8", label: "6–8" },
  { value: "9-12", label: "9–12" },
];

export const GENDERS: { value: Gender; label: string }[] = [
  { value: "girl", label: "Girl" },
  { value: "boy", label: "Boy" },
  { value: "any", label: "Any gender" },
];

export const LANGUAGES = [
  "English",
  "Greek",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Polish",
  "Romanian",
  "Turkish",
  "Russian",
  "Ukrainian",
  "Arabic",
  "Hindi",
  "Chinese",
  "Japanese",
];

export const THEMES: { value: string; icon: string }[] = [
  { value: "Friendship", icon: "🤝" },
  { value: "Nature", icon: "🌿" },
  { value: "Food", icon: "🍯" },
  { value: "Protection", icon: "🛡️" },
  { value: "Courage", icon: "🦁" },
  { value: "Kindness", icon: "💛" },
  { value: "Family", icon: "🏡" },
  { value: "Animals", icon: "🦊" },
  { value: "Sharing", icon: "🎁" },
  { value: "Honesty", icon: "🔔" },
  { value: "Bedtime", icon: "🌙" },
  { value: "Magic", icon: "🔮" },
];

export const LENGTHS: { value: StoryLength; label: string; paragraphs: number }[] = [
  { value: "short", label: "Short", paragraphs: 16 },
  { value: "medium", label: "Medium", paragraphs: 30 },
  { value: "long", label: "Long", paragraphs: 60 },
];

export const pagesFor = (length: StoryLength) => LENGTHS.find((l) => l.value === length)?.paragraphs ?? 30;

export const DEFAULT_FILTERS: StoryFilters = {
  age: "4-5",
  gender: "any",
  language: "English",
  theme: "Friendship",
  length: "medium",
};

export const RTL_LANGUAGES = new Set(["Arabic"]);
