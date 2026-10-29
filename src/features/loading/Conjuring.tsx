import { AnimatePresence, motion } from "framer-motion";
import { useRotatingIndex } from "../../shared/hooks/useRotatingIndex";
import StarWand from "./StarWand";
import StoryProgressBar from "./StoryProgressBar";

const LINES = [
  "Waving the magic wand…",
  "Waking the sleepy dragons…",
  "Asking the old owl for advice…",
  "Sprinkling a little magic dust…",
  "Turning the first page…",
];
const LINE_INTERVAL_MS = 2400;

interface ConjuringProps {
  pagesWritten?: number;
  totalPages?: number;
}

/** Star-wand loader shown while a story is being written, with live page progress. */
export default function Conjuring({ pagesWritten = 0, totalPages }: ConjuringProps) {
  const lineIndex = useRotatingIndex(LINES.length, LINE_INTERVAL_MS);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <StarWand className="h-40 w-44" />
      <div className="h-7">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="font-display text-lg text-amber-soft italic"
          >
            {LINES[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      {totalPages !== undefined && <StoryProgressBar pagesWritten={pagesWritten} totalPages={totalPages} />}
    </div>
  );
}
