import { Section } from "@/components/section/section";
import { sections, timeline } from "@/data";

export function TimelineSection() {
  return (
    <Section
      title={sections.timeline.title}
      subtitle={sections.timeline.subtitle}
    >
      <ol className="relative space-y-5 border-l border-border pl-5">
        {timeline.map((t) => (
          <li key={t.title} className="relative">
            <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-medium text-foreground">
                {t.title}
              </h3>
              <span className="font-mono-tight text-[11px] text-muted-foreground">
                {t.when}
              </span>
            </div>
            <p className="font-mono-tight text-xs text-muted-foreground">
              {t.place}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t.detail}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
