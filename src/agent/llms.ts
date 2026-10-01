import { meta, site } from "@/data";

export function renderLlmsTxt(): string {
  return `# ${site.name}

> ${meta.description}

## Docs

- [Homepage (markdown)](${site.url}/index.md): the portfolio page as markdown
- [Portfolio JSON](${site.url}/api/portfolio.json): profile, projects, stack, timeline, and contact
- [Agent skill](${site.url}/.well-known/agent-skills/debesh-portfolio/SKILL.md): how to read this site

## Optional

- [Full markdown](${site.url}/llms-full.txt): the same content as the homepage markdown
- [OpenAPI](${site.url}/openapi.json): description of the read-only portfolio API
- [API catalog](${site.url}/.well-known/api-catalog): RFC 9727 linkset for that API
`;
}
