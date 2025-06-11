import { cookies } from 'next/headers'
import { getRiceById } from "@/actions/rice"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from 'next/navigation'
import { EditRiceForm } from './edit-rice-form'

export default async function EditRicePage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    // Redirect if not authenticated
    if (!token) {
        redirect('/login')
    }

    try {
        const riceData = await getRiceById(id)

        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Rice Configuration</CardTitle>
                    </CardHeader>
                    <EditRiceForm
                        token={token}
                        initialData={riceData}
                        riceId={id}
                    />
                </Card>
            </div>
        )
    } catch (error) {
        console.error('Failed to load rice data:', error)
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <div className="p-6">
                        <p>Failed to load rice configuration. Please try again.</p>
                    </div>
                </Card>
            </div>
        )
    }
}