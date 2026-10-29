import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FAIRY_BUTTON } from "../../shared/constants/classNames";
import { FADE } from "../../shared/constants/motion";
import { useBodyScrollLock } from "../../shared/hooks/useBodyScrollLock";
import { useKeyDown } from "../../shared/hooks/useKeyDown";
import Conjuring from "./Conjuring";

interface LoadingOverlayProps {
  isOpen: boolean;
  pagesWritten: number;
  totalPages: number;
  onCancel: () => void;
}

/** Full-screen star-wand loader that blocks clicks and scrolling while a story is being written. */
export default function LoadingOverlay({ isOpen, pagesWritten, totalPages, onCancel }: LoadingOverlayProps) {
  useBodyScrollLock(isOpen);
  useKeyDown("Escape", onCancel, isOpen);

  // Portalled to <body> so transformed ancestors can't trap the fixed positioning.
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...FADE}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-night/85 backdrop-blur-md"
        >
          <Conjuring pagesWritten={pagesWritten} totalPages={totalPages} />
          <button type="button" onClick={onCancel} className={`${FAIRY_BUTTON} mt-2`}>
            Cancel
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
