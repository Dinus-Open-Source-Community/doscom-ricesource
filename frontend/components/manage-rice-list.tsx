"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, MessageSquare, Edit, Trash2, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface Rice {
    id: number;
    judul: string;
    description: string;
    like: number;
    image_url: string | null;
    github: string | null;
    desktop_environment: string | null;
    windows_manager: string | null;
    distro: string | null;
    terminal: string | null;
    shell: string | null;
    author: string | null;
    user_id: number | null;
    created_at: string | null;
    updated_at: string | null;
}

interface ManageRiceListProps {
    rices: Rice[]
}

export default function ManageRiceList({ rices }: ManageRiceListProps) {
    const [userRices, setUserRices] = useState(rices)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [riceToDelete, setRiceToDelete] = useState<number | null>(null)
    const [page, setPage] = useState(1)
    const { toast } = useToast()

    const perPage = 4
    const totalPages = Math.ceil(userRices.length / perPage)
    const paginatedRices = userRices.slice(
        (page - 1) * perPage,
        page * perPage
    )

    const handleDelete = async () => {
        if (riceToDelete === null) return

        try {
            // In a real app, you would make an API call here
            // await fetch(`/api/rice/${riceToDelete}`, { method: 'DELETE' })

            // For now, we'll just update the state
            setUserRices(userRices.filter((rice) => rice.id !== riceToDelete))

            toast({
                title: "Rice deleted",
                description: "Your rice configuration has been deleted successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete rice configuration. Please try again.",
                variant: "destructive",
            })
        } finally {
            setDeleteDialogOpen(false)
            setRiceToDelete(null)
        }
    }

    const confirmDelete = (id: number) => {
        setRiceToDelete(id)
        setDeleteDialogOpen(true)
    }

    if (userRices.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg bg-card">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No rice configurations found</h3>
                <p className="text-muted-foreground mb-4">You haven't uploaded any rice configurations yet.</p>
                <Link href="/submit">
                    <Button>Create Your First Rice</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Rice List */}
            {paginatedRices.map((rice) => {
                const images: string[] =
                    typeof rice.image_url === "string"
                        ? JSON.parse(rice.image_url)
                        : rice.image_url;
                return (<Card key={rice.id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            <div className="relative md:w-48 h-40">
                                {Array.isArray(images) && images.length > 0 ? (
                                    <Image src={images[0]} alt={rice.judul} fill className="object-cover" />
                                ) : (
                                    <Image src={"/image/placeholder-card.png"} alt={rice.judul} fill className="object-cover" />
                                )}
                            </div>
                            <div className="p-4 flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium">{rice.judul}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Created on {rice.created_at ? new Date(rice.created_at).toLocaleDateString() : "Unknown date"}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Heart className="h-4 w-4" />
                                                <span>{rice.like} likes</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Link href={`/rice/${rice.id}`}>
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <ExternalLink className="h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/edit-rice/${rice.id}`}>
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <Edit className="h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1 text-destructive hover:text-destructive"
                                            onClick={() => confirmDelete(rice.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>)
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={pageNum === page ? "default" : "outline"}
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </Button>
                    ))}
                </div>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your rice configuration and remove it from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}