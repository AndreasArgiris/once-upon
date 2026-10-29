import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_IN, EASE_OUT } from "../shared/constants/motion";

/** Cross-fade between pages. Opacity only: a transform or filter here would break the pages' position:fixed elements. */
export default function PageFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE_IN } }}
    >
      {children}
    </motion.div>
  );
}
