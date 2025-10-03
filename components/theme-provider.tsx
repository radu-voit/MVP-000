"use client"

import * as React from "react"

type Theme = "light" | "dark"
type DesignSystem = "default" | "new-york" | "slate" | "stone" | "zinc" | "neutral" | "rose"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultDesignSystem?: DesignSystem
}

type ThemeProviderState = {
  theme: Theme
  designSystem: DesignSystem
  setTheme: (theme: Theme) => void
  setDesignSystem: (system: DesignSystem) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  designSystem: "default",
  setTheme: () => null,
  setDesignSystem: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  defaultDesignSystem = "default",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)
  const [designSystem, setDesignSystem] = React.useState<DesignSystem>(defaultDesignSystem)

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  React.useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("data-theme", designSystem)
  }, [designSystem])

  const value = {
    theme,
    designSystem,
    setTheme,
    setDesignSystem,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
