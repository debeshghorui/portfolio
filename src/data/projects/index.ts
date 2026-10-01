import bookMyTicketReadme from "@/content/projects/book-my-ticket.md?raw";
import cExtensionsReadme from "@/content/projects/c-extensions.md?raw";
import chaitailwindReadme from "@/content/projects/chaitailwind.md?raw";
import codeboxReadme from "@/content/projects/codebox.md?raw";
import databaseDesignReadme from "@/content/projects/database-design.md?raw";
import econirvanaReadme from "@/content/projects/econirvana.md?raw";
import oneMillionCheckboxesReadme from "@/content/projects/one-million-checkboxes.md?raw";
import selfConsistencyReadme from "@/content/projects/self-consistency-answer-engine.md?raw";

export type Project = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  stack: readonly string[];
  featured: boolean;
  /** GitHub repository name under github.com/debeshghorui */
  repo?: string;
  readme?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "oidc-server",
    name: "OIDC Server",
    tag: "Alpha • v0.6.0",
    description:
      "A production-focused OpenID Connect and OAuth 2.0 server built for my own projects. Supports JWT, JWKS, PKCE, RBAC, and secure authentication workflows with SDKs planned.",
    stack: ["Node.js", "TypeScript", "PostgreSQL"],
    featured: true,
    repo: "OIDC-Server",
  },
  {
    slug: "code-argus",
    name: "Code Argus AI",
    tag: "Alpha",
    description:
      "An AI-powered pull request review platform that analyzes code changes, suggests improvements, and helps developers catch issues before merging.",
    stack: ["Next.js", "OpenAI", "TypeScript"],
    featured: true,
    repo: "codeargus",
  },
  {
    slug: "shipflow",
    name: "ShipFlow AI",
    tag: "Hackathon",
    description:
      "An AI-powered platform that transforms product ideas into structured development plans, PRDs, and implementation workflows for faster software delivery.",
    stack: ["Next.js", "Node.js", "AI"],
    featured: true,
  },
  {
    slug: "chaitailwind",
    name: "ChaiTailwind",
    tag: "v1.0.0",
    description:
      "A lightweight utility-first CSS framework built from scratch to explore compiler design, utility generation, and modern styling workflows.",
    stack: ["TypeScript", "Node.js", "CSS"],
    featured: true,
    repo: "chaitailwind",
    readme: chaitailwindReadme,
  },
  {
    slug: "codebox",
    name: "CodeBox",
    tag: "Engine",
    description:
      "A Judge0-compatible code execution engine that runs submitted code in Firecracker microVMs or Docker and returns the result.",
    stack: ["Node.js", "Docker", "Redis"],
    featured: false,
    repo: "Codebox",
    readme: codeboxReadme,
  },
  {
    slug: "one-million-checkboxes",
    name: "1M Checkboxes",
    tag: "Realtime",
    description:
      "A distributed checkbox grid with WebSocket sync, Redis-backed state, and rate limiting across instances.",
    stack: ["Node.js", "Redis", "WebSockets"],
    featured: false,
    repo: "1M-Checkboxes",
    readme: oneMillionCheckboxesReadme,
  },
  {
    slug: "self-consistency-answer-engine",
    name: "Self-Consistency Answer Engine",
    tag: "Experiment",
    description:
      "Runs one prompt through multiple model providers, then uses a judge step to pick the strongest answer.",
    stack: ["Bun", "TypeScript", "AI"],
    featured: false,
    repo: "Self-Consistency_Answer_Engine",
    readme: selfConsistencyReadme,
  },
  {
    slug: "book-my-ticket",
    name: "Book My Ticket",
    tag: "Hackathon",
    description:
      "A movie seat booking app with JWT auth and PostgreSQL transactions, built for the ChaiCode web cohort hackathon.",
    stack: ["Express.js", "PostgreSQL", "JWT"],
    featured: false,
    repo: "book-my-ticket",
    readme: bookMyTicketReadme,
  },
  {
    slug: "econirvana",
    name: "EcoNirvana",
    tag: "Web",
    description:
      "An e-waste recycling platform with drop-off, pickup, and a points system for recycling electronics.",
    stack: ["Next.js", "Tailwind CSS"],
    featured: false,
    repo: "EcoNirvana",
    readme: econirvanaReadme,
  },
  {
    slug: "database-design",
    name: "Database Design",
    tag: "SQL",
    description:
      "Schema case studies for clinics, parking, fitness coaching, thrift stores, and other real systems.",
    stack: ["PostgreSQL", "SQL"],
    featured: false,
    repo: "Database-Design",
    readme: databaseDesignReadme,
  },
  {
    slug: "c-extensions",
    name: "C Extensions",
    tag: "Library",
    description:
      "Header files and utility functions that fill gaps in the C standard library.",
    stack: ["C"],
    featured: false,
    repo: "C-Extensions",
    readme: cExtensionsReadme,
  },
];

export function featuredProjects() {
  return projects.filter((project) => project.featured);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectRepoUrl(project: Project) {
  return project.repo
    ? `https://github.com/debeshghorui/${project.repo}`
    : undefined;
}
