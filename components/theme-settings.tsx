"use client"
import { Moon, Sun, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ThemeSettings() {
  const { theme, setTheme, designSystem, setDesignSystem } = useTheme()

  const designSystems = [
    { value: "default", label: "Default (Blue)" },
    { value: "slate", label: "Slate" },
    { value: "stone", label: "Stone" },
    { value: "zinc", label: "Zinc" },
    { value: "neutral", label: "Neutral" },
    { value: "rose", label: "Rose" },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <Button variant="outline" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="ml-2">{theme === "light" ? "Dark" : "Light"}</span>
      </Button>

      {/* Design System Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Palette className="h-4 w-4" />
            <span className="ml-2">Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Design System</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {designSystems.map((system) => (
            <DropdownMenuItem
              key={system.value}
              onClick={() => setDesignSystem(system.value as any)}
              className={designSystem === system.value ? "bg-accent" : ""}
            >
              {system.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
