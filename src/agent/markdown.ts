import {
  contact,
  heroBadges,
  profile,
  projects,
  sections,
  site,
  socials,
  stack,
  timeline,
} from "@/data";

export function portfolioBio(): string {
  return `${profile.bio.before}${profile.bio.highlight}${profile.bio.after}`;
}

export function renderHomeMarkdown(): string {
  const projectBlocks = projects
    .map(
      (project) =>
        `### ${project.name}\n\n${project.tag}\n\n${project.description}\n\nStack: ${project.stack.join(", ")}\n\n${project.href}`,
    )
    .join("\n\n");

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

## ${sections.stack.title}

${sections.stack.subtitle}

${stack.map((item) => `- ${item.name}`).join("\n")}

## ${sections.timeline.title}

${sections.timeline.subtitle}

${timelineBlocks}

## ${sections.contact.title}

${sections.contact.subtitle}

${contact.introBeforeX} ${contact.xLinkText} ${contact.introBetween} ${contact.emailLinkText}${contact.introAfter}

${socials.map((social) => `- ${social.label}: ${social.href}`).join("\n")}
`;
}
