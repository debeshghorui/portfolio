import { site } from "@/data";

import { skillName } from "./skills";

export function aiCatalogDocument() {
  return {
    specVersion: "1.0",
    host: {
      displayName: site.name,
      identifier: "did:web:debeshghorui.dev",
    },
    entries: [
      {
        identifier: "urn:air:debeshghorui.dev:skill:portfolio",
        displayName: "Portfolio agent skill",
        type: "text/markdown",
        url: `${site.url}/.well-known/agent-skills/${skillName}/SKILL.md`,
        representativeQueries: [
          "who is Debesh Ghorui",
          "what projects has Debesh built",
          "how do I contact Debesh Ghorui",
        ],
      },
      {
        identifier: "urn:air:debeshghorui.dev:api:portfolio",
        displayName: "Portfolio API",
        type: "application/openapi+json",
        url: `${site.url}/openapi.json`,
        representativeQueries: [
          "portfolio JSON API for Debesh Ghorui",
          "list Debesh Ghorui projects as JSON",
          "health check for the portfolio API",
        ],
      },
      {
        identifier: "urn:air:debeshghorui.dev:doc:llms",
        displayName: "Portfolio llms.txt",
        type: "text/plain",
        url: `${site.url}/llms.txt`,
        representativeQueries: [
          "where is the markdown version of debeshghorui.dev",
          "agent index for Debesh Ghorui's site",
        ],
      },
    ],
  };
}
