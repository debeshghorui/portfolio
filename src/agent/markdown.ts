import {
  contact,
  heroBadges,
  posts,
  profile,
  projectRepoUrl,
  projects,
  sections,
  site,
  socials,
  stack,
  timeline,
  writingBlog,
} from "@/data";

export function portfolioBio(): string {
  return `${profile.bio.before}${profile.bio.highlight}${profile.bio.after}`;
}

export function renderHomeMarkdown(): string {
  const projectBlocks = projects
    .filter((project) => project.featured)
    .map((project) => {
      const repo = projectRepoUrl(project);
      return `### ${project.name}\n\n${project.tag}\n\n${project.description}\n\nStack: ${project.stack.join(", ")}\n\n${site.url}/projects/${project.slug}${repo ? `\n\n${repo}` : ""}`;
    })
    .join("\n\n");

  const writingBlocks = posts
    .slice(0, 3)
    .map((post) => `- ${post.date}: [${post.title}](${post.href})`)
    .join("\n");

  const timelineBlocks = timeline
    .map(
      (item) =>
        `### ${item.title} (${item.when})\n\n${item.place}. ${item.detail}`,
    )
    .join("\n\n");

  return `# ${site.name}

${profile.greeting} ${site.name}.

${profile.tagline}

${portfolioBio()}

${heroBadges.map((badge) => `- ${badge.text}`).join("\n")}

## ${sections.projects.title}

${sections.projects.subtitle}

${projectBlocks}

Full list: ${site.url}/projects

## ${sections.stack.title}

${sections.stack.subtitle}

${stack.map((item) => `- ${item.name}`).join("\n")}

## ${sections.timeline.title}

${sections.timeline.subtitle}

${timelineBlocks}

Study: ${site.url}/credentials

## ${sections.writing.title}

${sections.writing.subtitle}

${writingBlog.name}: ${writingBlog.href}

${writingBlocks}

All writing: ${site.url}/writing

## ${sections.contact.title}

${sections.contact.subtitle}

${contact.introBeforeX} ${contact.xLinkText} ${contact.introBetween} ${contact.emailLinkText}${contact.introAfter}

${socials.map((social) => `- ${social.label}: ${social.href}`).join("\n")}

## Pages

- Projects: ${site.url}/projects
- Writing: ${site.url}/writing
- Study: ${site.url}/credentials
- About: ${site.url}/about
- Contact: ${site.url}/contact
- Privacy: ${site.url}/privacy
- API notes: ${site.url}/developers
`;
}
