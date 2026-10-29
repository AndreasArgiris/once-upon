import { useEffect } from "react";

/** Jumps to the top of the page on mount, and again whenever `resetKey` changes. */
export function useScrollToTop(resetKey?: unknown) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [resetKey]);
}
