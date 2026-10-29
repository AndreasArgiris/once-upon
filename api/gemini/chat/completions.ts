import { forwardChat, missingKey } from "../../_chatProxy.js";

/** POST /api/gemini/chat/completions → Google Gemini (OpenAI-compatible endpoint). */
export function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return missingKey("GEMINI_API_KEY");
  return forwardChat(request, "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
    Authorization: `Bearer ${key}`,
  });
}
