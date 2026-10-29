// Shared by the Vercel functions in this folder (the leading "_" keeps Vercel from serving it as a route).
// Production twin of the Vite dev proxy: forwards the browser's chat request and adds the API key here,
// on the server, so it never reaches the browser.

/** Sends the request body on to an AI service and streams its answer straight back. */
export async function forwardChat(request: Request, url: string, headers: Record<string, string>): Promise<Response> {
  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: await request.text(),
    signal: request.signal, // a reader pressing Cancel stops the upstream request too
  });
  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "application/json", "Cache-Control": "no-store" },
  });
}

/** A 500 the app can show, for when the key was never added in the Vercel project settings. */
export const missingKey = (name: string) =>
  Response.json({ error: { code: 500, message: `${name} is not set on the server.` } }, { status: 500 });
