"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Trash, Plus } from "lucide-react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { AddConfigDialog } from "@/components/admin/config-table/addConfigDialog"
import { toast } from "sonner"
import { type CreateConfigData, storeConfigForAdmin, deleteConfigForAdmin } from "@/actions/configForAdmin"

// Batasan (constraint) TData diubah agar lebih umum, hanya membutuhkan properti 'id'.
interface DataTableToolbarProps<TData extends { id: number | string }> {
  table: Table<TData>
  refetchData: () => void
}

export function DataTableToolbar<TData extends { id: number | string }>({ table, refetchData }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = React.useState(false)
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleAddNewConfig = async (formData: FormData) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      // Validasi field yang wajib diisi
      const requiredFields = [
        "judul",
        "description",
        "github",
        "desktop_environment",
        "windows_manager",
        "distro",
        "terminal",
        "shell",
      ]

      for (const field of requiredFields) {
        const value = formData.get(field)
        if (!value || (typeof value === "string" && value.trim() === "")) {
          throw new Error(`Field ${field} is required and cannot be empty`)
        }
      }

      // Validasi file gambar
      const images = formData.get("images") as File
      if (!images || !(images instanceof File) || images.size === 0) {
        throw new Error("A valid image file is required")
      }

      if (!images.type.startsWith("image/")) {
        throw new Error("Please select a valid image file")
      }

      const maxSize = 5 * 1024 * 1024 // 5MB
      if (images.size > maxSize) {
        throw new Error("Image file size must be less than 5MB")
      }

      // Membuat objek config dari FormData
      const config: CreateConfigData = {
        judul: (formData.get("judul") as string).trim(),
        description: (formData.get("description") as string).trim(),
        images: images,
        github: (formData.get("github") as string).trim(),
        desktop_environment: (formData.get("desktop_environment") as string).trim(),
        windows_manager: (formData.get("windows_manager") as string).trim(),
        distro: (formData.get("distro") as string).trim(),
        terminal: (formData.get("terminal") as string).trim(),
        shell: (formData.get("shell") as string).trim(),
      }

      // Validasi URL GitHub
      if (!config.github.startsWith("http")) {
        throw new Error("GitHub URL must start with http:// or https://")
      }

      await storeConfigForAdmin(config)

      toast.success("Configuration added successfully!", {
        description: `${config.judul} has been added to the database.`,
      })

      refetchData()
      setShowAddModal(false)
    } catch (error) {
      let errorMessage = "Failed to add configuration. Please try again."

      if (error instanceof Error) {
        errorMessage = error.message
      }

      toast.error("Failed to add configuration", {
        description: errorMessage,
        duration: 10000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBulkDelete = async () => {
    const rowsToDelete = [...selectedRows]
    const idsToDelete = rowsToDelete.map((row) => row.original.id)

    try {
      await Promise.all(idsToDelete.map((id) => deleteConfigForAdmin(Number(id))))

      toast.success("Configurations deleted successfully!", {
        description: `${idsToDelete.length} configurations have been deleted.`,
      })

      refetchData()
      table.resetRowSelection()
      setShowBulkDeleteDialog(false)
    } catch (error) {
      toast.error("Failed to delete configurations", {
        description: "Please try again later.",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Cari berdasarkan judul..."
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

      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          className="h-9"
          onClick={() => setShowAddModal(true)}
          disabled={isSubmitting}
        >
          <Plus className="mr-2 h-4 w-4" />
          {isSubmitting ? "Adding..." : "Add Config"}
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
        onConfirm={handleBulkDelete}
        title="Delete Selected Configs"
        description={`Are you sure you want to delete ${selectedRows.length} selected configs? This action cannot be undone.`}
      />

      <AddConfigDialog open={showAddModal} onOpenChange={setShowAddModal} onSubmit={handleAddNewConfig} />
    </div>
  )
}