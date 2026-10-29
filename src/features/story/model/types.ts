export type AgeRange = "2-3" | "4-5" | "6-8" | "9-12";
export type Gender = "girl" | "boy" | "any";
export type StoryLength = "short" | "medium" | "long";

export interface StoryFilters {
  age: AgeRange;
  gender: Gender;
  language: string;
  theme: string;
  length: StoryLength;
  /** Optional; only sent when the reader typed one. */
  characterName?: string;
}

export interface StoryParagraph {
  text: string;
}

export interface Story {
  id: string;
  title: string;
  paragraphs: StoryParagraph[];
  summary: string;
  moral?: string;
  filters: StoryFilters;
  createdAt: number;
}
