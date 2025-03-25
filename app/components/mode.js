"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme, theme } = useTheme() // Use theme and setTheme from next-themes

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark") // Toggle theme
    }

    return (
        <Button onClick={handleTheme} className="rounded-md">
            {theme === "dark" ? <Sun width={24} /> : <Moon width={24} />}
        </Button>
    )
}
