export function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage unavailable (e.g. private browsing)
  }
  window.dispatchEvent(new Event("portfolio-theme"));
}
