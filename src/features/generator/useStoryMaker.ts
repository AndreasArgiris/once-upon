import { useState, type FormEvent } from "react";
import { useGenerateStory } from "../story/hooks/useGenerateStory";
import { DEFAULT_FILTERS } from "../story/model/options";
import type { StoryFilters } from "../story/model/types";
import { toStoryRequest } from "./storyRequest";

/** The story maker form: the reader's choices and the request they start. */
export function useStoryMaker() {
  const [filters, setFilters] = useState<StoryFilters>(DEFAULT_FILTERS);
  const generation = useGenerateStory();

  // Changing a choice clears the previous result or error, so the Create button comes back.
  const updateFilter = <K extends keyof StoryFilters>(key: K, value: StoryFilters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
    if (generation.isSuccess || generation.isError) generation.reset();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    generation.mutate(toStoryRequest(filters));
  };

  return { filters, updateFilter, handleSubmit, generation };
}
