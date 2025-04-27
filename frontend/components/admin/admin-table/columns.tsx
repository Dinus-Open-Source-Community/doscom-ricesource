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
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { deleteAdmin, updateAdmin, type Admin } from "@/actions/authAdmin"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import * as React from "react"
import { EditAdminDialog } from "./edit-user-dialog"

export const columnsAdmin: ColumnDef<Admin>[] = [
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
    header: "ID",
    cell: ({ row }) => <div className="w-[80px] truncate">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: function ActionsCell({ row }) {
      const admin = row.original;
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
      const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
      const [selectedUser, setSelectedUser] = React.useState<Admin | null>(null)
      const [admins, setAdmins] = React.useState<Admin[]>([]);

      const handleEditAdmin = async (updatedAdmin: Admin) => {
          try {
              const updatedData = await updateAdmin(updatedAdmin.id, {
                  username: updatedAdmin.username,
                  email: updatedAdmin.email,
                  password: updatedAdmin.password,
              });

              setAdmins((prevAdmins) =>
                  prevAdmins.length > 0
                      ? prevAdmins.map((admin) =>
                          admin.id === updatedAdmin.id
                              ? { ...admin, ...updatedData }
                              : admin
                      )
                      : [updatedData] 
              );
          } catch (error) {
              console.error("Failed to update admin:", error);
          }
          if (typeof window !== "undefined") {
              window.location.reload();
          }
      };

      const resetState = () => {
        setIsEditDialogOpen(false)
        setShowDeleteDialog(false)
        setSelectedUser(null)
      }   
      
      const handleDeleteUser = async () => {
        try {
          if (admin.id) {
        await deleteAdmin(admin.id);
        console.log(`Admin with ID ${admin.id} deleted successfully.`);
          }
        } catch (error) {
          console.error("Failed to delete admin:", error);
        } finally {
          setShowDeleteDialog(false);
        }
      };

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
              <DropdownMenuItem onClick={() => {
                setSelectedUser(admin)
                setIsEditDialogOpen(true)
              }}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  setSelectedUser(admin)
                  setShowDeleteDialog(true)
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
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
              onConfirm={async () => {
                console.log("Deleting admin:", admin)
                await handleDeleteUser();
              }}
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
