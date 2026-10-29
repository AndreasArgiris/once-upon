import type { Story, StoryFilters } from "../model/types";
import { parseStory } from "./storyResponse";
import { writeStoryText } from "./writeStoryText";

interface GenerateOptions {
  signal?: AbortSignal;
  onProgress?: (pagesWritten: number) => void;
}

/** Asks the storytellers for a new tale and returns it ready to read. */
export async function generateStory(filters: StoryFilters, { signal, onProgress }: GenerateOptions = {}): Promise<Story> {
  const content = await writeStoryText(filters, signal, onProgress);
  return parseStory(content, filters);
}
