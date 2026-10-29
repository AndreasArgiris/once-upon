import { useEffect } from "react";

/** Calls `onKeyDown` whenever `key` is pressed, while `isEnabled` is true. */
export function useKeyDown(key: string, onKeyDown: () => void, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) onKeyDown();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, onKeyDown, isEnabled]);
}
