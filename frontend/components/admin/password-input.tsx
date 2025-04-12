"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PasswordInputProps {
  id: string
  required?: boolean
  className?: string
  password?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasError?: boolean
}

export function PasswordInput({
  id,
  required = false,
  className = "",
  password,
  onChange,
  hasError = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative">
      <Lock className={`absolute left-3 top-3 h-4 w-4 ${hasError ? "text-destructive" : "text-muted-foreground"}`} />
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        className={`pl-10 pr-10 ${hasError ? "border-destructive focus-visible:ring-destructive" : ""} ${className}`}
        required={required}
        value={password}
        onChange={onChange}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  )
}
