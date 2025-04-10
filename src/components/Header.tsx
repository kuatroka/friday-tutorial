import React from "react";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border">
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <nav className="flex justify-between items-center px-4 md:px-8 py-4 container mx-auto">
          <a href="https://headstart.nyc" className="flex items-center">
            <Image
              src="https://www.headstart.nyc/logo.png"
              alt="Headstart Logo"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
            <span className="ml-2 font-semibold">HEADSTART</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
