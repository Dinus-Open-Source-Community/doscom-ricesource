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
      <Jumbotron />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Linux Ricing Showcase</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <RiceList initialRices={rices} token={token} />
        </Suspense>
      </div>
    </main>
  );
}

export const revalidate = 3600; // Revalidate every hour
