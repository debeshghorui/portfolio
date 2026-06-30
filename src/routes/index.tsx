import { createFileRoute } from "@tanstack/react-router";
import { ActivitySection } from "@/components/section/activity-section";
import { ContactSection } from "@/components/section/contact-section";
import { HeroSection } from "@/components/section/hero-section";
import { ProjectsSection } from "@/components/section/projects-section";
import { StackSection } from "@/components/section/stack-section";
import { TimelineSection } from "@/components/section/timeline-section";
import { meta } from "@/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.ogTitle },
      { property: "og:description", content: meta.ogDescription },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16">
      <HeroSection />
      <ActivitySection />
      <ProjectsSection />
      <StackSection />
      <TimelineSection />
      <ContactSection />
    </main>
  );
}
