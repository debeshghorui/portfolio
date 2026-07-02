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
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 font-mono-tight text-xs text-foreground/90 transition-colors hover:border-accent hover:text-accent"
          >
            <img
              src={`${stackLogoCDN}${s.slug}`}
              alt=""
              aria-hidden="true"
              width={14}
              height={14}
              loading="lazy"
              className={`h-3.5 w-3.5${s.invertOnDark ? " dark:invert" : ""}`}
            />
            {s.name}
          </li>
        ))}
      </ul>
    </Section>
  );
}
