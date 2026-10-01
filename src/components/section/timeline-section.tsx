import { Link } from "@tanstack/react-router";

import { Section } from "@/components/section/section";
import { sections, timeline } from "@/data";

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      title={sections.timeline.title}
      subtitle={sections.timeline.subtitle}
    >
      <ol className="relative space-y-5 border-l border-border pl-5">
        {timeline.map((item) => (
          <li key={item.id} className="timeline-item relative">
            <span className="timeline-dot absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-medium text-foreground text-pretty">
                <Link to="/credentials" hash={item.id} className="accent-link">
                  {item.title}
                </Link>
              </h3>
              <span className="font-mono-tight text-[11px] text-muted-foreground tabular-nums">
                {item.when}
              </span>
            </div>
            <p className="font-mono-tight text-xs text-muted-foreground text-pretty">
              {item.place}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
              {item.detail}
            </p>
            {item.certificate ? (
              <a
                href={item.certificate}
                className="accent-link mt-2 inline-flex font-mono-tight text-xs text-foreground"
              >
                View certificate
              </a>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
