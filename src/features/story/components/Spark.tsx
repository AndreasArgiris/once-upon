interface SparkProps {
  delay: number;
  /** The very first line is taller (it holds the big initial), so its spark sits lower. */
  isFirstLine: boolean;
}

/** A twinkling star in the left gutter of a line. */
export default function Spark({ delay, isFirstLine }: SparkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`spark absolute -start-7 h-4 w-4 text-amber sm:-start-9 sm:h-5 sm:w-5 ${isFirstLine ? "top-[2.05em]" : "top-[0.35em]"}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <path fill="currentColor" d="M12 2l2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1z" />
    </svg>
  );
}
