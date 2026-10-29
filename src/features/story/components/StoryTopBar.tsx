import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { CORNER_POSITION, FAIRY_BUTTON } from "../../../shared/constants/classNames";
import { ROUTES } from "../../../shared/constants/routes";

/** The fixed Return button and the reading-progress bar along the top edge. */
export default function StoryTopBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`fixed z-40 ${CORNER_POSITION}`}
      >
        <Link to={ROUTES.home} className={FAIRY_BUTTON}>
          Return
        </Link>
      </motion.div>
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-moss via-amber to-ember"
        style={{ scaleX: progress }}
      />
    </>
  );
}
