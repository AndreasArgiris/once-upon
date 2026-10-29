import { motion } from "framer-motion";
import ErrorNotice from "../../../shared/ui/ErrorNotice";
import type { StoryGeneration } from "../hooks/useGenerateStory";
import { useSavePdf } from "../hooks/useSavePdf";
import type { Story } from "../model/types";
import StoryActions from "./StoryActions";
import StorySummary from "./StorySummary";

interface StoryEndingProps {
  story: Story;
  regeneration: StoryGeneration;
  onRegenerate: () => void;
}

/** "The End", the summary box and what to do next. */
export default function StoryEnding({ story, regeneration, onRegenerate }: StoryEndingProps) {
  const { isSaving, handleSavePdf } = useSavePdf(story);

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-4xl text-center"
    >
      <p className="text-gilded font-brand text-5xl sm:text-6xl">The End</p>
      <div className="mx-auto my-8 h-px w-40 bg-gradient-to-r from-transparent via-amber to-transparent" />
      <StorySummary story={story} />
      <StoryActions isSaving={isSaving} isRegenerating={regeneration.isPending} onSavePdf={handleSavePdf} onRegenerate={onRegenerate} />
      <ErrorNotice isVisible={regeneration.isError} onDismiss={regeneration.reset} />
    </motion.section>
  );
}
