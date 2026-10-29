import { useEffect, useState } from "react";

/** An index that steps through 0…count-1 on a timer, wrapping back to 0. */
export function useRotatingIndex(count: number, intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  return index;
}
