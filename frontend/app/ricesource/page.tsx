import { Suspense } from "react";
import RiceList from "@/components/rice-list";
import Search from "@/components/search";
import Sort from "@/components/sort";
import Jumbotron from "@/components/jumbotron";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolvedSearchParams = await searchParams;

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";
  const sort =
    typeof resolvedSearchParams.sort === "string"
      ? resolvedSearchParams.sort
      : "newest";
  const page =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page)
      : 1;

  return (
    <main className="min-h-screen bg-background">
      <Jumbotron />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Linux Ricing Showcase</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
          <Search />
          <Sort />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RiceList search={search} sort={sort} page={page} />
        </Suspense>
      </div>
    </main>
  );
}
