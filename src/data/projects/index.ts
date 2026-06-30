import { links } from "../links";

export const projects = [
  {
    name: "Pulse",
    tag: "Realtime",
    description:
      "A tiny realtime dashboard for tracking study streaks and side-project momentum. WebSockets, Postgres, and a stupid amount of polish.",
    href: links.github,
    stack: ["Next.js", "Supabase", "Tailwind"],
  },
  {
    name: "ChaiCompiler",
    tag: "Tooling",
    description:
      "A toy compiler that turns a tiny ML-ish language into WebAssembly. Built to actually understand parsers, ASTs, and codegen.",
    href: links.github,
    stack: ["Rust", "WASM", "Pratt parser"],
  },
  {
    name: "Notesync",
    tag: "Productivity",
    description:
      "End-to-end encrypted markdown notes that sync across devices over CRDTs. My excuse to learn Yjs and conflict-free editing.",
    href: links.github,
    stack: ["React", "Yjs", "Cloudflare"],
  },
  {
    name: "campusbot",
    tag: "AI",
    description:
      "A RAG-based chatbot that answers questions from my college's handbook PDFs. Local LLM, vector store, ~300 lines of glue.",
    href: links.github,
    stack: ["Python", "FAISS", "Ollama"],
  },
] as const;
