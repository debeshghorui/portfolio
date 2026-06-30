import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, MapPin, GraduationCap } from "lucide-react";
import avatar from "@/assets/avatar.png";
import { ContributionGrid } from "@/components/contribution-grid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Debesh Ghorui — BTech CSE student, builder, tinkerer" },
      {
        name: "description",
        content:
          "Personal site of Debesh Ghorui — BTech CSE student building side projects, learning systems, and shipping ideas on the web.",
      },
      { property: "og:title", content: "Debesh Ghorui" },
      {
        property: "og:description",
        content:
          "BTech CSE student. Building, breaking, and learning in public. Projects, notes, and signals.",
      },
    ],
  }),
  component: Home,
});

const socials = [
  { href: "https://github.com/debeshghorui", label: "GitHub", Icon: Github },
  {
    href: "https://x.com/DebeshGhorui",
    label: "X",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.86l-5.37-7.02L4.06 22H.8l8.03-9.18L.75 2h7.02l4.86 6.42L18.24 2Zm-1.2 18h1.9L7.05 4H5.04l12 16Z" />
      </svg>
    ),
  },
  { href: "https://www.linkedin.com/in/debeshghorui/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com/debesh.dev", label: "Instagram", Icon: Instagram },
  { href: "mailto:hello@debesh.dev", label: "Email", Icon: Mail },
];

const projects = [
  {
    name: "Pulse",
    tag: "Realtime",
    description:
      "A tiny realtime dashboard for tracking study streaks and side-project momentum. WebSockets, Postgres, and a stupid amount of polish.",
    href: "https://github.com/debeshghorui",
    stack: ["Next.js", "Supabase", "Tailwind"],
  },
  {
    name: "ChaiCompiler",
    tag: "Tooling",
    description:
      "A toy compiler that turns a tiny ML-ish language into WebAssembly. Built to actually understand parsers, ASTs, and codegen.",
    href: "https://github.com/debeshghorui",
    stack: ["Rust", "WASM", "Pratt parser"],
  },
  {
    name: "Notesync",
    tag: "Productivity",
    description:
      "End-to-end encrypted markdown notes that sync across devices over CRDTs. My excuse to learn Yjs and conflict-free editing.",
    href: "https://github.com/debeshghorui",
    stack: ["React", "Yjs", "Cloudflare"],
  },
  {
    name: "campusbot",
    tag: "AI",
    description:
      "A RAG-based chatbot that answers questions from my college's handbook PDFs. Local LLM, vector store, ~300 lines of glue.",
    href: "https://github.com/debeshghorui",
    stack: ["Python", "FAISS", "Ollama"],
  },
];

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Rust",
  "Postgres",
  "Tailwind",
  "Docker",
  "Linux",
  "Git",
  "Figma",
];

const timeline = [
  {
    when: "2023 — Present",
    title: "BTech, Computer Science & Engineering",
    place: "Undergraduate",
    detail:
      "Studying systems, algorithms, and distributed computing. Spending most weekends on side projects that don't ship.",
  },
  {
    when: "2025",
    title: "Open-source contributor",
    place: "Various repos",
    detail:
      "Small but real PRs to TypeScript tooling and React component libraries. Bugs are great teachers.",
  },
  {
    when: "2024",
    title: "Freelance — web work",
    place: "Remote",
    detail:
      "Built marketing sites and lightweight dashboards for early-stage founders. Learned to ship fast and listen harder.",
  },
];

function Home() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16">
      {/* HERO */}
      <section aria-labelledby="hero-name" className="flex flex-col gap-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <img
            src={avatar}
            alt="Portrait sketch of Debesh Ghorui"
            width={72}
            height={72}
            className="h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 rounded-full border border-border bg-card object-cover shadow-sm"
          />
          <div className="flex min-w-0 flex-col">
            <span className="font-mono-tight text-xs text-muted-foreground">
              hey, I'm
            </span>
            <h1
              id="hero-name"
              className="truncate text-2xl sm:text-4xl font-semibold tracking-tight text-foreground"
            >
              Debesh Ghorui
            </h1>
          </div>
        </div>

        <p className="font-mono-tight text-sm text-muted-foreground">
          BTech CSE student · web tinkerer · perpetual learner
        </p>

        <p className="max-w-2xl text-balance text-base leading-relaxed text-foreground/90">
          I'm a Computer Science undergrad who got obsessed with the web sometime
          around freshman year and never recovered. I build small things end-to-end
          — front-end, back-end, the awkward bits in between — mostly to satisfy
          curiosity, sometimes to{" "}
          <span className="bg-[linear-gradient(transparent_62%,var(--accent-glow)_62%)] px-0.5">
            actually solve a problem
          </span>
          . When I'm not coding I'm reading distributed systems papers I don't
          fully understand yet.
        </p>

        <ul aria-label="Social profiles" className="flex flex-wrap items-center gap-2 sm:gap-3 list-none p-0 m-0">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in new tab)`}
                className="inline-flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="h-4 w-4" aria-hidden="true" focusable="false" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono-tight text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" aria-hidden="true" /> 240 followers · 38 repos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> India
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" /> CSE undergrad, batch of '27
          </span>
        </div>
      </section>

      {/* ACTIVITY */}
      <Section title="Activity" subtitle="GitHub-ish contributions over the last year.">
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <ContributionGrid />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Projects"
        subtitle="Things I've built — some shipped, some half-finished, all educational."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} — ${p.tag} project (opens in new tab)`}
              className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--accent)_30%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-base font-semibold text-foreground">{p.name}</span>
                  <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight text-[10px] uppercase tracking-wide text-muted-foreground">
                    {p.tag}
                  </span>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-1 font-mono-tight text-[11px] text-muted-foreground">
                {p.stack.join(" · ")}
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* STACK */}
      <Section id="stack" title="Stack" subtitle="The tools I reach for first.">
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-border bg-card px-2.5 py-1 font-mono-tight text-xs text-foreground/90 transition-colors hover:border-accent hover:text-accent"
            >
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* TIMELINE */}
      <Section title="Currently" subtitle="What I'm spending my hours on.">
        <ol className="relative space-y-5 border-l border-border pl-5">
          {timeline.map((t) => (
            <li key={t.title} className="relative">
              <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-medium text-foreground">{t.title}</h3>
                <span className="font-mono-tight text-[11px] text-muted-foreground">
                  {t.when}
                </span>
              </div>
              <p className="font-mono-tight text-xs text-muted-foreground">{t.place}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        title="Say hi"
        subtitle="I'm always up for talking about side projects, internships, or weird ideas."
      >
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
          <p className="text-base text-foreground">
            The fastest way to reach me is{" "}
            <a
              href="https://x.com/DebeshGhorui"
              target="_blank"
              rel="noreferrer"
              aria-label="DM Debesh on X (opens in new tab)"
              className="accent-link font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              a DM on X
            </a>{" "}
            or{" "}
            <a
              href="mailto:hello@debesh.dev"
              className="accent-link font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              an email
            </a>
            . I read everything, I reply to most.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="mailto:hello@debesh.dev"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground px-4 py-2.5 font-mono-tight text-xs text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" /> hello@debesh.dev
            </a>
            <a
              href="https://github.com/debeshghorui"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 font-mono-tight text-xs text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> github
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <div className="mb-5">
        <h2 className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-foreground/80">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
