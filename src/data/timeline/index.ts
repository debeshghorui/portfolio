export type TimelineItem = {
  id: string;
  when: string;
  title: string;
  place: string;
  detail: string;
  /** Public file on this site, for example /certificates/web.pdf */
  certificate?: string;
};

export const timeline: readonly TimelineItem[] = [
  {
    id: "computer-science",
    when: "now",
    title: "Computer science, 3rd year",
    place: "Batch of 2029",
    detail:
      "Undergraduate coursework, alongside the projects and cohorts on this site.",
  },
  {
    id: "generative-ai",
    when: "2026",
    title: "Generative AI Cohort",
    place: "ChaiCode",
    detail:
      "Exploring LLMs, RAG, embeddings, vector databases, and AI application development.",
  },
  {
    id: "mobile-development",
    when: "2026",
    title: "Mobile Development Cohort",
    place: "ChaiCode",
    detail:
      "Building cross-platform mobile apps with React Native, Expo, and modern mobile development practices.",
  },
  {
    id: "web-development",
    when: "2026",
    title: "Web Development Cohort",
    place: "ChaiCode",
    detail:
      "Mastering modern full-stack web development, backend systems, authentication, databases, and deployment.",
  },
];
