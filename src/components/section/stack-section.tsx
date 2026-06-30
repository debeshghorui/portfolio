import { Section } from "@/components/section/section";
import { sections, stack } from "@/data";

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
            key={s}
            className="rounded-md border border-border bg-card px-2.5 py-1 font-mono-tight text-xs text-foreground/90 transition-colors hover:border-accent hover:text-accent"
          >
            {s}
          </li>
        ))}
      </ul>
    </Section>
  );
}
