import { createFileRoute } from "@tanstack/react-router";

import { TextPage } from "@/components/text-page";
import { site } from "@/data";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: `API — ${site.name}` },
      {
        name: "description",
        content: `Read-only HTTP API for ${site.name}'s public portfolio. No API key.`,
      },
      { property: "og:title", content: `API — ${site.name}` },
      { property: "og:url", content: `${site.url}/developers` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/developers` }],
  }),
  component: DevelopersPage,
});

function DevelopersPage() {
  return (
    <TextPage title="API">
      <p>
        This portfolio publishes a small read-only HTTP API so an agent can quote the page without
        scraping HTML. There is no API key, no write operation, and no sandbox account. Every
        documented route is a public GET.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <a href="/api/portfolio.json" className="accent-link">
            GET /api/portfolio.json
          </a>{" "}
          returns name, bio, projects, stack, timeline, and contact.
        </li>
        <li>
          <a href="/api/health" className="accent-link">
            GET /api/health
          </a>{" "}
          returns {`{"status":"ok"}`}.
        </li>
        <li>
          <a href="/openapi.json" className="accent-link">
            GET /openapi.json
          </a>{" "}
          is the OpenAPI description, with an operationId and a typed schema on each operation.
        </li>
        <li>
          <a href="/llms.txt" className="accent-link">
            GET /llms.txt
          </a>{" "}
          is the short index, including when to use this site.
        </li>
        <li>
          <a href="/index.md" className="accent-link">
            GET /index.md
          </a>{" "}
          is the homepage as Markdown. Sending Accept: text/markdown to the homepage returns the
          same body.
        </li>
      </ul>
      <p>A working request:</p>
      <pre className="overflow-x-auto rounded-md border border-border bg-card p-4 font-mono-tight text-xs text-foreground">
        {`curl ${site.url}/api/portfolio.json`}
      </pre>
      <p>
        Errors use application/problem+json with a code, a detail, and a resolution. An unknown path
        under /api returns 404. A method other than GET or HEAD returns 405. The API is public and
        does not issue rate-limit quotas.
      </p>
    </TextPage>
  );
}
