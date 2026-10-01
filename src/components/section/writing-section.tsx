import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section/section";
import { posts, sections } from "@/data";

export function WritingSection() {
  return (
    <Section
      id={sections.writing.id}
      title={sections.writing.title}
      subtitle={sections.writing.subtitle}
    >
      <ul className="space-y-3">
        {posts.slice(0, 3).map((post) => (
          <li key={post.href}>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${post.title} (opens in new tab)`}
              className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 interactive-card interactive-lift hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="min-w-0">
                <span className="block font-mono-tight text-[11px] text-muted-foreground tabular-nums">
                  {post.date}
                </span>
                <h3 className="mt-1 block text-sm font-medium text-foreground text-pretty">
                  {post.title}
                </h3>
              </span>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
      <Link
        to="/writing"
        className="accent-link mt-4 inline-flex font-mono-tight text-sm text-foreground"
      >
        All writing
      </Link>
    </Section>
  );
}
