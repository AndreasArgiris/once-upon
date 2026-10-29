import { useState } from "react";
import type { Story } from "../model/types";

/** Builds and downloads the story's PDF; the PDF code is only loaded when first needed. */
export function useSavePdf(story: Story) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePdf = async () => {
    setIsSaving(true);
    try {
      const { exportStoryPdf } = await import("../pdf/exportStoryPdf");
      await exportStoryPdf(story);
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, handleSavePdf };
}
