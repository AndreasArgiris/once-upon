/** Soft ease-out used by most entrances. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Quick ease-in used when something leaves. */
export const EASE_IN = [0.4, 0, 1, 1] as const;

/** Plain fade in and out, for use inside AnimatePresence. */
export const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;
