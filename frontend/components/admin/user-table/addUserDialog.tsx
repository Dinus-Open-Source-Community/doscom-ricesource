"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { createUserByAdmin } from "@/actions/userByAdmin"
import { toast } from "sonner"

export function AddUserDialog({
  open,
  onOpenChange,
  onUserAdded,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserAdded?: () => void
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null as File | null,
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }))
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (saving) return

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields.",
      })
      return
    }

    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("username", formData.username)
      fd.append("email", formData.email)
      fd.append("password", formData.password)
      if (formData.avatar) {
        fd.append("avatar", formData.avatar)
      }

      await createUserByAdmin(fd)

      toast.success("User created successfully", {
        description: `${formData.username} has been added to the system.`,
      })

      // Reset form
      setFormData({ username: "", email: "", password: "", avatar: null })
      setAvatarPreview(null)
      onOpenChange(false)

      // Trigger refresh
      if (onUserAdded) {
        onUserAdded()
      }
    } catch (error) {
      console.error("Failed to create user:", error)
      toast.error("Failed to create user", {
        description: "There was an error creating the user. Please try again.",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({ username: "", email: "", password: "", avatar: null })
    setAvatarPreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center my-4">
          <div className="relative cursor-pointer" onClick={handleAvatarClick}>
            <Avatar className="h-24 w-24">
              {avatarPreview && <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Avatar Preview" />}
              <AvatarFallback className="bg-muted">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog
