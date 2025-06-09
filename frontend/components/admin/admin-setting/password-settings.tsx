"use client"

import { updatePassword } from "@/actions/adminSettings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function PasswordSettings() {
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async () => {
    try {
      await updatePassword({ newPassword });
      alert("Password updated!");
      setNewPassword(""); // kosongkan input setelah sukses
    } catch (error) {
      console.error(error);
      alert("Failed to update password.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
      <Button onClick={handleUpdatePassword} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </CardFooter>
    </Card>
  )
}

