"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <button
        type="button"
        className="navbar__theme-toggle"
        aria-label="Alternar tema"
        disabled
      >
        <span className="h-4 w-4" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      className="navbar__theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[var(--ae-secondary)] transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-[var(--ae-primary)] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  )
}
