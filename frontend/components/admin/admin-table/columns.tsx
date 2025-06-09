"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { deleteAdmin, updateAdmin, type Admin } from "@/actions/authAdmin"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { EditAdminDialog } from "./edit-user-dialog"
import * as React from "react"
import { toast } from "sonner"

interface ColumnsProps {
  onAdminDeleted?: () => void
  onAdminEdited?: () => void
}

export const createColumnsAdmin = (onAdminDeleted?: () => void, onAdminEdited?: () => void): ColumnDef<Admin>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="w-[80px] truncate font-mono">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: function ActionsCell({ row }) {
      const admin = row.original
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
      const [selectedUser, setSelectedUser] = React.useState<Admin | null>(null)
      const [isDeleting, setIsDeleting] = React.useState(false)
      const [isEditing, setIsEditing] = React.useState(false)

      const handleEditAdmin = async (updatedAdmin: Admin) => {
        if (isEditing) return

        setIsEditing(true)
        try {
          const updatedData = await updateAdmin(updatedAdmin.id, {
            username: updatedAdmin.username,
            email: updatedAdmin.email,
            password: updatedAdmin.password,
          })

          toast.success("Admin updated successfully", {
            description: `${updatedAdmin.username} has been updated.`,
          })

          // Trigger refresh
          if (onAdminEdited) {
            onAdminEdited()
          }

          resetState()
        } catch (error) {
          console.error("Failed to update admin:", error)
          toast.error("Failed to update admin", {
            description: "There was an error updating the admin. Please try again.",
          })
        } finally {
          setIsEditing(false)
        }
      }

      const resetState = () => {
        setIsEditDialogOpen(false)
        setShowDeleteDialog(false)
        setSelectedUser(null)
      }

      const handleDeleteUser = async () => {
        if (isDeleting) return

        setIsDeleting(true)
        try {
          if (admin.id) {
            await deleteAdmin(admin.id)
            toast.success("Admin deleted successfully", {
              description: `${admin.username} has been removed from the system.`,
            })

            // Trigger refresh
            if (onAdminDeleted) {
              onAdminDeleted()
            }
          }
        } catch (error) {
          console.error("Failed to delete admin:", error)
          toast.error("Failed to delete admin", {
            description: "There was an error deleting the admin. Please try again.",
          })
        } finally {
          setIsDeleting(false)
          setShowDeleteDialog(false)
        }
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(admin)
                  setIsEditDialogOpen(true)
                }}
                disabled={isEditing}
              >
                <Pencil className="mr-2 h-4 w-4" />
                {isEditing ? "Editing..." : "Edit"}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  setSelectedUser(admin)
                  setShowDeleteDialog(true)
                }}
                disabled={isDeleting}
              >
                <Trash className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedUser && (
            <>
              <EditAdminDialog
                isOpen={isEditDialogOpen}
                onClose={resetState}
                onEdit={handleEditAdmin}
                admin={selectedUser}
              />

              <DeleteConfirmationDialog
                isOpen={showDeleteDialog}
                onClose={resetState}
                onConfirm={handleDeleteUser}
                title="Delete Admin"
                description={`Are you sure you want to delete ${admin.username}? This action cannot be undone.`}
              />
            </>
          )}
        </>
      )
    },
  },
]

// Default export for backward compatibility
export const columnsAdmin = createColumnsAdmin()
