import { RegisterForm } from "@/components/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-card text-card-foreground rounded-lg border shadow-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
          <RegisterForm />
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

