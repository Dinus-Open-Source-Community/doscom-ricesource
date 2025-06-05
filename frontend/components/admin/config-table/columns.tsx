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
import * as React from "react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { ConfigForAdmin } from "@/actions/configForAdmin"

export const columns: ColumnDef<ConfigForAdmin>[] = [
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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "judul",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Judul
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "like",
    header: "Likes",
    cell: ({ row }) => <div>{row.getValue("like")}</div>,
  },
  {
    accessorKey: "distro",
    header: "Distro",
    cell: ({ row }) => <div>{row.getValue("distro")}</div>,
  },
  {
    accessorKey: "desktop_environment",
    header: "Desktop",
    cell: ({ row }) => <div>{row.getValue("desktop_environment")}</div>,
  },
  {
    accessorKey: "widowss_manager",
    header: "WM",
    cell: ({ row }) => <div>{row.getValue("widowss_manager")}</div>,
  },
  {
    accessorKey: "terminal",
    header: "Terminal",
    cell: ({ row }) => <div>{row.getValue("terminal")}</div>,
  },
  {
    accessorKey: "shell",
    header: "Shell",
    cell: ({ row }) => <div>{row.getValue("shell")}</div>,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => <div>{row.getValue("author")}</div>,
  },
  {
    accessorKey: "image_url",
    header: "Gambar",
    cell: ({ row }) => {
      let urls: string[] = []

      try {
        const raw = row.getValue("image_url")
        if (typeof raw === "string") {
          urls = JSON.parse(raw)
        }
      } catch (e) {
        console.error("Failed to parse image_url", e)
      }

      const image = urls[0] || ""

      return image ? (
        <img
          src={image}
          alt="Config"
          className="h-10 w-10 object-cover rounded-md"
        />
      ) : (
        <span className="text-muted-foreground">No image</span>
      )
    },
  },


  {
    accessorKey: "github",
    header: "GitHub",
    cell: ({ row }) => (
      <a
        href={row.getValue("github")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Link
      </a>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const config = row.original
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

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
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteDialog(true)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationDialog
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={() => {
              console.log("Deleting config:", config)
              setShowDeleteDialog(false)
              // Place your delete API call here if needed.
            }}
            title="Delete Config"
            description={`Are you sure you want to delete ${config.judul}? This action cannot be undone.`}
          />
        </>
      )
    },
  },
]

