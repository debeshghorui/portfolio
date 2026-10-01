import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { applyTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => {
      setDark(document.documentElement.classList.contains("dark"));
    };
    sync();
    setMounted(true);
    window.addEventListener("portfolio-theme", sync);
    return () => window.removeEventListener("portfolio-theme", sync);
  }, []);

  const toggle = () => {
    applyTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark",
    );
  };

  const label = mounted
    ? dark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={dark}
      className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {mounted && dark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
