import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Parallax values for the hero: content sinks and fades, the background slowly zooms, as the page scrolls. */
export function useHeroScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return { ref, contentY, contentOpacity, backgroundScale };
}
