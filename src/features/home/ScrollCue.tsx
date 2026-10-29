import { motion, type MotionValue } from "framer-motion";
import { STORY_MAKER_ID } from "./useLandingScroll";

/** The tagline above a bobbing arrow that jumps to the Story Maker. */
export default function ScrollCue({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <>
      {/* Sits just above the scroll arrow */}
      <motion.div style={{ opacity }} className="absolute inset-x-0 bottom-20 flex justify-center px-4 text-center sm:bottom-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-xl font-display text-lg text-parchment/90 italic sm:text-xl"
        >
          Every child deserves a tale written just for them. Pick a few wishes, and the old book will dream up a brand-new story.
        </motion.p>
      </motion.div>

      <motion.a
        href={`#${STORY_MAKER_ID}`}
        aria-label="Scroll to the story maker"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-soft/80"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </>
  );
}
