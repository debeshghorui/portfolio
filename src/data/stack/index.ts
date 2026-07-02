export const stackLogoCDN = "https://cdn.simpleicons.org/";

export const stack: readonly {
  name: string;
  slug: string;
  invertOnDark?: boolean;
}[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs", invertOnDark: true },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Shadcn UI", slug: "shadcnui", invertOnDark: true },
  { name: "Expo", slug: "expo", invertOnDark: true },
  { name: "Bun", slug: "bun", invertOnDark: true },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express.js", slug: "express", invertOnDark: true },
  { name: "tRPC", slug: "trpc" },
  { name: "Prisma", slug: "prisma" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "Linux", slug: "linux" },
  { name: "Git", slug: "git" },
] as const;
