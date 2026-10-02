import { createFileRoute } from "@tanstack/react-router";

import { TextPage } from "@/components/text-page";
import { site } from "@/data";

export const Route = createFileRoute("/privacy")({
    head: () => ({
        meta: [
            { title: `Privacy — ${site.name}` },
            {
                name: "description",
                content: `What ${site.url} stores. A personal portfolio with a local theme preference and no accounts.`,
            },
            { property: "og:title", content: `Privacy — ${site.name}` },
            { property: "og:url", content: `${site.url}/privacy` },
        ],
        links: [{ rel: "canonical", href: `${site.url}/privacy` }],
    }),
    component: PrivacyPage,
});

function PrivacyPage() {
    return (
        <TextPage title="Privacy">
            <p>
                {site.url} is a personal portfolio published by {site.name}. The
                pages are content served by a Cloudflare Worker. The site does
                not run accounts, does not ask you to sign in, and does not sell
                personal information.
            </p>
            <p>
                Your browser may keep a theme preference in localStorage on your
                device so the page can reopen in light or dark mode. That value
                stays in the browser. The site does not send it to a server, and
                there is no contact form that stores messages.
            </p>
            <p>
                Cloudflare serves the Worker and processes the usual connection
                data for a public website, including IP address and the
                requested URL, under Cloudflare&apos;s own policies. This
                portfolio does not add a separate analytics product or
                advertising pixel.
            </p>
            <p>
                The public API at /api/portfolio.json returns the same
                information already visible on the homepage: profile, projects,
                stack, timeline, and contact details. It does not accept
                personal data. Requests that miss a route, or that use a method
                other than GET or HEAD, receive a JSON problem response and are
                not stored as submissions.
            </p>
            <p>
                Questions about this page can go to{" "}
                <a href={`mailto:${site.email}`} className="accent-link">
                    {site.email}
                </a>
                .
            </p>
        </TextPage>
    );
}
