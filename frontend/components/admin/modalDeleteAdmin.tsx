import React from 'react';
import { MdDelete } from "react-icons/md";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function DeleteAdmin() {
    return (
        <AlertDialog>
            <AlertDialogTrigger className=''>
                <button className='text-red-500 hover:text-red-700 flex items-center space-x-1'>
                    <MdDelete size={20} />
                    <span>Delete</span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure want to delete this admin account?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this account
                        and remove this data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-500'>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}