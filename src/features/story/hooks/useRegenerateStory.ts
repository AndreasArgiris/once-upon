import { useNavigate } from "react-router-dom";
import { storyPath } from "../../../shared/constants/routes";
import type { StoryFilters } from "../model/types";
import { useGenerateStory } from "./useGenerateStory";

/** Writes a fresh tale with the same choices and opens it once it's ready. */
export function useRegenerateStory(filters: StoryFilters) {
  const navigate = useNavigate();
  const generation = useGenerateStory();

  const handleRegenerate = () => {
    generation.mutate(filters, { onSuccess: (next) => navigate(storyPath(next.id)) });
  };

  return { generation, handleRegenerate };
}
