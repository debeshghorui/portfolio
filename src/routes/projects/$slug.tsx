import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { MarkdownBody } from "@/components/markdown-body";
import { getProject, projectRepoUrl, projects, site } from "@/data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const title = `${loaderData.name} — ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        {
          property: "og:url",
          content: `${site.url}/projects/${loaderData.slug}`,
        },
      ],
      links: [
        { rel: "canonical", href: `${site.url}/projects/${loaderData.slug}` },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const repoUrl = projectRepoUrl(project);

  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <Link
        to="/projects"
        aria-label="Back to projects"
        className="font-mono-tight text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        ← projects
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
          {project.name}
        </h1>
        <span className="rounded border border-border bg-card px-1.5 py-0.5 font-mono-tight text-[10px] uppercase tracking-wide text-muted-foreground">
          {project.tag}
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 text-pretty">
        {project.description}
      </p>
      <p className="mt-3 font-mono-tight text-xs text-muted-foreground">
        {project.stack.join(" · ")}
      </p>
      {repoUrl ? (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="accent-link mt-4 inline-flex items-center gap-1 font-mono-tight text-sm text-foreground"
        >
          Repository
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ) : null}
      {project.readme ? (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">
            Readme
          </h2>
          <div className="mt-4">
            <MarkdownBody source={project.readme} repo={project.repo} />
          </div>
        </div>
      ) : null}
      <ProjectNav currentSlug={project.slug} />
    </main>
  );
}

function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx < 0) return null;
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx < projects.length - 1 ? projects[idx + 1] : undefined;
  const linkCls =
    "group flex flex-col gap-0.5 rounded-md border border-border bg-card px-3 py-2 interactive-card hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const labelCls =
    "font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground";
  const titleCls =
    "text-sm font-medium text-foreground text-pretty group-hover:text-accent group-focus-visible:text-accent";
  return (
    <nav
      aria-label="More projects"
      className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          to="/projects/$slug"
          params={{ slug: prev.slug }}
          className={linkCls}
        >
          <span className={labelCls}>← Previous</span>
          <span className={titleCls}>{prev.name}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className={`${linkCls} sm:text-right`}
        >
          <span className={labelCls}>Next →</span>
          <span className={titleCls}>{next.name}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
