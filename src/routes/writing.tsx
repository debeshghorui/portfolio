import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { posts, site, writingBlog } from "@/data";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: `Writing — ${site.name}` },
      {
        name: "description",
        content: `Essays by ${site.name} on EasyTech Bytes, covering JavaScript, networking, and Linux.`,
      },
      { property: "og:title", content: `Writing — ${site.name}` },
      {
        property: "og:description",
        content: `Essays by ${site.name} on EasyTech Bytes.`,
      },
      { property: "og:url", content: `${site.url}/writing` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/writing` }],
  }),
  component: WritingPage,
});

function WritingPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
        Writing
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Published on{" "}
        <a
          href={writingBlog.href}
          target="_blank"
          rel="noreferrer"
          className="accent-link text-foreground"
        >
          {writingBlog.name}
        </a>
        . Each title opens the full post.
      </p>
      <ul className="mt-8 space-y-3">
        {posts.map((post) => (
          <li key={post.href}>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${post.title} (opens in new tab)`}
              className="group block rounded-lg border border-border bg-card px-4 py-4 interactive-card interactive-lift hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-base font-medium text-foreground text-pretty">
                  {post.title}
                </span>
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1 block font-mono-tight text-[11px] text-muted-foreground tabular-nums">
                {post.date}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground text-pretty">
                {post.summary}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
