import { links } from "../links";

export type SocialIcon = "github" | "x" | "linkedin" | "instagram" | "mail";

export const socials: { href: string; label: string; icon: SocialIcon }[] = [
  { href: links.github, label: "GitHub", icon: "github" },
  { href: links.x, label: "X", icon: "x" },
  { href: links.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: links.instagram, label: "Instagram", icon: "instagram" },
  { href: links.email, label: "Email", icon: "mail" },
];

export type HeroBadgeIcon = "github" | "map-pin" | "graduation-cap";

export const heroBadges: { icon: HeroBadgeIcon; text: string }[] = [
  { icon: "github", text: "open-source · in public" },
  { icon: "map-pin", text: "India" },
  { icon: "graduation-cap", text: "CSE undergrad, batch of '27" },
];
