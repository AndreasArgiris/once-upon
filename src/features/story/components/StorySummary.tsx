import type { Story } from "../model/types";
import { STORY_BODY_TEXT } from "./storyStyles";

/** The gold-bordered "In short…" box with the summary and, when there is one, the moral. */
export default function StorySummary({ story }: { story: Story }) {
  return (
    <div className="rounded-2xl border border-amber/50 px-5 py-6 text-start text-parchment/90 sm:px-9 sm:py-8">
      <h2 className="mb-3 font-display text-xl font-semibold text-amber sm:text-2xl">In short…</h2>
      <p className={`${STORY_BODY_TEXT} italic`}>{story.summary}</p>
      {story.moral && (
        <p className={`mt-6 border-t border-amber/25 pt-5 ${STORY_BODY_TEXT}`}>
          <span className="font-semibold text-moss">✦ Moral: </span>
          {story.moral}
        </p>
      )}
    </div>
  );
}
