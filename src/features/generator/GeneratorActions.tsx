import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FAIRY_BUTTON } from "../../shared/constants/classNames";
import { FADE } from "../../shared/constants/motion";
import { storyPath } from "../../shared/constants/routes";
import ErrorNotice from "../../shared/ui/ErrorNotice";
import type { StoryGeneration } from "../story/hooks/useGenerateStory";
import type { Story } from "../story/model/types";

/** The finished tale's title and a link to read it. */
function StoryReady({ story }: { story: Story }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="flex flex-col items-center gap-5 text-center"
    >
      <p className="font-display text-sm tracking-[0.3em] text-moss uppercase">Your tale is ready</p>
      <h3 className="text-gilded font-display text-3xl font-semibold sm:text-4xl">{story.title}</h3>
      <Link to={storyPath(story.id)} className={FAIRY_BUTTON}>
        Read the fairy tale
      </Link>
    </motion.div>
  );
}

/** Create story → (full-screen loader) → ready. */
export default function GeneratorActions({ generation }: { generation: StoryGeneration }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <AnimatePresence mode="wait">
        {generation.isSuccess ? (
          <StoryReady key="ready" story={generation.data} />
        ) : (
          <motion.div key="idle" {...FADE} className="flex flex-col items-center gap-4">
            <button type="submit" disabled={generation.isPending} className={FAIRY_BUTTON}>
              Create story
            </button>
            <ErrorNotice isVisible={generation.isError} onDismiss={generation.reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
