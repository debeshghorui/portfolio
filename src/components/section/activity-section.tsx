import { ContributionGrid } from "@/components/contribution-grid";
import { Section } from "@/components/section/section";
import { sections } from "@/data";

export function ActivitySection() {
  return (
    <Section
      title={sections.activity.title}
      subtitle={sections.activity.subtitle}
    >
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <ContributionGrid />
      </div>
    </Section>
  );
}
