"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { ImageCropDialog } from "./image-crop-dialog"

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { name: string; email: string; password: string; avatar: File | null }) => void
}

export function AddUserDialog({ open, onOpenChange, onSubmit }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [tempImage, setTempImage] = useState<string | null>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setTempImage(reader.result as string)
        setCropDialogOpen(true)       
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImage: string) => {
    setAvatarPreview(croppedImage)

    const croppedFile = base64ToFile(croppedImage, "avatar.jpg")
    setFormData((prev) => ({ ...prev, avatar: croppedFile }))
  }

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || ''
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  const handleSave = () => {
    onSubmit(formData)
    setFormData({ name: "", email: "", password: "", avatar: null })
    setAvatarPreview(null)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFormData({ name: "", email: "", password: "", avatar: null })
    setAvatarPreview(null)
    onOpenChange(false)
  }

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [finalImage, setFinalImage] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  return (
    <>
      <Dialog open={open} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center my-4">
            <div className="relative cursor-pointer" onClick={handleAvatarClick}>
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || ""} alt="Avatar Preview" />
                <AvatarFallback className="bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-medium">Change</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {tempImage && (
        <ImageCropDialog
          isOpen={cropDialogOpen}
          onClose={() => {
            setCropDialogOpen(false)
            setTempImage(null)
          }}
          image={tempImage}
          onCropComplete={(croppedImage) => {
            handleCropComplete(croppedImage)
            setCropDialogOpen(false)
            setTempImage(null)
          }}
        />
      )}

    </>
  )
}
