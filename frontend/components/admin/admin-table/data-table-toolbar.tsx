"use client"
import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Trash, Plus } from "lucide-react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { AddUserDialog } from "./addAdminDialog"
import { adminRegister } from "@/actions/authAdmin"
import { toast } from "sonner"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onAdminAdded?: () => void
}

export function DataTableToolbar<TData>({ table, onAdminAdded }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = React.useState(false)
  const [showAddModal, setShowAddModal] = React.useState(false)

  const handleAddUser = async (formData: { username: string; email: string; password: string }) => {
    try {
      const newAdmin = await adminRegister({
        ...formData,
        token: "your-token-if-required", // Ensure you pass any required value
      })

      toast.success("Admin created successfully", {
        description: `${formData.username} has been added to the system.`,
      })

      // Trigger refresh
      if (onAdminAdded) {
        onAdminAdded()
      }
    } catch (error) {
      console.error("Failed to register admin:", error)
      toast.error("Failed to create admin", {
        description: "There was an error creating the admin. Please try again.",
      })
    }
  }

  const handleBulkDelete = () => {
    // In a real application, you would implement bulk delete API call here
    toast.success("Admins deleted successfully", {
      description: `${selectedRows.length} admins have been removed from the system.`,
    })
    table.resetRowSelection()
    setShowBulkDeleteDialog(false)
    if (onAdminAdded) {
      onAdminAdded() // Refresh the data
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search & Filter */}
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by username"
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("username")?.setFilterValue(event.target.value)}
          className="h-9 w-full sm:max-w-[300px]"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-9 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button variant="default" size="sm" className="h-9" onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>

        {selectedRows.length > 0 && (
          <Button variant="outline" size="sm" className="h-9" onClick={() => setShowBulkDeleteDialog(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete ({selectedRows.length})
          </Button>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected Admins"
        description={`Are you sure you want to delete ${selectedRows.length} selected admins? This action cannot be undone.`}
      />

      {/* Add User Modal */}
      <AddUserDialog open={showAddModal} onOpenChange={setShowAddModal} onSubmit={handleAddUser} />
    </div>
  )
}
