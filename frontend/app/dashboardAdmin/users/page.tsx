"use client"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/admin/user-table/data-table"
import { createColumns } from "@/components/admin/user-table/columns"
import { fetchUserByAdmin, type UserbyAdmin } from "@/actions/userByAdmin"
import { toast } from "sonner"

export default function UserTable() {
  const [users, setUsers] = useState<UserbyAdmin[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await fetchUserByAdmin()
      setUsers(data || [])
    } catch (error) {
      console.error("Failed to fetch users:", error)
      toast.error("Failed to fetch users", {
        description: "There was an error loading the user data. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUserAdded = () => {
    fetchUsers() // Refresh the user list after adding a user
  }

  const handleUserDeleted = () => {
    fetchUsers() // Refresh the user list after deleting a user
  }

  // Create columns with callbacks for data refresh
  const columns = createColumns(handleUserDeleted)

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">{users.length}</div>
            <div className="text-sm text-blue-600">Total Users</div>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-green-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">
              {users.filter((user) => user.email?.includes("@")).length}
            </div>
            <div className="text-sm text-green-600">Active Users</div>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-purple-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-800">{new Date().toLocaleDateString()}</div>
            <div className="text-sm text-purple-600">Last Updated</div>
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={users} onRefresh={fetchUsers} onUserDeleted={handleUserDeleted} />
    </div>
  )
}
