import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeToggle } from "../components/theme-toggle";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono-tight text-xs text-muted-foreground">404 / not_found</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          this page wandered off
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The URL didn't match anything I've built yet.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 font-mono-tight text-sm text-background transition-opacity hover:opacity-90"
          >
            ← back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          something broke
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try refreshing — if it persists, head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 font-mono-tight text-sm text-background hover:opacity-90"
          >
            try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 font-mono-tight text-sm text-foreground hover:bg-muted"
          >
            go home
          </a>
        </div>
      </div>
    </div>
  );
}

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : sys;
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
})();`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Debesh Ghorui — BTech CSE student, builder, tinkerer" },
      {
        name: "description",
        content:
          "Personal site of Debesh Ghorui — BTech Computer Science student building side projects, learning systems, and shipping ideas.",
      },
      { name: "author", content: "Debesh Ghorui" },
      { property: "og:title", content: "Debesh Ghorui" },
      {
        property: "og:description",
        content: "BTech CSE student building things on the web. Projects, notes, and signals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@DebeshGhorui" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

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
  const linkCls =
    "rounded-sm px-1 py-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4">
        <Link
          to="/"
          className="font-mono-tight text-sm font-medium text-foreground truncate rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          debesh ghorui
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 sm:gap-5 font-mono-tight text-sm text-muted-foreground"
        >
          <a href="#projects" className={linkCls}>
            projects
          </a>
          <a href="#stack" className={linkCls}>
            stack
          </a>
          <a href="#contact" className={linkCls}>
            contact
          </a>
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
      <a href="#main" className="skip-link">Skip to main content</a>
      <Nav />
      <Outlet />
      <footer className="mx-auto mt-24 max-w-3xl px-6 pb-12">
        <div className="border-t border-border/60 pt-6 font-mono-tight text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} debesh ghorui</span>
          <span>built with curiosity & caffeine ☕</span>
        </div>
      </footer>
    </QueryClientProvider>
  );
}
