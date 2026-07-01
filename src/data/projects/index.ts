import { links } from "../links";

export const projects = [
  {
    name: "OIDC Server",
    tag: "Alpha • v0.6.0",
    description:
      "A production-focused OpenID Connect and OAuth 2.0 server built for my own projects. Supports JWT, JWKS, PKCE, RBAC, and secure authentication workflows with SDKs planned.",
    href: "https://github.com/debeshghorui/OIDC-Server",
    stack: ["Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    name: "Code Argus AI",
    tag: "Alpha",
    description:
      "An AI-powered pull request review platform that analyzes code changes, suggests improvements, and helps developers catch issues before merging.",
    href: "https://github.com/debeshghorui/codeargus",
    stack: ["Next.js", "OpenAI", "TypeScript"],
  },
  {
    name: "ShipFlow AI",
    tag: "Hackathon",
    description:
      "An AI-powered platform that transforms product ideas into structured development plans, PRDs, and implementation workflows for faster software delivery.",
    href: links.github,
    stack: ["Next.js", "Node.js", "AI"],
  },
  {
    name: "ChaiTailwind",
    tag: "v1.0.0",
    description:
      "A lightweight utility-first CSS framework built from scratch to explore compiler design, utility generation, and modern styling workflows.",
    href: "https://github.com/debeshghorui/chaitailwind",
    stack: ["TypeScript", "Node.js", "CSS"],
  },
] as const;
