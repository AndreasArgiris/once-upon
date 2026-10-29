import { useQuery } from "@tanstack/react-query";
import { loadStory } from "../storyStorage";
import { storyKeys } from "./storyKeys";

/** The saved story with this id; errors if it no longer exists. */
export function useStory(id: string | undefined) {
  return useQuery({
    queryKey: storyKeys.story(id ?? ""),
    queryFn: () => loadStory(id!),
    enabled: !!id,
    staleTime: Infinity,
    retry: false,
  });
}
