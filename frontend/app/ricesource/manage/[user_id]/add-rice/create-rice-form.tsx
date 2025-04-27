"use client"

import { useState } from "react"
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
import { createRice } from "@/actions/rice"

interface CreateRiceFormProps {
    token: string;
}

export function CreateRiceForm({ token }: CreateRiceFormProps) {
    const [rice, setRice] = useState<Partial<Rice>>({
        judul: "",
        description: "",
        github: "",
        desktop_environment: "",
        windows_manager: "",
        distro: "",
        terminal: "",
        shell: "",
    })
    const [files, setFiles] = useState<(File | string)[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setRice(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setRice(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData()

            // Append all rice data with proper type conversion
            Object.entries(rice).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    // Convert all values to string before appending
                    formData.append(key, String(value))
                }
            })

            // Append each file
            files.forEach((file) => {
                formData.append("images", file)
            })

            const response = await createRice(formData, token)

            if (response.success) {
                toast({
                    title: "Success",
                    description: "Rice configuration created successfully!",
                })
                router.push("/ricesource/manage/" + userId)
            } else {
                throw new Error(response.message || "Failed to create rice")
            }
        } catch (error: any) {
            console.error("Creation error:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to create rice configuration",
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
                            value={rice.judul}
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

                    {/* Distribution */}
                    <div className="space-y-2">
                        <Label htmlFor="distro">Linux Distribution</Label>
                        <Select
                            value={rice.distro || ""}
                            onValueChange={(value) => handleSelectChange("distro", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select distribution" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Arch Linux">Arch Linux</SelectItem>
                                <SelectItem value="Ubuntu">Ubuntu</SelectItem>
                                <SelectItem value="Fedora">Fedora</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Terminal */}
                    <div className="space-y-2">
                        <Label htmlFor="terminal">Terminal</Label>
                        <Select
                            value={rice.terminal || ""}
                            onValueChange={(value) => handleSelectChange("terminal", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select terminal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Alacritty">Alacritty</SelectItem>
                                <SelectItem value="Kitty">Kitty</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Shell */}
                    <div className="space-y-2">
                        <Label htmlFor="shell">Shell</Label>
                        <Select
                            value={rice.shell || ""}
                            onValueChange={(value) => handleSelectChange("shell", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select shell" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Bash">Bash</SelectItem>
                                <SelectItem value="Zsh">Zsh</SelectItem>
                                <SelectItem value="Fish">Fish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={rice.description}
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
                        onChange={setFiles}
                        maxFiles={5}
                    />
                    <p className="text-sm text-muted-foreground">
                        Upload screenshots of your rice (max 5 images, JPG/PNG/WEBP)
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
                    {isLoading ? "Creating..." : "Create Rice"}
                </Button>
            </div>
        </form>
    )
}