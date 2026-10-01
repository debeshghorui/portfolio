import { useState } from "react";

import { Section } from "@/components/section/section";
import { sections, stack, stackLogoCDN } from "@/data";

export function StackSection() {
  return (
    <Section
      id={sections.stack.id}
      title={sections.stack.title}
      subtitle={sections.stack.subtitle}
    >
      <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
        {stack.map((s) => (
          <li
            key={s.name}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 font-mono-tight text-xs text-foreground/90"
          >
            <StackLogo slug={s.slug} invertOnDark={s.invertOnDark} />
            {s.name}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function StackLogo({
  slug,
  invertOnDark,
}: {
  slug: string;
  invertOnDark?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-3.5 w-3.5 rounded-[2px] bg-muted"
      />
    );
  }
  return (
    <img
      src={`${stackLogoCDN}${slug}`}
      alt=""
      aria-hidden="true"
      width={14}
      height={14}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className={`h-3.5 w-3.5${invertOnDark ? " dark:invert" : ""}`}
    />
  );
}
