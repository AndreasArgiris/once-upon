import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateStory } from "../api/generateStory";
import type { StoryFilters } from "../model/types";
import { saveStory } from "../storyStorage";
import { storyKeys } from "./storyKeys";

/** Writes a new story, reporting pages as they stream in. Cancel, or leaving the page, stops the request. */
export function useGenerateStory() {
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);
  const [pagesWritten, setPagesWritten] = useState(0);

  const mutation = useMutation({
    mutationKey: ["generate-story"],
    mutationFn: (filters: StoryFilters) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setPagesWritten(0);
      return generateStory(filters, { signal: controller.signal, onProgress: setPagesWritten });
    },
    // The client already falls back across models; a failure ends the request just like Cancel.
    retry: false,
    onError: (error) => {
      abortRef.current?.abort();
      if (error.name !== "AbortError") console.error("Story generation failed:", error);
    },
    onSuccess: (story) => {
      saveStory(story);
      queryClient.setQueryData(storyKeys.story(story.id), story);
    },
  });

  const { reset } = mutation;
  const cancel = useCallback(() => {
    abortRef.current?.abort();
    reset();
  }, [reset]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return { ...mutation, pagesWritten, cancel };
}

export type StoryGeneration = ReturnType<typeof useGenerateStory>;
