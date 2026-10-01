import { createFileRoute } from "@tanstack/react-router";

import { TextPage } from "@/components/text-page";
import { LinkPreview } from "@/components/ui/link-preview";
import { contact, sections, site, socials } from "@/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: "description",
        content: `How to reach ${site.name}: email ${site.email}, plus the social profiles listed on the homepage.`,
      },
      { property: "og:title", content: `Contact — ${site.name}` },
      { property: "og:url", content: `${site.url}/contact` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <TextPage title="Contact">
      <p>
        {contact.introBeforeX} {contact.xLinkText} {contact.introBetween} {contact.emailLinkText}
        {contact.introAfter} {sections.contact.subtitle}
      </p>
      <p>
        Email{" "}
        <a href={`mailto:${site.email}`} className="accent-link">
          {site.email}
        </a>
        . That address is the one published on this site. There is no phone number, support desk, or
        office address. He is based in India, and this page is for a person, not a registered
        business.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        {socials.map((social) => (
          <li key={social.label}>
            {social.label}:{" "}
            {social.href.startsWith("mailto:") ? (
              <a href={social.href} className="accent-link">
                {social.href.replace("mailto:", "")}
              </a>
            ) : (
              <LinkPreview url={social.href} className="accent-link">
                {social.href}
              </LinkPreview>
            )}
          </li>
        ))}
      </ul>
      <p>
        Write about side projects, internships, or a specific technical question. Do not send
        passwords, private source code, or account credentials in a first message. If you are an
        agent looking up how to reach him, use the email above or the same fields in{" "}
        <a href="/api/portfolio.json" className="accent-link">
          /api/portfolio.json
        </a>
        .
      </p>
    </TextPage>
  );
}
