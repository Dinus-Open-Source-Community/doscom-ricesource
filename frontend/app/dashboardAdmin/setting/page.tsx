"use client"
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Palette } from "lucide-react"
import ProfileSettings from "@/components/admin/admin-setting/profile-settings"
import PasswordSettings from "@/components/admin/admin-setting/password-settings"

export default function AdminSettings() {
    return (
        <div className="container mx-auto px-5">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Password</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
                <ProfileSettings />
            </TabsContent>

            <TabsContent value="password">
                <PasswordSettings />
            </TabsContent>
            </Tabs>
        </div>
    )
}
