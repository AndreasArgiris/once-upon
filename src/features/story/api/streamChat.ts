import { toFriendlyError } from "./chatError";

// Free models occasionally go quiet mid-answer; give up instead of waiting forever.
const FIRST_TOKEN_TIMEOUT_MS = 90_000;
const STALL_TIMEOUT_MS = 45_000;

interface StreamChunk {
  choices?: { delta?: { content?: string | null; reasoning?: string | null } }[];
  error?: { message: string; code?: number };
}

/** Reads one server-sent-events line; returns null for keep-alives, the end marker and garbled lines. */
function parseStreamLine(line: string): StreamChunk | null {
  // Lines starting with ":" are keep-alives, not progress.
  if (!line.startsWith("data:")) return null;
  const payload = line.slice(5).trim();
  if (payload === "[DONE]") return null;
  try {
    return JSON.parse(payload) as StreamChunk;
  } catch {
    return null;
  }
}

/** Gemini wraps its error in a one-item array; OpenRouter sends the object itself. */
const unwrapErrorBody = (body: unknown) => (Array.isArray(body) ? body[0] : body) as StreamChunk | undefined;

/** Streams a chat completion, calling onText with the full text so far. Resolves with the final text. */
export async function streamChat(
  baseUrl: string,
  body: Record<string, unknown>,
  onText: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const controller = new AbortController();
  const abortFromCaller = () => controller.abort(signal?.reason);
  signal?.addEventListener("abort", abortFromCaller);

  let hasStalled = false;
  const abortAsStalled = () => {
    hasStalled = true;
    controller.abort();
  };
  let stallTimer = setTimeout(abortAsStalled, FIRST_TOKEN_TIMEOUT_MS);
  const resetStallTimer = () => {
    clearTimeout(stallTimer);
    stallTimer = setTimeout(abortAsStalled, STALL_TIMEOUT_MS);
  };

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, stream: true }),
      signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      const errorBody = unwrapErrorBody(await response.json().catch(() => ({})));
      throw toFriendlyError(errorBody?.error?.code ?? response.status, errorBody?.error?.message);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    for (;;) {
      const { done: isDone, value } = await reader.read();
      if (isDone) break;
      buffer += decoder.decode(value, { stream: true });
      let newlineAt: number;
      while ((newlineAt = buffer.indexOf("\n")) >= 0) {
        const chunk = parseStreamLine(buffer.slice(0, newlineAt).trim());
        buffer = buffer.slice(newlineAt + 1);
        if (!chunk) continue;
        if (chunk.error) throw toFriendlyError(chunk.error.code ?? 500, chunk.error.message);
        const delta = chunk.choices?.[0]?.delta;
        if (delta?.reasoning) resetStallTimer();
        if (delta?.content) {
          resetStallTimer();
          text += delta.content;
          onText(text);
        }
      }
    }
    return text;
  } catch (error) {
    if (hasStalled) throw toFriendlyError(408);
    throw error;
  } finally {
    clearTimeout(stallTimer);
    signal?.removeEventListener("abort", abortFromCaller);
  }
}
