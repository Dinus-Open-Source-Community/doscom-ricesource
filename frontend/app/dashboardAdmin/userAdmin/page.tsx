"use client"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/admin/admin-table/data-table"
import { createColumnsAdmin } from "@/components/admin/admin-table/columns"
import { fetchAdminData, type Admin } from "@/actions/authAdmin"
import { toast } from "sonner"

export default function UserAdminTable() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminData()
      setAdmins(data || [])
    } catch (error) {
      console.error("Failed to fetch admins:", error)
      toast.error("Failed to fetch admins", {
        description: "There was an error loading the admin data. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleAdminAdded = () => {
    fetchAdmins() // Refresh the admin list after adding an admin
  }

  const handleAdminDeleted = () => {
    fetchAdmins() // Refresh the admin list after deleting an admin
  }

  const handleAdminEdited = () => {
    fetchAdmins() // Refresh the admin list after editing an admin
  }

  // Create columns with callbacks for data refresh
  const columns = createColumnsAdmin(handleAdminDeleted, handleAdminEdited)

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading admins...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">{admins.length}</div>
            <div className="text-sm text-blue-600">Total Admins</div>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-green-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">
              {admins.filter((admin) => admin.email?.includes("@")).length}
            </div>
            <div className="text-sm text-green-600">Active Admins</div>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-purple-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-800">{new Date().toLocaleDateString()}</div>
            <div className="text-sm text-purple-600">Last Updated</div>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={admins} onRefresh={fetchAdmins} onAdminAdded={handleAdminAdded} />
    </div>
  )
}
