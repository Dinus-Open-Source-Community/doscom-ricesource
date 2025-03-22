"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { bookmarkConfig } from "@/actions/bookmark";

interface BookmarkButtonProps {
  riceId: number;
  variant: "text" | "icon";
  isBookmarked: boolean;
  token: string | null;
  onUnauthorized: () => void;
}

export default function BookmarkButton({
  riceId,
  variant,
  isBookmarked: initialIsBookmarked,
  token,
  onUnauthorized,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  const handleBookmark = async () => {
    if (!token) {
      onUnauthorized(); // Panggil callback jika tidak ada token
      return;
    }

    try {
      await bookmarkConfig(riceId.toString(), token);
      setIsBookmarked((prev) => !prev); // Toggle bookmark state
    } catch (error) {
      console.error("Error bookmarking config:", error);
      setIsBookmarked(false); // Reset bookmark state on error
    }
  };

  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  return (
    <Button
      variant="ghost"
      disabled={!token}
      size={variant === "text" ? "sm" : "icon"}
      className={`flex items-center space-x-1 ${
        isBookmarked ? "text-yellow-500" : "text-muted-foreground"
      }`}
      onClick={handleBookmark}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      {variant === "text" && (
        <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
      )}
      {variant === "icon" && (
        <span className="sr-only">
          {isBookmarked ? "Remove Bookmark" : "Bookmark"}
        </span>
      )}
    </Button>
  );
}
