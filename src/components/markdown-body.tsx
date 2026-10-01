import { useId, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

function safeUrl(
  url: string,
  repo: string | undefined,
  kind: "link" | "image",
): string | null {
  const trimmed = url.trim();
  if (/^(javascript|data):/i.test(trimmed)) return null;
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("#")) return trimmed;
  if (!repo) return null;
  const path = trimmed.replace(/^\.\//, "").replace(/^\//, "");
  if (kind === "image") {
    return `https://raw.githubusercontent.com/debeshghorui/${repo}/main/${path}`;
  }
  return `https://github.com/debeshghorui/${repo}/blob/main/${path}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Strip markdown emphasis/inline code for slug and TOC text.
function plainText(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
}

function inline(
  text: string,
  repo: string | undefined,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Supports: linked image [![alt](img)](href), image ![alt](img),
  // link [label](href), inline code `code`, bold **text**.
  const pattern =
    /(\[!\[([^\]]*)\]\([^)\s]+\)\]\(([^)\s]+)\)|!\[([^\]]*)\]\(([^)\s]+)\)|\[([^\]]*)\]\(([^)\s]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const key = `${keyPrefix}-${index}`;

    // Linked image: [![alt](img)](href)
    if (match[2] !== undefined && match[3] !== undefined) {
      const alt = match[2];
      const imgSrc = safeUrl(match[3], repo, "image");
      const href = safeUrl(match[4], repo, "link");
      if (imgSrc && href) {
        const external = /^https?:/i.test(href);
        nodes.push(
          <a
            key={key}
            href={href}
            className="inline-block"
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <img
              src={imgSrc}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="my-3 inline-block max-h-40 max-w-full align-middle"
            />
          </a>,
        );
      } else if (alt) {
        nodes.push(alt);
      }
    } else if (match[5] !== undefined && match[6] !== undefined) {
      // Image: ![alt](img)
      const alt = match[5];
      const url = safeUrl(match[6], repo, "image");
      if (url) {
        nodes.push(
          <img
            key={key}
            src={url}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="my-3 max-h-80 max-w-full rounded-md border border-border object-contain"
          />,
        );
      } else if (alt) {
        nodes.push(alt);
      }
    } else if (match[7] !== undefined && match[8] !== undefined) {
      // Link [label](href)
      const label = match[7];
      const url = safeUrl(match[8], repo, "link");
      if (url) {
        const external = /^https?:/i.test(url);
        nodes.push(
          <a
            key={key}
            href={url}
            className="accent-link"
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(label);
      }
    } else if (match[9] !== undefined) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-muted px-1 py-0.5 font-mono-tight text-[0.85em]"
        >
          {match[9]}
        </code>,
      );
    } else if (match[10] !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-foreground">
          {match[10]}
        </strong>,
      );
    }
    last = start + match[0].length;
    index += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const labelId = useId();
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };
  return (
    <div className="relative my-4">
      {lang ? (
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 rounded border border-border bg-background/80 px-1.5 py-0.5 font-mono-tight text-[10px] uppercase tracking-wide text-muted-foreground"
        >
          {lang}
        </span>
      ) : null}
      <pre className="overflow-x-auto rounded-md border border-border bg-card p-4 font-mono-tight text-xs leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy code to clipboard"
        aria-describedby={copied ? labelId : undefined}
        className="absolute bottom-2 right-2 inline-flex min-h-9 items-center gap-1 rounded-md border border-border bg-background px-2 py-1 font-mono-tight text-[10px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {copied ? (
          <Check className="h-3 w-3" aria-hidden="true" />
        ) : (
          <Copy className="h-3 w-3" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      {copied ? (
        <span id={labelId} className="sr-only" aria-live="polite">
          Code copied to clipboard.
        </span>
      ) : null}
    </div>
  );
}

type Heading = { level: 2 | 3; id: string; text: string };

function splitTableRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

function parseAligns(
  separator: string,
): ("left" | "center" | "right" | undefined)[] {
  return splitTableRow(separator).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return undefined;
  });
}

function isTableStart(lines: string[], cursor: number): boolean {
  const line = lines[cursor];
  if (!line || !/\|/.test(line)) return false;
  const next = lines[cursor + 1];
  if (!next) return false;
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(next);
}

function renderText(
  source: string,
  repo: string | undefined,
  keyPrefix: string,
  headings: Heading[],
): ReactNode[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  const push = (node: ReactNode) => {
    blocks.push(node);
    index += 1;
  };

  let cursor = 0;
  while (cursor < lines.length) {
    const line = lines[cursor];
    if (!line.trim()) {
      cursor += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const raw = heading[2];
      const content = inline(raw, repo, `${keyPrefix}-h-${index}`);
      const id = slugify(plainText(raw));
      const anchor = (children: ReactNode, className: string, elId: string) => (
        <a href={`#${elId}`} className="group no-underline">
          <span className={className}>{children}</span>
          <span
            aria-hidden="true"
            className="ml-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            #
          </span>
        </a>
      );
      if (level === 1) {
        push(
          <h2
            id={id}
            className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
          >
            {anchor(content, "text-foreground", id)}
          </h2>,
        );
      } else if (level === 2) {
        headings.push({ level: 2, id, text: plainText(raw) });
        push(
          <h3
            id={id}
            className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight text-foreground"
          >
            {anchor(content, "text-foreground", id)}
          </h3>,
        );
      } else {
        headings.push({ level: 3, id, text: plainText(raw) });
        push(
          <h4
            id={id}
            className="mt-6 scroll-mt-24 text-base font-semibold text-foreground"
          >
            {anchor(content, "text-foreground", id)}
          </h4>,
        );
      }
      cursor += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      push(<hr className="my-6 border-border" />);
      cursor += 1;
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quote: string[] = [];
      while (cursor < lines.length && lines[cursor].trim().startsWith(">")) {
        quote.push(lines[cursor].replace(/^\s*>\s?/, ""));
        cursor += 1;
      }
      push(
        <blockquote className="my-4 border-l-2 border-accent/70 pl-4 text-foreground/80">
          {inline(quote.join(" "), repo, `${keyPrefix}-q-${index}`)}
        </blockquote>,
      );
      continue;
    }

    // GFM table: header row, separator row of | --- |, then body rows.
    if (isTableStart(lines, cursor)) {
      const headerCells = splitTableRow(line);
      const aligns = parseAligns(lines[cursor + 1]);
      const body: string[] = [];
      cursor += 2;
      while (
        cursor < lines.length &&
        /\|/.test(lines[cursor]) &&
        lines[cursor].trim()
      ) {
        body.push(lines[cursor]);
        cursor += 1;
      }
      push(
        <div className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {headerCells.map((cell, i) => (
                  <th
                    key={i}
                    style={aligns[i] ? { textAlign: aligns[i] } : undefined}
                    className="border-b border-border px-3 py-2 text-left font-semibold text-foreground"
                  >
                    {inline(cell, repo, `${keyPrefix}-th-${index}-${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => {
                const cells = splitTableRow(row);
                return (
                  <tr key={ri}>
                    {headerCells.map((_, ci) => (
                      <td
                        key={ci}
                        style={
                          aligns[ci] ? { textAlign: aligns[ci] } : undefined
                        }
                        className="border-b border-border/60 px-3 py-2 align-top text-foreground/90"
                      >
                        {inline(
                          cells[ci] ?? "",
                          repo,
                          `${keyPrefix}-td-${index}-${ri}-${ci}`,
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (cursor < lines.length && /^\s*[-*]\s+/.test(lines[cursor])) {
        items.push(lines[cursor].replace(/^\s*[-*]\s+/, ""));
        cursor += 1;
      }
      push(
        <ul className="my-3 list-disc space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {inline(item, repo, `${keyPrefix}-ul-${index}-${itemIndex}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (cursor < lines.length && /^\s*\d+\.\s+/.test(lines[cursor])) {
        items.push(lines[cursor].replace(/^\s*\d+\.\s+/, ""));
        cursor += 1;
      }
      push(
        <ol className="my-3 list-decimal space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {inline(item, repo, `${keyPrefix}-ol-${index}-${itemIndex}`)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      cursor < lines.length &&
      lines[cursor].trim() &&
      !/^(#{1,3})\s+/.test(lines[cursor]) &&
      !/^---+$/.test(lines[cursor].trim()) &&
      !lines[cursor].trim().startsWith(">") &&
      !/^\s*[-*]\s+/.test(lines[cursor]) &&
      !/^\s*\d+\.\s+/.test(lines[cursor]) &&
      !isTableStart(lines, cursor)
    ) {
      paragraph.push(lines[cursor].trim());
      cursor += 1;
    }
    push(
      <p className="my-3 text-pretty">
        {inline(paragraph.join(" "), repo, `${keyPrefix}-p-${index}`)}
      </p>,
    );
  }

  return blocks;
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  const h2s = headings.filter((h) => h.level === 2);
  if (h2s.length < 4) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-md border border-border bg-card p-4"
    >
      <p className="mb-2 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
        Contents
      </p>
      <ol className="list-decimal space-y-1 pl-5 text-sm">
        {h2s.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="accent-link">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function MarkdownBody({
  source,
  repo,
}: {
  source: string;
  repo?: string;
}) {
  // Split on fenced code blocks first so table/heading parsing ignores their
  // contents.
  const parts = source.replace(/\r\n/g, "\n").split(/```/);
  const blocks: ReactNode[] = [];
  const headings: Heading[] = [];

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      const newline = part.indexOf("\n");
      const lang = newline === -1 ? undefined : part.slice(0, newline).trim();
      const code = newline === -1 ? part : part.slice(newline + 1);
      blocks.push(
        <CodeBlock
          key={`code-${index}`}
          code={code.replace(/\n$/, "")}
          lang={lang || undefined}
        />,
      );
      return;
    }
    blocks.push(...renderText(part, repo, `b${index}`, headings));
  });

  return (
    <div className="max-w-prose space-y-1 text-sm leading-relaxed text-foreground/90">
      <TableOfContents headings={headings} />
      {blocks}
    </div>
  );
}
