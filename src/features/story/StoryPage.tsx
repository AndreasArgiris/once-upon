import { useParams } from "react-router-dom";
import { useScrollToTop } from "../../shared/hooks/useScrollToTop";
import NotFoundPage from "../not-found/NotFoundPage";
import StoryView from "./components/StoryView";
import { useStory } from "./hooks/useStory";

export default function StoryPage() {
  const { id } = useParams();
  const storyQuery = useStory(id);
  useScrollToTop(id);

  if (storyQuery.isError) return <NotFoundPage />;
  if (!storyQuery.data) return null;
  return <StoryView key={storyQuery.data.id} story={storyQuery.data} />;
}
