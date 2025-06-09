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
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import * as React from "react"
import { deleteUserByAdmin, type UserbyAdmin } from "@/actions/userByAdmin"
import { toast } from "sonner"

interface ColumnsProps {
  onUserDeleted?: () => void
}

export const createColumns = (onUserDeleted?: () => void): ColumnDef<UserbyAdmin>[] => [
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
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={row.getValue("avatar") || "/placeholder.svg?height=32&width=32"}
          alt="Avatar"
          className="h-8 w-8 rounded-full mr-4"
        />
      </div>
    ),
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
    cell: ({ row }) => {
      const user = row.original
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      const [isDeleting, setIsDeleting] = React.useState(false)

      const handleDeleteUser = async (user: UserbyAdmin) => {
        if (isDeleting) return

        // Validate user data before deletion
        if (!user.id) {
          toast.error("Invalid user data", {
            description: "User ID is missing or invalid.",
          })
          return
        }

        setIsDeleting(true)

        try {
          console.log("Attempting to delete user:", {
            id: user.id,
            username: user.username,
            email: user.email,
          })

          await deleteUserByAdmin(user.id)

          toast.success("User deleted successfully", {
            description: `${user.username} (ID: ${user.id}) has been removed from the system.`,
          })

          // Trigger refresh
          if (onUserDeleted) {
            onUserDeleted()
          }
        } catch (error) {
          console.error("Error deleting user:", error)

          let errorMessage = "There was an error deleting the user. Please try again."

          if (error instanceof Error) {
            errorMessage = error.message
          }

          toast.error("Failed to delete user", {
            description: errorMessage,
            duration: 7000, 
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
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
              >
                <Trash className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationDialog
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={() => handleDeleteUser(user)}
            title="Delete User"
            description={`Are you sure you want to delete ${user.username} (ID: ${user.id})? This action cannot be undone.`}
          />
        </>
      )
    },
  },
]

// Default export for backward compatibility
export const columnsUsers = createColumns()
