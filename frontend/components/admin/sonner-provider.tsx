"use client"

import { Toaster } from "sonner"

export function SonnerProvider() {
    return (
        <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
                duration: 5000,
                className: "admin-toast",
                style: {
                    background: "#fff", // Set background to white
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                },
            }}
        />
    )
}
