import { motion } from "framer-motion";
import { EYEBROW } from "../../../shared/constants/classNames";
import { EASE_OUT } from "../../../shared/constants/motion";
import FairyDust from "../../../shared/ui/FairyDust";
import PosterBackdrop from "../../../shared/ui/PosterBackdrop";
import type { Story } from "../model/types";

/** The title over a dim, dusty view of the library. */
export default function StoryHeader({ story, isRtl }: { story: Story; isRtl: boolean }) {
  return (
    <header className="relative isolate flex min-h-[48svh] flex-col items-center justify-end overflow-hidden px-4 pt-28 pb-12 text-center sm:pb-14">
      <PosterBackdrop className="opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/40 via-night/60 to-night" />
      <FairyDust count={18} />

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`mb-4 ${EYEBROW}`}>
        A tale of {story.filters.theme.toLowerCase()} · ages {story.filters.age}
      </motion.p>
      <motion.h1
        dir={isRtl ? "rtl" : undefined}
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.3, ease: EASE_OUT }}
        className="text-gilded max-w-4xl font-display text-[clamp(2rem,8vw,3.75rem)] leading-tight font-semibold break-words hyphens-auto"
      >
        {story.title}
      </motion.h1>
    </header>
  );
}
