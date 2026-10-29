import { FAIRY_BUTTON } from "../../../shared/constants/classNames";
import { ScrollDownloadIcon } from "../../../shared/ui/Icons";

interface StoryActionsProps {
  isSaving: boolean;
  isRegenerating: boolean;
  onSavePdf: () => void;
  onRegenerate: () => void;
}

/** Save as PDF and Regenerate, side by side (stacked on phones). */
export default function StoryActions({ isSaving, isRegenerating, onSavePdf, onRegenerate }: StoryActionsProps) {
  return (
    <div dir="ltr" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button type="button" onClick={onSavePdf} disabled={isSaving} className={`${FAIRY_BUTTON} w-full sm:w-auto sm:min-w-52`}>
        <ScrollDownloadIcon />
        {isSaving ? "Binding the book…" : "Save as PDF"}
      </button>
      <button
        type="button"
        onClick={onRegenerate}
        disabled={isRegenerating}
        className={`${FAIRY_BUTTON} btn-fairy--moss w-full sm:w-auto sm:min-w-52`}
      >
        Regenerate
      </button>
    </div>
  );
}
