"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const themeChangeEvent = "zhiyuxing-theme-change";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);
  return () => window.removeEventListener(themeChangeEvent, onStoreChange);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "light");

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("zhiyuxing-theme", next);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "切换到深色主题" : "切换到浅色主题"}
      aria-pressed={theme === "dark"}
    >
      <span aria-hidden="true">{theme === "light" ? "明" : "暗"}</span>
    </button>
  );
}
