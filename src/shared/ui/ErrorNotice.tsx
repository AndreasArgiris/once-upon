import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "../constants/motion";
import { CloseIcon } from "./Icons";

interface ErrorNoticeProps {
  isVisible: boolean;
  onDismiss: () => void;
}

/** Dismissible message shown below the buttons when story generation fails. */
export default function ErrorNotice({ isVisible, onDismiss }: ErrorNoticeProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="mx-auto mt-5 flex w-full max-w-md items-center gap-3 rounded-xl border border-ember/50 bg-ember/10 py-3 pr-2 pl-5 text-start text-sm text-amber-soft"
        >
          <p className="flex-1">There was an error during your story generation. Try again.</p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss message"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-amber-soft/70 transition-colors hover:bg-amber/15 hover:text-amber-soft"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
