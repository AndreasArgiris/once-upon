import type { StoryFilters } from "../model/types";
import { ChatError } from "./chatError";
import { buildStoryPrompt } from "./storyPrompt";
import { countParagraphs, extractJson } from "./storyResponse";
import { STORYTELLERS } from "./storytellers";
import { streamChat } from "./streamChat";

const isReasoningRejected = (error: unknown) =>
  error instanceof ChatError && error.status === 400 && /reasoning|thinking/i.test(error.message);

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
    for (const [attempt, reasoning] of reasoningOptions.entries()) {
      onProgress?.(0);
      try {
        const content = await streamChat(
          baseUrl,
          { model, messages, temperature: 0.9, ...reasoning },
          (text) => onProgress?.(countParagraphs(text)),
          signal,
        );
        extractJson(content); // a garbled answer counts as a failure for this model
        return content;
      } catch (error) {
        if (signal?.aborted) throw error;
        lastError = error;
        const hasAnotherSetting = attempt < reasoningOptions.length - 1;
        if (hasAnotherSetting && isReasoningRejected(error)) continue;
        break;
      }
    }
  }
  throw lastError;
}
