export const stackLogoCDN = "https://cdn.simpleicons.org/";

export const stack: readonly {
    name: string;
    slug: string;
    hex?: string;
}[] = [
    { name: "TypeScript", slug: "typescript", hex: "#3178C6" },
    { name: "JavaScript", slug: "javascript", hex: "#F7DF1E" },
    { name: "React", slug: "react", hex: "#61DAFB" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "Tailwind CSS", slug: "tailwindcss", hex: "#06B6D4" },
    { name: "Shadcn UI", slug: "shadcnui" },
    { name: "Expo", slug: "expo" },
    { name: "Bun", slug: "bun" },
    { name: "Node.js", slug: "nodedotjs", hex: "#5FA04E" },
    { name: "Express.js", slug: "express" },
    { name: "tRPC", slug: "trpc", hex: "#2596BE" },
    { name: "Prisma", slug: "prisma" },
    { name: "PostgreSQL", slug: "postgresql", hex: "#4169E1" },
    { name: "MongoDB", slug: "mongodb", hex: "#47A248" },
    { name: "Redis", slug: "redis", hex: "#FF4438" },
    { name: "Docker", slug: "docker", hex: "#2496ED" },
    { name: "Linux", slug: "linux", hex: "#FCC624" },
    { name: "Git", slug: "git", hex: "#F05032" },
] as const;
