import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ThemeToggle } from "../components/theme-toggle";
import { WebMcp } from "../components/webmcp";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { meta, navLinks, footerLinks, site, socials } from "@/data";

export function NotFoundComponent() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <div className="max-w-md">
        <p className="font-mono-tight text-xs text-muted-foreground">
          404 / not_found
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground text-balance">
          this page wandered off
        </h1>
        <p className="mt-3 text-sm text-muted-foreground text-pretty">
          The URL didn't match anything I've built yet.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 font-mono-tight text-sm text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ← back home
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <div className="max-w-md">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          something broke
        </h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Try refreshing — if it persists, head back home.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 font-mono-tight text-sm text-background hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 font-mono-tight text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            go home
          </Link>
        </div>
      </div>
    </main>
  );
}

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : sys;
    const el = document.documentElement;
    el.classList.toggle('dark', dark);
    el.style.colorScheme = dark ? 'dark' : 'light';
  } catch (_) {}
})();`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        { title: meta.title },
        { name: "description", content: meta.rootDescription },
        { name: "author", content: site.name },
        { name: "is-agentic-site-type", content: "content" },
        { property: "og:title", content: meta.ogTitle },
        { property: "og:description", content: meta.rootOgDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: site.url },
        { property: "og:image", content: `${site.url}/favicon.png` },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: site.handle },
      ],
      links: [
        { rel: "canonical", href: site.url },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "alternate",
          type: "text/markdown",
          href: "/index.md",
        },
        { rel: "ai-catalog", href: "/.well-known/ai-catalog.json" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        {
          rel: "preload",
          href: "/fonts/inter-latin.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
      ],
      scripts: [
        { children: themeInitScript },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            url: site.url,
            email: site.email,
            image: `${site.url}/favicon.png`,
            description: meta.description,
            jobTitle: "AI and backend engineer",
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
            },
            sameAs: socials
              .map((social) => social.href)
              .filter((href) => href.startsWith("http")),
          }),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Nav() {
  const scrolled = useScrolled();
  const linkCls =
    "rounded-sm px-1 py-1 text-muted-foreground transition-colors duration-200 ease-out-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const activeCls = "text-foreground";
  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "site-header sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        scrolled && "supports-[backdrop-filter]:bg-background/85",
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-x-2 gap-y-2 px-4 sm:gap-x-3 sm:px-6 py-3 sm:py-4">
        <Link
          to="/"
          className="shrink-0 rounded-sm font-mono-tight text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {site.nameShort}
        </Link>
        <nav
          aria-label="Primary"
          className="flex min-w-0 items-center justify-end gap-x-2 gap-y-1 font-mono-tight text-sm text-muted-foreground overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:overflow-visible"
        >
          {navLinks.map(({ href, label }) =>
            href.startsWith("/#") ? (
              <Link
                key={href}
                to="/"
                hash={href.replace("/#", "")}
                className={linkCls}
              >
                {label}
              </Link>
            ) : (
              <Link
                key={href}
                to={href as never}
                className={linkCls}
                activeProps={{ className: activeCls }}
              >
                {label}
              </Link>
            ),
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <WebMcp />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <Outlet />
      <footer className="mx-auto mt-24 max-w-3xl px-4 sm:px-6 pb-12">
        <nav
          aria-label="Site"
          className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border/60 pt-6 font-mono-tight text-xs text-muted-foreground"
        >
          {footerLinks.map(({ href, label, ...rest }) => {
            const isExternal = (rest as { external?: boolean }).external;
            const cls =
              "transition-colors duration-200 ease-out-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
            return isExternal ? (
              <a key={href} href={href} className={cls}>
                {label}
              </a>
            ) : (
              <Link key={href} to={href as never} className={cls}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 font-mono-tight text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {site.nameShort}
          </span>
          <span>{site.footerTagline}</span>
        </div>
      </footer>
    </QueryClientProvider>
  );
}
