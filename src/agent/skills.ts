import { meta, site } from "@/data";

export const skillName = "debesh-portfolio";

export const skillDescription =
    "Read Debesh Ghorui's public portfolio: profile, projects, stack, timeline, and contact details.";

export function renderSkillMarkdown(): string {
    return `---
name: ${skillName}
description: ${skillDescription}
---

# ${site.name} portfolio

${meta.description}

Use the read-only endpoints below. Do not invent projects, employers, or contact methods that are not in the response.

## Endpoints

- Profile, projects, stack, timeline, and contact: GET ${site.url}/api/portfolio.json
- Health: GET ${site.url}/api/health
- OpenAPI description: GET ${site.url}/openapi.json
- Homepage as markdown: GET ${site.url}/index.md
- Short index: GET ${site.url}/llms.txt
- Full page markdown: GET ${site.url}/llms-full.txt

## When to use

- Someone asks who ${site.name} is, what he builds, or how to reach him.
- Someone wants project names, the tech stack, or what he is studying now.
- Prefer \`/api/portfolio.json\` for structured answers and \`/index.md\` when a prose summary is enough.
`;
}

export async function skillDigest(markdown: string): Promise<string> {
    const bytes = new TextEncoder().encode(markdown);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hex = [...new Uint8Array(digest)]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    return `sha256:${hex}`;
}

export async function skillsIndexDocument() {
    const markdown = renderSkillMarkdown();
    return {
        $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
        skills: [
            {
                name: skillName,
                type: "skill-md",
                description: skillDescription,
                url: `${site.url}/.well-known/agent-skills/${skillName}/SKILL.md`,
                digest: await skillDigest(markdown),
            },
        ],
    };
}
