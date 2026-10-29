import { motion } from "framer-motion";
import { EYEBROW } from "../../shared/constants/classNames";
import Generator from "../generator/Generator";
import { STORY_MAKER_ID } from "./useLandingScroll";

/** The Story Maker heading and form, over a warm glow. */
export default function StoryMakerSection() {
  return (
    <section id={STORY_MAKER_ID} className="relative scroll-mt-4 px-4 pt-16 pb-28 sm:pt-24">
      {/* Warm glow behind the form: a wide, many-stop falloff so it has no visible edge */}
      <div aria-hidden className="story-maker-glow pointer-events-none absolute inset-0 -z-10" />
      {/* Continues the hero's fade so the two sections meet without a seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-night via-night/70 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto mb-12 max-w-2xl text-center"
      >
        <p className={`mb-3 ${EYEBROW}`}>The Story Maker</p>
        <h2 className="text-gilded font-display text-[clamp(2rem,8vw,3rem)] leading-tight font-semibold">Make a wish upon the book</h2>
        <p className="mt-4 text-parchment/70">Choose who the story is for, and what it should be about. We'll write it, page by page.</p>
      </motion.div>

      <div className="relative">
        <Generator />
      </div>
    </section>
  );
}
