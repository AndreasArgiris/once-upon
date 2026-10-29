import { motion } from "framer-motion";

interface StoryProgressBarProps {
  pagesWritten: number;
  totalPages: number;
}

/** A thin bar filling up as pages arrive. */
export default function StoryProgressBar({ pagesWritten, totalPages }: StoryProgressBarProps) {
  const pages = Math.min(pagesWritten, totalPages);

  return (
    <div
      className="h-1 w-64 overflow-hidden rounded-full bg-amber/15"
      role="progressbar"
      aria-label="Story progress"
      aria-valuemin={0}
      aria-valuemax={totalPages}
      aria-valuenow={pages}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-moss via-amber to-amber-soft"
        initial={{ width: 0 }}
        animate={{ width: `${(pages / totalPages) * 100}%` }}
        transition={{ ease: "easeOut", duration: 0.6 }}
      />
    </div>
  );
}
