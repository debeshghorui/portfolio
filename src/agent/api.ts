import {
  heroBadges,
  profile,
  projects,
  site,
  socials,
  stack,
  timeline,
} from "@/data";

import { portfolioBio } from "./markdown";

export function portfolioPayload() {
  return {
    name: site.name,
    url: site.url,
    handle: site.handle,
    email: site.email,
    tagline: profile.tagline,
    bio: portfolioBio(),
    badges: heroBadges.map((badge) => badge.text),
    socials: socials.map(({ label, href }) => ({ label, href })),
    projects: projects.map((project) => ({
      name: project.name,
      tag: project.tag,
      description: project.description,
      href: project.href,
      stack: [...project.stack],
    })),
    stack: stack.map((item) => item.name),
    timeline: timeline.map((item) => ({
      when: item.when,
      title: item.title,
      place: item.place,
      detail: item.detail,
    })),
  };
}

export function healthPayload() {
  return { status: "ok" as const };
}

export function openApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: `${site.name} Portfolio API`,
      version: "1.0.0",
      description:
        "Read-only portfolio data: profile, projects, stack, timeline, and contact.",
    },
    servers: [{ url: site.url }],
    paths: {
      "/api/portfolio.json": {
        get: {
          summary: "Portfolio data",
          operationId: "getPortfolio",
          responses: {
            "200": {
              description:
                "Profile, projects, stack, timeline, and contact details.",
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
            },
          },
        },
      },
      "/api/health": {
        get: {
          summary: "Health check",
          operationId: "getHealth",
          responses: {
            "200": {
              description: "The API is up.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", const: "ok" },
                    },
                    required: ["status"],
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
