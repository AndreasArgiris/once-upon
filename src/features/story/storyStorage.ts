import type { Story } from "./model/types";

// Stories survive a page refresh via sessionStorage.
const storageKey = (id: string) => `onceupon-story:${id}`;

export function saveStory(story: Story) {
  try {
    sessionStorage.setItem(storageKey(story.id), JSON.stringify(story));
  } catch {
    /* storage unavailable — the query cache still works */
  }
}

export function loadStory(id: string): Story {
  try {
    const saved = sessionStorage.getItem(storageKey(id));
    if (saved) return JSON.parse(saved) as Story;
  } catch {
    /* fall through */
  }
  throw new Error("This fairy tale has drifted away. Create a new one!");
}
