export class ChatError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/** Turns an HTTP status into an error with a message fit to show a reader. */
export function toFriendlyError(status: number, message?: string) {
  if (status === 429) return new ChatError("The storytellers are busy right now. Please try again in a moment.", status);
  if (status === 408) return new ChatError("The storyteller fell asleep halfway through. Please try again.", status);
  return new ChatError(message || `The storyteller could not be reached (${status})`, status);
}
