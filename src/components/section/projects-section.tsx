import { Link } from "@tanstack/react-router";

import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section/section";
import { featuredProjects, sections } from "@/data";

export function ProjectsSection() {
  return (
    <Section
      id={sections.projects.id}
      title={sections.projects.title}
      subtitle={sections.projects.subtitle}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {featuredProjects().map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <Link
        to="/projects"
        className="accent-link mt-4 inline-flex font-mono-tight text-sm text-foreground"
      >
        See all projects
      </Link>
    </Section>
  );
}
