import { Github, Mail } from "lucide-react";
import { Section } from "@/components/section/section";
import { contact, links, sections, site } from "@/data";

export function ContactSection() {
  return (
    <Section
      id={sections.contact.id}
      title={sections.contact.title}
      subtitle={sections.contact.subtitle}
    >
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 ease-out-soft hover:border-accent/30">
        <p className="text-base text-foreground">
          {contact.introBeforeX}{" "}
          <a
            href={links.x}
            target="_blank"
            rel="noreferrer"
            aria-label={`DM ${site.name} on X (opens in new tab)`}
            className="accent-link font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            {contact.xLinkText}
          </a>{" "}
          {contact.introBetween}{" "}
          <a
            href={links.email}
            className="accent-link font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            {contact.emailLinkText}
          </a>
          {contact.introAfter}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={links.email}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground px-4 py-2.5 font-mono-tight text-xs text-background interactive-card hover:bg-foreground/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {site.email}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 font-mono-tight text-xs text-foreground interactive-card hover:bg-muted active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />{" "}
            {contact.githubButtonLabel}
          </a>
        </div>
      </div>
    </Section>
  );
}
