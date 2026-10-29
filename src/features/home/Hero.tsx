import { motion } from "framer-motion";
import { BRAND_NAME } from "../../shared/constants/brand";
import { CORNER_POSITION } from "../../shared/constants/classNames";
import { EASE_OUT } from "../../shared/constants/motion";
import FairyDust from "../../shared/ui/FairyDust";
import Logo from "../../shared/ui/Logo";
import HeroBackground from "./HeroBackground";
import ScrollCue from "./ScrollCue";
import { useHeroScroll } from "./useHeroScroll";

/** Full-screen opening: the library video, the brand, and a nudge to scroll down. */
export default function Hero() {
  const { ref, contentY, contentOpacity, backgroundScale } = useHeroScroll();

  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[560px] overflow-hidden">
      <HeroBackground scale={backgroundScale} />
      <FairyDust />

      {/* Logo in the corner, lined up with the story page's Return button */}
      <motion.div style={{ opacity: contentOpacity }} className={`absolute ${CORNER_POSITION}`}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          <Logo className="h-14 w-auto sm:h-16" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex h-full flex-col items-center justify-start px-4 pt-[27vh] text-center sm:pt-[24vh]"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="mb-3 text-xs font-bold uppercase text-amber-soft/90 sm:text-sm"
        >
          Unlimited Fairytales
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT }}
          className="text-gilded font-brand text-[clamp(3.75rem,17vw,11rem)] leading-[1.05]"
        >
          {BRAND_NAME}
        </motion.h1>
      </motion.div>

      <ScrollCue opacity={contentOpacity} />
    </section>
  );
}
