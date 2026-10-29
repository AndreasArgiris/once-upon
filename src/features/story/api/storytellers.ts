// Requests go through the Vite proxy, which attaches each service's API key server-side.
const GEMINI_URL = "/api/gemini";
const OPENROUTER_URL = "/api/openrouter";

/** One model to ask, where to reach it, and the reasoning settings to try in order. */
export interface Storyteller {
  baseUrl: string;
  model: string;
  reasoningOptions: Record<string, unknown>[];
}

// Gemini's newer Flash models reject "no reasoning", so they get the lightest level they accept.
const GEMINI_REASONING = [{ reasoning_effort: "low" }];

// Reasoning roughly doubles the wait on the free OpenRouter models and isn't needed for storytelling,
// but some models refuse to run without it — those get the lightest setting instead.
const OPENROUTER_REASONING = [{ reasoning: { enabled: false } }, { reasoning: { effort: "low", exclude: true } }];

const toModelList = (list: string, limit: number) =>
  list
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean)
    .slice(0, limit);

const GEMINI_MODELS = toModelList(import.meta.env.VITE_GEMINI_MODELS || "gemini-3.8-flash,gemini-3.5-flash", 2);
const OPENROUTER_MODELS = toModelList(
  import.meta.env.VITE_TEXT_MODELS || "google/gemma-4-31b-it:free,nvidia/nemotron-3-ultra-550b-a55b:free,google/gemma-4-26b-a4b-it:free",
  3,
);

// Gemini writes the best stories in every language, so it goes first; each model has its own free
// daily limit, and OpenRouter's free models take over once Gemini's are used up.
export const STORYTELLERS: Storyteller[] = [
  ...GEMINI_MODELS.map((model) => ({ baseUrl: GEMINI_URL, model, reasoningOptions: GEMINI_REASONING })),
  ...OPENROUTER_MODELS.map((model) => ({ baseUrl: OPENROUTER_URL, model, reasoningOptions: OPENROUTER_REASONING })),
];
