import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const STORY_MAKER_ID = "generator";

/** Arriving with `toGenerator` state lands on the Story Maker; any other arrival starts at the hero. */
export function useLandingScroll() {
  const location = useLocation();

  useEffect(() => {
    if ((location.state as { toGenerator?: boolean } | null)?.toGenerator) {
      document.getElementById(STORY_MAKER_ID)?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.state]);
}
