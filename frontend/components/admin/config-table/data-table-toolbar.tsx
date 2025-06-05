"use client"
import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Trash, Download, Plus } from "lucide-react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { AddUserDialog } from "@/components/admin/config-table/addConfigDialog"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = React.useState(false)
  const [showAddModal, setShowAddModal] = React.useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search & Filter */}
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by judul"
          value={(table.getColumn("judul")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("judul")?.setFilterValue(event.target.value)}
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
          Add Config
        </Button>

        {selectedRows.length > 0 && (
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={() => setShowBulkDeleteDialog(true)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete ({selectedRows.length})
            </Button>
          </>
        )}
      </div>

      {/* Delete Modal */}
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

      {/* Add User Modal */}
      <AddUserDialog
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={(data) => {
          console.log("New user:", data)
          // TODO: Tambahkan API call di sini
        }}
      />
    </div>
  )
}
