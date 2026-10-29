import { forwardChat, missingKey } from "../../_chatProxy.js";

/** POST /api/openrouter/chat/completions → OpenRouter. */
export function POST(request: Request) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return missingKey("OPENROUTER_API_KEY");
  return forwardChat(request, "https://openrouter.ai/api/v1/chat/completions", {
    Authorization: `Bearer ${key}`,
    "HTTP-Referer": new URL(request.url).origin,
    "X-Title": "OnceUpon",
  });
}
