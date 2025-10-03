"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { FitnessDashboard } from "@/components/fitness-dashboard"
import { CardUIPage } from "@/components/card-ui-page"
import { LoginPage } from "@/components/login-page"
import { ThemeSettings } from "@/components/theme-settings"
import { StepWizardDemo } from "@/components/step-wizard-demo"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut } from "lucide-react"

export default function Page() {
  const [currentUI, setCurrentUI] = useState<"dashboard-test" | "fitness" | "card-ui" | "step-wizard">("step-wizard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("koios-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem("koios-auth", "true")
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("koios-auth")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card">
        <div className="flex h-14 items-center gap-4 px-6">
          <div className="flex flex-1 items-center gap-6">
            <div className="flex flex-col">
              <span className="text-lg font-semibold leading-tight">Koios Data Wizard</span>
              <span className="text-xs text-muted-foreground">
                A modular step-based wizard with centralized data management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  UIs
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setCurrentUI("step-wizard")}>Step Wizard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentUI("dashboard-test")}>Dashboard Test UI</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentUI("fitness")}>Fitness Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentUI("card-ui")}>Card UI Page</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeSettings />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-14">
        {currentUI === "step-wizard" && <StepWizardDemo />}
        {currentUI === "dashboard-test" && <Dashboard />}
        {currentUI === "fitness" && <FitnessDashboard />}
        {currentUI === "card-ui" && <CardUIPage />}
      </div>
    </div>
  )
}
