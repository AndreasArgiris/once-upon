import { describe, expect, it } from "vitest";
import { splitSentences } from "./splitSentences";

describe("splitSentences", () => {
  it("splits after full stops, questions and exclamations", () => {
    expect(splitSentences("Pip woke up. Was it morning? Yes!", "English")).toEqual(["Pip woke up.", "Was it morning?", "Yes!"]);
  });

  it("keeps a closing quote with its sentence", () => {
    expect(splitSentences('"Hello." She smiled.', "English")).toEqual(['"Hello."', "She smiled."]);
  });

  it("splits after CJK full stops, which have no following space", () => {
    expect(splitSentences("小猫醒了。它很开心。", "Chinese")).toEqual(["小猫醒了。", "它很开心。"]);
  });

  it("treats the Greek question mark as a sentence end only in Greek", () => {
    const text = "Πού είσαι; Εδώ.";
    expect(splitSentences(text, "Greek")).toEqual(["Πού είσαι;", "Εδώ."]);
    expect(splitSentences(text, "English")).toEqual([text]);
  });
});
