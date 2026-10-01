import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/data";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=yes

Sitemap: ${site.url}/sitemap.xml
Agentmap: ${site.url}/.well-known/ai-catalog.json`;

        return new Response(body, {
          headers: { "Content-Type": "text/plain" },
        });
      },
    },
  },
});
