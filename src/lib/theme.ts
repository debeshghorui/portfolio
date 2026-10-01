function setThemeClass(theme: "light" | "dark") {
  const isDark = theme === "dark";
  const el = document.documentElement;
  el.classList.toggle("dark", isDark);
  el.style.colorScheme = isDark ? "dark" : "light";
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage unavailable (e.g. private browsing)
  }
  window.dispatchEvent(new Event("portfolio-theme"));
}

export function applyTheme(theme: "light" | "dark") {
  const apply = () => setThemeClass(theme);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && typeof document.startViewTransition === "function") {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}
