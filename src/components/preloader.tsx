import { useEffect, useState } from "react";

import { site } from "@/data";

/**
 * Words preloader — adapted from skiper-ui/skiper8.
 *
 * Typography-based preloader with cycling words and a progress counter,
 * inspired by Dennis Snellenberg's portfolio. Tuned to match this site's
 * warm-paper / dark theme: uses theme tokens, JetBrains Mono for the
 * chrome, and greetings cycling through multiple languages.
 *
 * - Shows once per session (sessionStorage guard).
 * - Skips entirely when prefers-reduced-motion is set.
 * - Locks page scroll while visible, then slides up to reveal the page.
 */
const WORDS = [
  "নমস্কার",
  "नमस्ते",
  "hello",
  "bonjour",
  "hola",
  "ciao",
  "こんにちは",
  "你好",
] as const;
const DURATION = 2500;
const EXIT_MS = 800;
const STORAGE_KEY = "portfolio-preloader-seen";

export function Preloader() {
  const [phase, setPhase] = useState<"active" | "exiting" | "done">("active");
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — show anyway
    }
    if (reduce || seen) {
      setPhase("done");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const wordMs = DURATION / WORDS.length;
    const wordTimer = window.setInterval(() => {
      // Clamp (don't wrap) so the first word never reappears during exit.
      setWordIndex((i) => Math.min(i + 1, WORDS.length - 1));
    }, wordMs);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const exitTimer = window.setTimeout(() => setPhase("exiting"), DURATION);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }, DURATION + EXIT_MS);

    return () => {
      clearInterval(wordTimer);
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted || phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div
      aria-hidden="true"
      data-preloader
      style={{
        animation: "preloader-fade-in 200ms ease-out",
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
      className={`fixed inset-0 z-[100] flex flex-col bg-background ${exiting ? "pointer-events-none" : ""}`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
        <div className="flex items-center gap-2 pt-6 font-mono-tight text-xs text-muted-foreground">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          {site.nameShort}
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="relative overflow-hidden py-2">
            <span
              key={wordIndex}
              className="block text-3xl font-semibold tracking-tight text-foreground will-change-transform sm:text-5xl"
              style={{
                animation: `preloader-word ${DURATION / WORDS.length}ms cubic-bezier(0.65, 0, 0.35, 1)`,
                fontFamily:
                  '"Inter", "Noto Sans Bengali", "Noto Sans Devanagari", "Noto Sans JP", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif',
              }}
            >
              {WORDS[wordIndex]}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-6 font-mono-tight text-xs">
          <span className="text-muted-foreground">loading</span>
          <span className="tabular-nums text-accent">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
