import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ChipProps {
  isSelected: boolean;
  onClick: () => void;
  children: ReactNode;
  /** Chips sharing a layoutGroup share one gliding highlight. */
  layoutGroup: string;
  ariaLabel?: string;
  /** Shorter (3rem) chips; the default 4rem fits an icon above a label. */
  isCompact?: boolean;
}

const SELECTED_CLASS = "border-amber text-night";
const UNSELECTED_CLASS = "border-amber/20 bg-bark-light/40 text-parchment/85 hover:border-amber/50 hover:text-parchment";

/** A selectable pill with a gliding gold highlight shared across its group. */
export default function Chip({ isSelected, onClick, children, layoutGroup, ariaLabel, isCompact = false }: ChipProps) {
  const sizeClass = isCompact ? "h-12" : "min-h-16 py-3";
  const stateClass = isSelected ? SELECTED_CLASS : UNSELECTED_CLASS;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`relative flex min-w-0 items-center justify-center rounded-2xl border px-2 text-sm font-bold transition-colors sm:px-4 ${sizeClass} ${stateClass}`}
    >
      {isSelected && (
        <motion.span
          layoutId={`chip-${layoutGroup}`}
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-soft to-amber"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative flex flex-col items-center gap-0.5">{children}</span>
    </motion.button>
  );
}
