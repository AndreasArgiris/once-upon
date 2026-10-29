import type { StoryFilters } from "../model/types";
import { ChatError } from "./chatError";
import { buildStoryPrompt } from "./storyPrompt";
import { countParagraphs, extractJson } from "./storyResponse";
import { STORYTELLERS } from "./storytellers";
import { streamChat } from "./streamChat";

// Gemini's safety filter wrongly stops many stories partway through (most often in Greek). The cut comes
// within a few seconds and a fresh try usually gets through, so it beats moving on to a slower model.
const CUT_OFF_RETRIES = 2;

const isReasoningRejected = (error: unknown) =>
  error instanceof ChatError && error.status === 400 && /reasoning|thinking/i.test(error.message);

// The service answered, but the story stopped short or the connection dropped (busy and broken requests are ChatErrors).
const isCutOff = (error: unknown) => !(error instanceof ChatError);

/**
 * Tries each storyteller in turn and returns the first complete answer. Any failure moves on to the next one:
 * free models are often busy or out of daily requests, and the two services differ in what they reject.
 */
export async function writeStoryText(
  filters: StoryFilters,
  signal: AbortSignal | undefined,
  onProgress: ((pagesWritten: number) => void) | undefined,
): Promise<string> {
  const messages = buildStoryPrompt(filters);
  let lastError: unknown = new Error("No storyteller is available right now. Please try again.");

  for (const { baseUrl, model, reasoningOptions } of STORYTELLERS) {
    let settingIndex = 0;
    let cutOffCount = 0;
    while (settingIndex < reasoningOptions.length) {
      onProgress?.(0);
      try {
        const content = await streamChat(
          baseUrl,
          { model, messages, temperature: 0.9, ...reasoningOptions[settingIndex] },
          (text) => onProgress?.(countParagraphs(text)),
          signal,
        );
        extractJson(content); // a garbled or cut-off answer counts as a failure for this model
        return content;
      } catch (error) {
        if (signal?.aborted) throw error;
        lastError = error;
        const hasAnotherSetting = settingIndex < reasoningOptions.length - 1;
        if (hasAnotherSetting && isReasoningRejected(error)) settingIndex++;
        else if (isCutOff(error) && cutOffCount < CUT_OFF_RETRIES) cutOffCount++;
        else break;
      }
    }
  }
  throw lastError;
}
