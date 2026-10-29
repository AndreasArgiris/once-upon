// In Greek ";" (and its look-alike U+037E, the Greek question mark) ends a question.
const GREEK_SENTENCE_END = /(?<=[.!?…;;]["'»”’)]*)\s+|(?<=[。！？])/u;
const SENTENCE_END = /(?<=[.!?…]["'»”’)]*)\s+|(?<=[。！？])/u;

/**
 * Splits text into sentences: after . ! ? … (plus any closing quotes) followed by a space,
 * and after CJK full stops, which aren't followed by spaces.
 */
export function splitSentences(text: string, language: string): string[] {
  const pattern = language === "Greek" ? GREEK_SENTENCE_END : SENTENCE_END;
  return text
    .split(pattern)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}
