import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_FILTERS } from "../model/options";
import { ChatError } from "./chatError";
import { STORYTELLERS } from "./storytellers";
import { streamChat } from "./streamChat";
import { writeStoryText } from "./writeStoryText";

vi.mock("./streamChat", () => ({ streamChat: vi.fn() }));

const ANSWER = '{"title":"T","paragraphs":[{"text":"Once."}],"summary":"S","moral":"M"}';
const mockedStreamChat = vi.mocked(streamChat);
const calledModels = () => mockedStreamChat.mock.calls.map(([, body]) => body.model);

describe("writeStoryText", () => {
  beforeEach(() => mockedStreamChat.mockReset());

  it("asks Gemini first", async () => {
    mockedStreamChat.mockResolvedValue(ANSWER);
    await expect(writeStoryText(DEFAULT_FILTERS, undefined, undefined)).resolves.toBe(ANSWER);
    expect(mockedStreamChat.mock.calls[0][0]).toBe("/api/gemini");
  });

  it("moves on to the next storyteller when one is busy or broken", async () => {
    mockedStreamChat
      .mockRejectedValueOnce(new ChatError("busy", 429))
      .mockRejectedValueOnce(new ChatError("API key not valid", 400))
      .mockResolvedValue(ANSWER);
    await writeStoryText(DEFAULT_FILTERS, undefined, undefined);
    expect(calledModels()).toEqual(STORYTELLERS.slice(0, 3).map((storyteller) => storyteller.model));
  });

  it("retries the same OpenRouter model with light reasoning when it requires reasoning", async () => {
    const geminiCount = STORYTELLERS.filter((storyteller) => storyteller.baseUrl === "/api/gemini").length;
    for (let i = 0; i < geminiCount; i++) mockedStreamChat.mockRejectedValueOnce(new ChatError("busy", 429));
    mockedStreamChat.mockRejectedValueOnce(new ChatError("Reasoning is mandatory", 400)).mockResolvedValue(ANSWER);
    await writeStoryText(DEFAULT_FILTERS, undefined, undefined);
    const [firstTry, secondTry] = calledModels().slice(geminiCount);
    expect(secondTry).toBe(firstTry);
  });

  it("reports the last error when every storyteller fails", async () => {
    for (const storyteller of STORYTELLERS) mockedStreamChat.mockRejectedValueOnce(new ChatError(`${storyteller.model} busy`, 429));
    const lastModel = STORYTELLERS[STORYTELLERS.length - 1].model;
    await expect(writeStoryText(DEFAULT_FILTERS, undefined, undefined)).rejects.toThrow(`${lastModel} busy`);
    expect(calledModels()).toHaveLength(STORYTELLERS.length);
  });
});
