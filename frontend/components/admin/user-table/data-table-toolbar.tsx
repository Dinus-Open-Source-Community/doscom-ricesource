// DataTableToolbar.tsx
"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Trash, Plus } from "lucide-react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { AddUserDialog } from "@/components/admin/user-table/addUserDialog"
import { useToast } from "@/hooks/use-toast"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onUserAdded?: () => void
}

export function DataTableToolbar<TData>({ table, onUserAdded }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = React.useState(false)
  const [showAddModal, setShowAddModal] = React.useState(false)
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by name, email..."
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

      <div className="flex items-center space-x-2">
        <Button variant="default" size="sm" className="h-9" onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>

        {selectedRows.length > 0 && (
          <Button variant="outline" size="sm" className="h-9" onClick={() => setShowBulkDeleteDialog(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete ({selectedRows.length})
          </Button>
        )}
      </div>

      <DeleteConfirmationDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        onConfirm={() => {
          console.log("Bulk deleting rows:", selectedRows)
          table.resetRowSelection()
          setShowBulkDeleteDialog(false)
        }}
        title="Delete Selected Users"
        description={`Are you sure you want to delete ${selectedRows.length} selected users? This action cannot be undone.`}
      />

      <AddUserDialog
        open={showAddModal}
        onOpenChange={(open) => {
          setShowAddModal(open)
          if (!open && onUserAdded) onUserAdded()
        }}
      />
    </div>
  )
}