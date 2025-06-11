import { cookies } from "next/headers";
import { Suspense } from "react";
import RiceList from "@/components/rice-list";
import Jumbotron from "@/components/jumbotron";
import { getAllRices } from "@/actions/rice";

export default async function Home() {
  const cookieStore = await cookies(); // Correctly get cookies
  const rices = await getAllRices();
  const token = cookieStore.get("token")?.value || null; // Correctly get token from cookies

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Linux Ricing{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Showcase
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing Linux desktop customizations from our community
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">

        <Suspense fallback={<div>Loading...</div>}>
          <RiceList initialRices={rices} token={token} />{" "}
          {/* Pass token as prop */}
        </Suspense>
      </div>
    </main>
  );
}

export const revalidate = 3600; // Revalidate every hour
