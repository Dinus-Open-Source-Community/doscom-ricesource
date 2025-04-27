import { cookies } from 'next/headers'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateRiceForm } from "./create-rice-form"
import { redirect } from 'next/navigation'

export default async function AddRicePage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    // Redirect if not authenticated
    if (!token) {
        redirect('/login')
    }

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Rice Configuration</CardTitle>
                </CardHeader>
                <CreateRiceForm token={token} />
            </Card>
        </div>
    )
}