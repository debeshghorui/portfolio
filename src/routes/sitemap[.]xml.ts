import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/data";

export const Route = createFileRoute("/sitemap.xml")({
    server: {
        handlers: {
            GET: async () => {
                const lastmod = new Date().toISOString().slice(0, 10);
                const pages = [
                    { path: "/", priority: "1.0" },
                    { path: "/about", priority: "0.6" },
                    { path: "/contact", priority: "0.6" },
                    { path: "/privacy", priority: "0.4" },
                    { path: "/developers", priority: "0.5" },
                ];
                const urls = pages
                    .map(
                        (page) => `  <url>
    <loc>${site.url}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
                    )
                    .join("\n");
                const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

                return new Response(body, {
                    headers: { "Content-Type": "application/xml" },
                });
            },
        },
    },
});
