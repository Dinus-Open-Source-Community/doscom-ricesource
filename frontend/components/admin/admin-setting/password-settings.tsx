// password-settings.tsx

"use client"

import { updatePassword } from "@/actions/adminSettings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function PasswordSettings() {
  // Sediakan state untuk password baru dan konfirmasi
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    if (!newPassword) {
      alert("New password cannot be empty.");
      return;
    }
    
    setLoading(true);
    try {
      // Kirim password baru ke action
      await updatePassword({ newPassword });
      alert("Password updated!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input untuk Password Baru */}
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {/* Input untuk Konfirmasi Password Baru */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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