import { createFileRoute } from "@tanstack/react-router";

import { TextPage } from "@/components/text-page";
import { profile, projects, site, timeline } from "@/data";
import { portfolioBio } from "@/agent/markdown";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${site.name}` },
      {
        name: "description",
        content: `Who ${site.name} is, what he studies, and the projects published on this portfolio.`,
      },
      { property: "og:title", content: `About — ${site.name}` },
      { property: "og:url", content: `${site.url}/about` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <TextPage title="About">
      <p>
        {profile.greeting} {site.name}. {portfolioBio()} This site is the public record of that
        work: a personal portfolio, not a company.
      </p>
      <p>
        He is a computer science undergraduate in India, in the batch of 2029. The homepage badges
        say the same thing in shorter form: open source, in public, based in India.
      </p>
      <p>Current study, also listed on the homepage timeline:</p>
      <ul className="list-disc space-y-2 pl-5">
        {timeline.map((item) => (
          <li key={item.title}>
            {item.title} ({item.when}), {item.place}. {item.detail}
          </li>
        ))}
      </ul>
      <p>Projects linked from the homepage:</p>
      <ul className="list-disc space-y-2 pl-5">
        {projects.map((project) => (
          <li key={project.name}>
            {project.name}. {project.description}
          </li>
        ))}
      </ul>
      <p>
        The current list lives on the homepage and at{" "}
        <a href="/api/portfolio.json" className="accent-link">
          /api/portfolio.json
        </a>
        . Contact details are on the{" "}
        <a href="/contact" className="accent-link">
          contact page
        </a>
        .
      </p>
    </TextPage>
  );
}
