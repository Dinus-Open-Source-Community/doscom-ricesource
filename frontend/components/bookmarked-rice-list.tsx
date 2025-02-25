"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Bookmark, Rice } from "@/types";
import { getAllBookmarks } from "@/actions/bookmark";
import { BookmarkRiceCard } from "./bookmark-rice-card";
import { AuthDialog } from "./unauthorized-modal";

export default function BookmarkedRiceList() {
  const [rices, setRices] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBookmarkedRices = async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to view bookmarks");
      setIsLoading(false);
      return;
    }

    try {
      const response = await getAllBookmarks(token);

      if (!response) {
        throw new Error("Failed to fetch bookmarked rices");
      }

      console.log("Data from API:", response); // Check the data received
      setRices(response);
    } catch (error: any) {
      console.error("Error fetching bookmarked rices:", error);
      if (error.message === "Unauthorized") {
        setIsDialogOpen(true);
        setError("You need to be logged in to view bookmarks");
      } else {
        setError("Failed to load bookmarked rices. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarkedRices();
  }, []);

  const filteredRices = rices.filter((rice) =>
    rice?.config?.judul?.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Filtered Rices:", filteredRices); // Debugging: Check filtered results

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <AuthDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onLoginRedirect={() => (window.location.href = "/login")}
        />
      </div>
    );
  }

  if (rices.length === 0 && !isLoading) {
    return (
      <div className="text-center">
        <p className="text-xl mb-4">No bookmarked rices found.</p>
        <Button onClick={() => router.push("/")}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {filteredRices.length > 0 ? (
          filteredRices.map((rice) => (
            <BookmarkRiceCard key={rice.id} rice={rice.config} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No bookmarked rices found.
          </p>
        )}
      </div>
    </div>
  );
}
