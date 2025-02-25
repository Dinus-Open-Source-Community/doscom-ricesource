import { Suspense } from "react";
import BookmarkedRiceList from "@/components/bookmarked-rice-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBookmarks } from "@/actions/bookmark";

export default async function BookmarksPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Bookmarked Rices</h1>
        <Suspense fallback={<BookmarksSkeleton />}>
          <BookmarkedRiceList />
        </Suspense>
      </div>
    </main>
  );
}

function BookmarksSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-48" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row overflow-hidden border rounded-lg"
        >
          <Skeleton className="w-full md:w-1/3 h-48 md:h-64" />
          <div className="flex-1 p-6 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export const revalidate = 0; // Disable static generation for this page
