export const navLinks = [
    { href: "#projects", label: "projects" },
    { href: "#stack", label: "stack" },
    { href: "#contact", label: "contact" },
] as const;

export const footerLinks = {
    site: [
        { href: "/about", label: "about" },
        { href: "/contact", label: "contact" },
        { href: "/privacy", label: "privacy" },
    ],
    machines: [
        { href: "/developers", label: "api" },
        { href: "/openapi.json", label: "openapi" },
        { href: "/llms.txt", label: "llms.txt" },
    ],
} as const;
