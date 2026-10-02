import { GitHubActivity } from "@/components/spaceui/github-activity";
import { Section } from "@/components/section/section";
import { sections, links } from "@/data";

export function ActivitySection() {
    return (
        <Section
            title={sections.activity.title}
            subtitle={sections.activity.subtitle}
        >
            <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
                <GitHubActivity user={links.github} />
            </div>
        </Section>
    );
}
