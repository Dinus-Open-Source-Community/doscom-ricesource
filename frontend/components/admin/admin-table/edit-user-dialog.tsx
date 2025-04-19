"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Admin } from "@/actions/authAdmin"
import { updateAdmin } from '@/actions/authAdmin' // pastikan sudah import

interface EditAdminDialogProps {
    isOpen: boolean
    onClose: () => void
    onEdit: (admin: Admin) => void
    admin: Admin
}

export function EditAdminDialog({ isOpen, onClose, onEdit, admin }: EditAdminDialogProps) {
    const [username, setUsername] = useState(admin.username || "");
    const [email, setEmail] = useState(admin.email || "");
    const [password, setPassword] = useState(admin.password || "");
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [admins, setAdmins] = useState<Admin[]>([]);

    useEffect(() => {
        if (isOpen) {
            setUsername(admin.username || "");
            setEmail(admin.email || "");
            setPassword(admin.password || "");
            setErrors({});
        }
    }, [isOpen, admin]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!username.trim()) {
            newErrors.username = "Username is required"
        }

        if (!email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid"
        }

        if (password.trim() && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            onEdit({
                id: admin.id,
                username,
                email,
                password: password === admin.password ? admin.password : password,
            })
        }
    }

    const handleEditAdmin = async (updatedAdmin: Admin) => {
        try {
            const updatedData = await updateAdmin(updatedAdmin.id, {
                username: updatedAdmin.username,
                email: updatedAdmin.email,
                password: updatedAdmin.password,
            });
    
            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin.id === updatedAdmin.id
                        ? { ...admin, ...updatedData }
                        : admin
                )
            );
        } catch (error) {
            console.error("Failed to update admin:", error);
        }
    };
    
      

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Admin</DialogTitle>
                    <DialogDescription>Update the admin details.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-username">Username</Label>
                        <Input id="edit-username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-password">Password</Label>
                        <Input
                            id="edit-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave unchanged or enter new password"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
