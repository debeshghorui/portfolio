import { createFileRoute } from "@tanstack/react-router";

import { ProjectCard } from "@/components/project-card";
import { projects, site } from "@/data";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: `Projects — ${site.name}` },
      {
        name: "description",
        content: `Projects by ${site.name}: auth, code execution, real-time systems, and the work linked from the homepage.`,
      },
      { property: "og:title", content: `Projects — ${site.name}` },
      { property: "og:description", content: `Projects by ${site.name}.` },
      { property: "og:url", content: `${site.url}/projects` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/projects` }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
        Projects
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        A longer list than the homepage. Open one for the description, the
        stack, and the repository README when there is one worth reading.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
