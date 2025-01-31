import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-card text-card-foreground rounded-lg border shadow-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <LoginForm />
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

