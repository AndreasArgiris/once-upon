import BottomWallpaper from "../../../shared/ui/BottomWallpaper";
import LoadingOverlay from "../../loading/LoadingOverlay";
import { useRegenerateStory } from "../hooks/useRegenerateStory";
import { pagesFor, RTL_LANGUAGES } from "../model/options";
import type { Story } from "../model/types";
import SideSparkles from "./SideSparkles";
import StoryEnding from "./StoryEnding";
import StoryHeader from "./StoryHeader";
import StoryText from "./StoryText";
import StoryTopBar from "./StoryTopBar";

/** A whole story laid out for reading. */
export default function StoryView({ story }: { story: Story }) {
  const { generation, handleRegenerate } = useRegenerateStory(story.filters);
  const isRtl = RTL_LANGUAGES.has(story.filters.language);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip">
      <SideSparkles />
      <BottomWallpaper />
      <StoryTopBar />
      <StoryHeader story={story} isRtl={isRtl} />

      <div dir={isRtl ? "rtl" : undefined} className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pt-10 pb-24 sm:px-8 sm:pt-12">
        {/* The tale sits straight on the dark page, shrunk to its longest line so the text block is centred */}
        <article className="mx-auto w-fit max-w-4xl text-parchment/90">
          <StoryText story={story} />
        </article>
        <StoryEnding story={story} regeneration={generation} onRegenerate={handleRegenerate} />
      </div>

      <LoadingOverlay
        isOpen={generation.isPending}
        pagesWritten={generation.pagesWritten}
        totalPages={pagesFor(story.filters.length)}
        onCancel={generation.cancel}
      />
    </main>
  );
}
