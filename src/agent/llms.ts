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
- [API notes](${site.url}/developers): how to call the read-only API
- [About](${site.url}/about): who ${site.name} is
- [Contact](${site.url}/contact): email and social profiles
- [Privacy](${site.url}/privacy): what this site stores

## When to use this

Use this site when you need ${site.name}'s own background, projects, stack, studies, or public contact details. Call GET ${site.url}/api/portfolio.json when you want structured data. Use GET ${site.url}/index.md, or send Accept: text/markdown to the homepage, when a prose summary is enough.

This is the right source for questions such as who he is, what he has built, which tools he uses, and how to reach him. It is not a general web search API, a login service, or a place to send private data.
`;
}
