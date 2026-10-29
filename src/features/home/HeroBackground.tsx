import { motion, type MotionValue } from "framer-motion";
import { useState } from "react";
import { MEDIA } from "../../shared/constants/media";

/** The library video (or its poster, slowly zooming, if the video can't play) with the shading over it. */
export default function HeroBackground({ scale }: { scale: MotionValue<number> }) {
  const [hasVideoFailed, setHasVideoFailed] = useState(false);

  return (
    <>
      <motion.div className="fade-bottom absolute inset-0 -z-10" style={{ scale }}>
        {hasVideoFailed ? (
          <motion.img
            src={MEDIA.heroPoster}
            alt=""
            className="h-full w-full object-cover"
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={MEDIA.heroVideo}
            poster={MEDIA.heroPoster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasVideoFailed(true)}
          />
        )}
      </motion.div>

      {/* Vignette so the type reads against the bright light shaft */}
      <div className="hero-vignette absolute inset-0 -z-10" />
      {/* Melt the video into the dark section below */}
      <div className="hero-melt absolute inset-x-0 bottom-0 -z-10 h-[55%]" />
    </>
  );
}
