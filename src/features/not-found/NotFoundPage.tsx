import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FAIRY_BUTTON } from "../../shared/constants/classNames";
import { EASE_OUT } from "../../shared/constants/motion";
import { ROUTES } from "../../shared/constants/routes";
import { useScrollToTop } from "../../shared/hooks/useScrollToTop";
import FairyDust from "../../shared/ui/FairyDust";
import PosterBackdrop from "../../shared/ui/PosterBackdrop";

/** Shown for unknown addresses and for story links that no longer exist. */
export default function NotFoundPage() {
  useScrollToTop();

  return (
    <main className="relative isolate flex min-h-[100svh] flex-col items-center justify-center gap-10 overflow-hidden px-4 text-center">
      <PosterBackdrop className="opacity-25" />
      <div className="not-found-vignette absolute inset-0 -z-10" />
      <FairyDust count={16} />

      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        className="text-gilded font-brand text-7xl sm:text-8xl"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: EASE_OUT }}
        className="max-w-xl font-display text-2xl text-parchment sm:text-3xl"
      >
        Oops, something went wrong with our fairytale
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
        <Link to={ROUTES.home} className={FAIRY_BUTTON}>
          Return
        </Link>
      </motion.div>
    </main>
  );
}
