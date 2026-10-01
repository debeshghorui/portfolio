import { createFileRoute } from "@tanstack/react-router";

import { site, timeline } from "@/data";

export const Route = createFileRoute("/credentials")({
  head: () => ({
    meta: [
      { title: `Study — ${site.name}` },
      {
        name: "description",
        content: `${site.name} is a third-year computer science student, batch of 2029, also studying with ChaiCode.`,
      },
      { property: "og:title", content: `Study — ${site.name}` },
      { property: "og:url", content: `${site.url}/credentials` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/credentials` }],
  }),
  component: CredentialsPage,
});

function isImage(href: string) {
  return /\.(png|jpe?g|webp|gif)$/i.test(href);
}

function CredentialsPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
        Study
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
        College, and the ChaiCode cohorts from the homepage.
      </p>
      <ol className="mt-8 space-y-8">
        {timeline.map((item) => (
          <li
            key={item.id}
            id={item.id}
            className="scroll-mt-24 border-t border-border pt-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-foreground text-pretty">
                {item.title}
              </h2>
              <span className="font-mono-tight text-[11px] text-muted-foreground tabular-nums">
                {item.when}
              </span>
            </div>
            <p className="mt-1 font-mono-tight text-xs text-muted-foreground text-pretty">
              {item.place}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground/90">
              {item.detail}
            </p>
            {item.certificate ? (
              <div className="mt-4">
                {isImage(item.certificate) ? (
                  <a
                    href={item.certificate}
                    aria-label={`Open certificate for ${item.title} in a new tab`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                  >
                    <img
                      src={item.certificate}
                      alt={`Certificate for ${item.title}`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[30rem] max-w-full rounded-md border border-border object-contain"
                    />
                  </a>
                ) : (
                  <a
                    href={item.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="accent-link font-mono-tight text-sm text-foreground"
                  >
                    View certificate (opens in new tab)
                  </a>
                )}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </main>
  );
}
