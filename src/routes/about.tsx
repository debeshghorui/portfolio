import { createFileRoute, Link } from "@tanstack/react-router";

import { TextPage } from "@/components/text-page";
import { posts, profile, projects, site, timeline, writingBlog } from "@/data";
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
    <TextPage
      title="About"
      subtitle="Who I am, what I study, and what's published here."
    >
      <p>
        {profile.greeting} {site.name}. {portfolioBio()} This site is the public
        record of that work: a personal portfolio, not a company.
      </p>
      <p>
        He is a computer science undergraduate in India, in the batch of 2029.
        The homepage badges say the same thing in shorter form: open source, in
        public, based in India.
      </p>
      <p>Current study, also listed on the homepage timeline:</p>
      <ul className="list-disc space-y-2 pl-5">
        {timeline.map((item) => (
          <li key={item.title}>
            {item.title} ({item.when}), {item.place}. {item.detail}
          </li>
        ))}
      </ul>
      <p>
        Projects, including ones that do not fit on the homepage, are on the{" "}
        <Link to="/projects" className="accent-link">
          projects page
        </Link>
        :
      </p>
      <ul className="list-disc space-y-2 pl-5">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="accent-link"
            >
              {project.name}
            </Link>
            . {project.description}
          </li>
        ))}
      </ul>
      <p>
        Writing is published on{" "}
        <a href={writingBlog.href} className="accent-link">
          {writingBlog.name}
        </a>{" "}
        and listed on the{" "}
        <Link to="/writing" className="accent-link">
          writing page
        </Link>
        . Recent titles:{" "}
        {posts
          .slice(0, 3)
          .map((post) => post.title)
          .join("; ")}
        .
      </p>
      <p>
        The current list lives on the homepage and at{" "}
        <a href="/api/portfolio.json" className="accent-link">
          /api/portfolio.json
        </a>
        . Contact details are on the{" "}
        <Link to="/contact" className="accent-link">
          contact page
        </Link>
        .
      </p>
    </TextPage>
  );
}
