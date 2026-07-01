import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/data";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml`;

        return new Response(body, {
          headers: { "Content-Type": "text/plain" },
        });
      },
    },
  },
});
