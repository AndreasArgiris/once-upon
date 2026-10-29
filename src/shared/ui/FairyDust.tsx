import { motion } from "framer-motion";
import { useMemo } from "react";

interface Mote {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

/** Scatters motes with a fixed pseudo-random pattern, so they land in the same places every render. */
function createMotes(count: number): Mote[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = (index * 9301 + 49297) % 233280;
    const random = (n: number) => ((seed * (n + 1)) % 1000) / 1000;
    return {
      left: 25 + random(1) * 50,
      top: 10 + random(2) * 70,
      size: 2 + random(3) * 4,
      duration: 7 + random(4) * 8,
      delay: random(5) * 6,
      drift: (random(6) - 0.5) * 80,
    };
  });
}

/** Golden motes drifting through the light beams. */
export default function FairyDust({ count = 28 }: { count?: number }) {
  const motes = useMemo(() => createMotes(count), [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((mote, index) => (
        <motion.span
          key={index}
          className="fairy-mote absolute rounded-full bg-amber-soft"
          style={{ left: `${mote.left}%`, top: `${mote.top}%`, width: mote.size, height: mote.size }}
          animate={{ y: [0, -120, -220], x: [0, mote.drift, mote.drift * 0.4], opacity: [0, 0.9, 0] }}
          transition={{ duration: mote.duration, delay: mote.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
