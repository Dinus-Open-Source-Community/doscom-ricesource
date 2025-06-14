import { Suspense } from "react"
// import ManageRiceList from "@/components/manage-rice-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { getRiceByUserId } from "@/actions/rice"
import ManageRiceList from "@/components/manage-rice-list"
import { cookies } from "next/headers";

export default async function ManagePage({ params }: { params: Promise<{ user_id: string }> }) {
    const { user_id } = await params; // Replace with actual user ID
    const cookieStore = await cookies(); // Correctly get cookies
    const userRices = await getRiceByUserId(user_id)
    const token = cookieStore.get("token")?.value || null; // Correctly get token from cookies


    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Manage Your Rices</h1>
                        <p className="text-muted-foreground mt-1">View, edit, and manage your rice configurations</p>
                    </div>
                    <Link href={`/ricesource/manage/${user_id}/add-rice`}>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add New Rice
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="all" className="mb-8">

                    <TabsContent value="all">
                        <Suspense fallback={<RiceListSkeleton />}>
                            <ManageRiceList rices={userRices} token={token} />
                        </Suspense>
                    </TabsContent>

                </Tabs>
            </div>
        </main>
    )
}

function RiceListSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-4 mt-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Skeleton className="h-10 w-20" />
                            <Skeleton className="h-10 w-20" />
                            <Skeleton className="h-10 w-20" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

