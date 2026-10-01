const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Accept",
};

export function agentResponse(
  body: string,
  contentType: string,
  extra?: Record<string, string>,
): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=300",
      ...corsHeaders,
      ...extra,
    },
  });
}

export function agentJson(data: unknown, contentType = "application/json; charset=utf-8"): Response {
  return agentResponse(`${JSON.stringify(data, null, 2)}\n`, contentType);
}

export function optionsResponse(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export function asHead(request: Request, response: Response): Response {
  if (request.method !== "HEAD") return response;
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export function markdownTokens(markdown: string): string {
  return String(Math.max(1, Math.ceil(markdown.length / 4)));
}
