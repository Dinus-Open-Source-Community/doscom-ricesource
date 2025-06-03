import { cookies } from "next/headers";
import { Suspense } from "react";
import Jumbotron from "@/components/jumbotron";
import { getTopRices } from "@/actions/rice";
import TopRiceList from "@/components/top-rice-list";

export default async function Home() {
  const cookieStore = await cookies(); // Correctly get cookies
  const rices = await getTopRices();
  const token = cookieStore.get("token")?.value || null; // Correctly get token from cookies

  return (
    <main className="min-h-screen bg-background">
      <Jumbotron />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Top Rices</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TopRiceList initialRices={rices} token={token} />
        </Suspense>
      </div>
    </main>
  );
}

export const revalidate = 3600; // Revalidate every hour
