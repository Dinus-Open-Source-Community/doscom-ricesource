"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { Rice } from "@/types"
import { updateRice } from "@/actions/rice"

interface EditRiceFormProps {
    token: string;
    initialData: Partial<Rice>;
    riceId: string;
}

export function EditRiceForm({ token, initialData, riceId }: EditRiceFormProps) {
    const [rice, setRice] = useState<Partial<Rice>>(initialData)
    const [files, setFiles] = useState<(File | string)[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null
    const { toast } = useToast()
    const router = useRouter()

    // Initialize files from initialData
    useEffect(() => {
        try {
            const initialImages = initialData.image_url ? JSON.parse(initialData.image_url) : []
            setFiles(initialImages)
        } catch (error) {
            console.error("Error parsing initial images:", error)
            setFiles([])
        }
    }, [initialData.image_url])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setRice(prev => ({ ...prev, [name]: value }))
    }

    const handleFilesChange = (newFiles: (File | string)[]) => {
        setFiles(newFiles);
        // Update image_url in rice state
        const imageUrls = newFiles.filter(file => typeof file === 'string');
        setRice(prev => ({
            ...prev,
            image_url: JSON.stringify(imageUrls)
        }));
    };



    const handleSelectChange = (name: string, value: string) => {
        setRice(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData()

            // Append all rice data
            Object.entries(rice).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'image_url') {
                    formData.append(key, String(value))
                }
            })

            // Handle images properly
            const existingUrls = files.filter(file => typeof file === 'string')
            formData.append('image_url', JSON.stringify(existingUrls))

            // Append new files only
            files.forEach(file => {
                if (file instanceof File) {
                    formData.append('images', file)
                }
            })

            await updateRice(riceId, formData, token)

            toast({
                title: "Success",
                description: "Rice configuration updated successfully!",
            })
            router.push("/ricesource/manage/" + userId)
        } catch (error: any) {
            console.error("Update error:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to update rice configuration",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="judul">Title*</Label>
                        <Input
                            id="judul"
                            name="judul"
                            value={rice.judul || ""}
                            onChange={handleChange}
                            placeholder="My Awesome Rice"
                            required
                        />
                    </div>

                    {/* GitHub Repo */}
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub Repository</Label>
                        <Input
                            id="github"
                            name="github"
                            value={rice.github || ""}
                            onChange={handleChange}
                            placeholder="https://github.com/username/repo"
                        />
                    </div>

                    {/* Desktop Environment */}
                    <div className="space-y-2">
                        <Label htmlFor="desktop_environment">Desktop Environment</Label>
                        <Select
                            value={rice.desktop_environment || ""}
                            onValueChange={(value) => handleSelectChange("desktop_environment", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select environment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GNOME">GNOME</SelectItem>
                                <SelectItem value="KDE">KDE</SelectItem>
                                <SelectItem value="XFCE">XFCE</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Window Manager */}
                    <div className="space-y-2">
                        <Label htmlFor="windows_manager">Window Manager</Label>
                        <Select
                            value={rice.windows_manager || ""}
                            onValueChange={(value) => handleSelectChange("windows_manager", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select window manager" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="i3">i3</SelectItem>
                                <SelectItem value="Awesome">Awesome</SelectItem>
                                <SelectItem value="BSPWM">BSPWM</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Add other fields similarly... */}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={rice.description || ""}
                        onChange={handleChange}
                        placeholder="Describe your rice configuration..."
                        rows={5}
                        required
                    />
                </div>

                {/* Images */}
                <div className="space-y-2">
                    <Label>Images</Label>
                    <ImageUpload
                        value={files}
                        onChange={handleFilesChange}
                        maxFiles={5}
                    />
                    <p className="text-sm text-muted-foreground">
                        Upload screenshots of your rice (max 5 images)
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 p-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Rice"}
                </Button>
            </div>
        </form>
    )
}