"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/actions/authAdmin";
import type { Metadata } from "next"
import Link from "next/link"
import { Mail, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/admin/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validate inputs
    const newErrors: {
      email?: string
      password?: string
      general?: string
    } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await adminLogin({ email, password });

      // Simulate delay (optional, for smoother UX like v0 demo)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!response || !response.token) {
        setErrors({
          general: "Invalid email or password. Please try again.",
        });
        return;
      }

      localStorage.setItem("token", response.token);
      router.push("/dashboardAdmin");
    } catch (err) {
      setErrors({
        general: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.general && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:gap-5"> {/* Overall form spacing */}
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-3 h-4 w-4 ${errors.email ? "text-destructive" : "text-muted-foreground"
                      }`}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                    Password
                  </Label>
                </div>
                <PasswordInput
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  hasError={!!errors.password}
                  required
                />
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              {/* Optional: Global error display */}
              {errors.general && (
                <p className="text-center text-sm font-medium text-destructive">{errors.general}</p>
              )}
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}
