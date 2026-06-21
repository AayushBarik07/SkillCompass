"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return <div className="w-16 h-8 rounded-full bg-[var(--theme-border)]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex items-center px-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-accent)] ${
        isDark ? "bg-[#2a2a2a]" : "bg-[#e5e5e5]"
      }`}
      aria-label="Toggle dark mode"
    >
      {/* Sun icon for light mode (left side) */}
      <div className={`absolute left-2 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}>
        <Sun className="w-4 h-4 text-[#404040]" />
      </div>

      {/* Moon icon for dark mode (right side) */}
      <div className={`absolute right-2 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
        <Moon className="w-4 h-4 text-[#e5e5e5]" />
      </div>

      {/* The sliding thumb */}
      <div
        className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? "bg-white translate-x-0" : "bg-[#404040] translate-x-8"
        }`}
      />
    </button>
  );
}
