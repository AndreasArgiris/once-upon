import { motion } from "framer-motion";
import { EASE_OUT } from "../../../shared/constants/motion";
import type { Story } from "../model/types";
import Spark from "./Spark";
import { splitSentences } from "./splitSentences";
import { STORY_BODY_TEXT } from "./storyStyles";

const LINES_PER_SPARK = 4;

const sparkDelay = (lineNumber: number) => ((lineNumber / LINES_PER_SPARK) * 0.7) % 2.4;

/** The whole tale: every sentence on its own line, with a twinkling spark beside every fourth line. */
export default function StoryText({ story }: { story: Story }) {
  const paragraphs = story.paragraphs.map((paragraph) => splitSentences(paragraph.text, story.filters.language));
  // Line numbers run across the whole story so the sparks keep an even rhythm between paragraphs.
  const firstLineOf = paragraphs.map((_, paragraphIndex) =>
    paragraphs.slice(0, paragraphIndex).reduce((total, lines) => total + lines.length, 0),
  );

  return (
    <div className="flex flex-col gap-8">
      {paragraphs.map((lines, paragraphIndex) => (
        <motion.p
          key={paragraphIndex}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className={`px-7 sm:px-9 ${STORY_BODY_TEXT} ${paragraphIndex === 0 ? "drop-cap" : ""}`}
        >
          {lines.map((line, lineIndex) => {
            const lineNumber = firstLineOf[paragraphIndex] + lineIndex;
            return (
              <span key={lineIndex} className="relative block">
                {lineNumber % LINES_PER_SPARK === 0 && <Spark delay={sparkDelay(lineNumber)} isFirstLine={lineNumber === 0} />}
                {line}
              </span>
            );
          })}
        </motion.p>
      ))}
    </div>
  );
}
