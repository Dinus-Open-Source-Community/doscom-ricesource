"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

interface ThemeSettingsProps {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export default function ThemeSettings({ theme, toggleTheme }: ThemeSettingsProps) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(theme)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const handleSavePreferences = () => {
    localStorage.setItem("theme", currentTheme)
    alert("Theme preference saved!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Customize the appearance of the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <h3 className="text-sm font-medium mb-4">Choose theme</h3>
          <div className="inline-flex items-center justify-center p-1 rounded-md bg-muted">
            <button
              onClick={() => theme === "dark" && toggleTheme()}
              className={`p-2 rounded-md transition-colors ${
                theme === "light"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Light mode"
            >
              <Sun className="h-5 w-5" />
            </button>
            <button
              onClick={() => theme === "light" && toggleTheme()}
              className={`p-2 rounded-md transition-colors ${
                theme === "dark"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Dark mode"
            >
              <Moon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
      <CardFooter className="flex justify-end">
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </CardFooter>
      </CardFooter>
    </Card>
  )
}

