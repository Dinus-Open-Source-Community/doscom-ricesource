"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { getProfileData, updateProfile } from "@/actions/adminSettings"
import axios from "axios"

export default function ProfileSettings() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false) // State untuk fetch
  const [saving, setSaving] = useState(false) // State khusus untuk save

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Mulai loading
      try {
        const profileData = await getProfileData();
        setUsername(profileData.username);
        setEmail(profileData.email);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch profile data.");
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    setSaving(true); // Mulai proses saving
    try {
      await updateProfile({ username, email });
      alert("Profile updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false); // Selesai proses saving
    }
  };

  // Tampilkan pesan loading jika data belum siap
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Loading profile...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/image/pic.jpg" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid gap-4 py-4">
          <div className="">
            <div className="space-y-2">
              <Label htmlFor="first-name">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}

