"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, type FormEvent } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface AddConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormData) => void
}

type FormState = {
  judul: string
  description: string
  images: File | null
  github: string
  desktop_environment: string
  windows_manager: string
  distro: string
  terminal: string
  shell: string
}

const initialFormState: FormState = {
  judul: "",
  description: "",
  images: null,
  github: "",
  desktop_environment: "",
  windows_manager: "",
  distro: "",
  terminal: "",
  shell: "",
}

export function AddConfigDialog({ open, onOpenChange, onSubmit }: AddConfigDialogProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const validateForm = (): string[] => {
    const errors: string[] = []

    // Required field validation
    const requiredFields: { key: keyof FormState; label: string }[] = [
      { key: "judul", label: "Judul" },
      { key: "description", label: "Description" },
      { key: "github", label: "GitHub URL" },
      { key: "desktop_environment", label: "Desktop Environment" },
      { key: "windows_manager", label: "Windows Manager" },
      { key: "distro", label: "Distro" },
      { key: "terminal", label: "Terminal" },
      { key: "shell", label: "Shell" },
    ]

    for (const field of requiredFields) {
      const value = formData[field.key]
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors.push(`${field.label} is required`)
      }
    }

    // Image validation
    if (!formData.images) {
      errors.push("Image file is required")
    } else {
      if (!formData.images.type.startsWith("image/")) {
        errors.push("Please select a valid image file")
      }
      if (formData.images.size > 5 * 1024 * 1024) {
        errors.push("Image file must be less than 5MB")
      }
      if (formData.images.size === 0) {
        errors.push("Selected file is empty")
      }
    }

    // GitHub URL validation
    if (formData.github && !formData.github.startsWith("http")) {
      errors.push("GitHub URL must start with http:// or https://")
    }

    return errors
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (isSubmitting) return

    // Validate form
    const errors = validateForm()
    setValidationErrors(errors)

    if (errors.length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const dataToPost = new FormData()

      // Append text fields
      dataToPost.append("judul", formData.judul.trim())
      dataToPost.append("description", formData.description.trim())
      dataToPost.append("github", formData.github.trim())
      dataToPost.append("desktop_environment", formData.desktop_environment.trim())
      dataToPost.append("windows_manager", formData.windows_manager.trim())
      dataToPost.append("distro", formData.distro.trim())
      dataToPost.append("terminal", formData.terminal.trim())
      dataToPost.append("shell", formData.shell.trim())

      // Append file
      if (formData.images) {
        dataToPost.append("images", formData.images, formData.images.name)
      }

      await onSubmit(dataToPost)

      // Reset form after successful submission
      setFormData(initialFormState)
      setValidationErrors([])
    } catch (error) {
      console.error("Error in form submission:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData(initialFormState)
    setValidationErrors([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Configuration</DialogTitle>
        </DialogHeader>

        {validationErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="judul">Judul *</Label>
              <Input
                id="judul"
                name="judul"
                required
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Contoh: Nord Theme on Arch"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi *</Label>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan tentang konfigurasi Anda"
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="github">Link Github *</Label>
              <Input
                id="github"
                name="github"
                required
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/user/repo"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="images">Gambar * (Max 5MB)</Label>
              <Input
                id="images"
                name="images"
                type="file"
                required
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null
                  setFormData({ ...formData, images: file })
                }}
                disabled={isSubmitting}
              />
              {formData.images && (
                <div className="text-sm text-muted-foreground">
                  <div>Selected: {formData.images.name}</div>
                  <div>Size: {(formData.images.size / 1024 / 1024).toFixed(2)} MB</div>
                  <div>Type: {formData.images.type}</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="distro">Distro *</Label>
                <Input
                  id="distro"
                  name="distro"
                  required
                  value={formData.distro}
                  onChange={(e) => setFormData({ ...formData, distro: e.target.value })}
                  placeholder="Contoh: Arch Linux"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desktop_environment">Desktop Environment *</Label>
                <Input
                  id="desktop_environment"
                  name="desktop_environment"
                  required
                  value={formData.desktop_environment}
                  onChange={(e) => setFormData({ ...formData, desktop_environment: e.target.value })}
                  placeholder="Contoh: GNOME"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="windows_manager">Windows Manager *</Label>
                <Input
                  id="windows_manager"
                  name="windows_manager"
                  required
                  value={formData.windows_manager}
                  onChange={(e) => setFormData({ ...formData, windows_manager: e.target.value })}
                  placeholder="Contoh: Hyprland"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="terminal">Terminal *</Label>
                <Input
                  id="terminal"
                  name="terminal"
                  required
                  value={formData.terminal}
                  onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
                  placeholder="Contoh: Alacritty"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="shell">Shell *</Label>
                <Input
                  id="shell"
                  name="shell"
                  required
                  value={formData.shell}
                  onChange={(e) => setFormData({ ...formData, shell: e.target.value })}
                  placeholder="Contoh: zsh"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
