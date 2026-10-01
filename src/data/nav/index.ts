type NavLink = { href: string; label: string };

export const navLinks: readonly NavLink[] = [
  { href: "/projects", label: "projects" },
  { href: "/writing", label: "writing" },
  { href: "/#stack", label: "stack" },
  { href: "/contact", label: "contact" },
];

type FooterLink = { href: string; label: string; external?: boolean };

// Footer links. `external: true` renders a plain <a> (no client navigation).
export const footerLinks: readonly FooterLink[] = [
  { href: "/projects", label: "projects" },
  { href: "/writing", label: "writing" },
  { href: "/credentials", label: "study" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
  { href: "/privacy", label: "privacy" },
  { href: "/developers", label: "api" },
  { href: "/openapi.json", label: "openapi", external: true },
  { href: "/llms.txt", label: "llms.txt", external: true },
];
