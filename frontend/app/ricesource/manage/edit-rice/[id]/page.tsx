"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { Rice } from "@/types"

export default function EditRicePage() {
    const params = useParams()
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
    const [images, setImages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        const fetchRice = async () => {
            try {
                setIsLoading(true)
                // In a real app, you would fetch the rice data from your API
                // const response = await fetch(`/api/rices/${params.id}`)
                // const data = await response.json()

                // Mock data for demonstration
                const mockRice = {
                    id: typeof params.id === "string" ? parseInt(params.id, 10) || undefined : undefined,
                    judul: "My Awesome Rice",
                    description: "This is my custom Linux desktop configuration",
                    github: "https://github.com/user/my-rice",
                    desktop_environment: "KDE",
                    windows_manager: "KWin",
                    distro: "Arch Linux",
                    terminal: "Konsole",
                    shell: "Zsh",
                    image_url: JSON.stringify([
                        "https://example.com/image1.jpg",
                        "https://example.com/image2.jpg"
                    ]),
                }

                setRice(mockRice)
                setImages(JSON.parse(mockRice.image_url))
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch rice configuration.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchRice()
    }, [params.id, toast])

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
            // In a real app, you would make an API call here
            // const response = await fetch(`/api/rices/${params.id}`, {
            //   method: 'PUT',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     ...rice,
            //     image_url: JSON.stringify(images),
            //   }),
            // })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            toast({
                title: "Success",
                description: "Rice configuration has been updated successfully.",
            })
            router.push("/manage-rice")
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update rice configuration. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading && !rice.judul) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Loading Rice Configuration...</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Rice Configuration</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="judul">Title</Label>
                                <Input
                                    id="judul"
                                    name="judul"
                                    value={rice.judul}
                                    onChange={handleChange}
                                    placeholder="Enter title"
                                    required
                                />
                            </div>

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

                            <div className="space-y-2">
                                <Label htmlFor="desktop_environment">Desktop Environment</Label>
                                <Select
                                    value={rice.desktop_environment || ""}
                                    onValueChange={(value) => handleSelectChange("desktop_environment", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select desktop environment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GNOME">GNOME</SelectItem>
                                        <SelectItem value="KDE">KDE</SelectItem>
                                        <SelectItem value="XFCE">XFCE</SelectItem>
                                        <SelectItem value="LXDE">LXDE</SelectItem>
                                        <SelectItem value="MATE">MATE</SelectItem>
                                        <SelectItem value="Cinnamon">Cinnamon</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

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
                                        <SelectItem value="DWM">DWM</SelectItem>
                                        <SelectItem value="Qtile">Qtile</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

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
                                        <SelectItem value="Debian">Debian</SelectItem>
                                        <SelectItem value="Fedora">Fedora</SelectItem>
                                        <SelectItem value="Manjaro">Manjaro</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

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
                                        <SelectItem value="Terminator">Terminator</SelectItem>
                                        <SelectItem value="Konsole">Konsole</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

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
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={rice.description}
                                onChange={handleChange}
                                placeholder="Describe your rice configuration..."
                                rows={5}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Images</Label>
                            <ImageUpload
                                value={images}
                                onChange={(urls) => setImages(urls)}
                                maxFiles={5}
                            />
                            <p className="text-sm text-muted-foreground">
                                Upload screenshots of your rice (max 5 images)
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Rice"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}