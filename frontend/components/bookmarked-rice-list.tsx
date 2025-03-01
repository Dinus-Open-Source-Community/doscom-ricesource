import { getAllBookmarks } from "@/actions/bookmark";
import { Input } from "@/components/ui/input";
import { BookmarkRiceCard } from "@/components/bookmark-rice-card";

interface BookmarkedRiceListProps {
  token: string | null;
}

// Komponen server-side tanpa useEffect
export default async function BookmarkedRiceList({
  token,
}: BookmarkedRiceListProps) {
  if (!token) {
    return (
      <p className="text-center text-red-500">
        You need to be logged in to view bookmarks
      </p>
    );
  }

  const rices = await getAllBookmarks(token);

  if (!rices.length) {
    return (
      <p className="text-center text-muted-foreground">
        No bookmarked rices found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Input
          type="text"
          placeholder="Search bookmarks..."
          className="max-w-xs"
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        {rices.map((rice) => (
          <BookmarkRiceCard key={rice.id} rice={rice.config} />
        ))}
      </div>
    </div>
  );
}
