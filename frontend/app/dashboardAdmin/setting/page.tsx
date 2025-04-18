"use client"
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Palette } from "lucide-react"
import ProfileSettings from "@/components/admin/admin-setting/profile-settings"
import PasswordSettings from "@/components/admin/admin-setting/password-settings"
import ThemeSettings from "@/components/admin/admin-setting/theme-settings"


interface UserProfile {
    name: string
    email: string
    bio: string
    avatar: string
    password: string
    newPassword: string
}

export default function AdminSettings() {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className="container mx-auto px-5">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="hidden sm:inline">Password</span>
                    </TabsTrigger>
                    <TabsTrigger value="theme" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">Theme</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileSettings />
                </TabsContent>

                <TabsContent value="password">
                    <PasswordSettings />
                </TabsContent>

                <TabsContent value="theme">
                    <ThemeSettings theme={theme} toggleTheme={toggleTheme} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
