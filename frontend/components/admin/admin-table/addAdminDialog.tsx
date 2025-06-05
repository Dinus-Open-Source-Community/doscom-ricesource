"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { username: string; email: string; password: string }) => void
}

export function AddUserDialog({ open, onOpenChange, onSubmit }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [saving, setSaving] = useState(false)

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
      await onSubmit(formData)
      setFormData({ username: "", email: "", password: "" })
      onOpenChange(false)
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({ username: "", email: "", password: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Username</Label>
            <Input
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter username"
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel}>
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
