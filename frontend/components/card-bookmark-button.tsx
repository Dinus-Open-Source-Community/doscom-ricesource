"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  riceId: number;
}

export default function CardBookmarkButton({ riceId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    // In a real application, you would send a request to your API here
    // For now, we'll just update the state locally
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${
        isBookmarked ? "text-yellow-500" : "text-muted-foreground"
      }`}
      onClick={handleBookmark}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      <span className="sr-only">
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </span>
    </Button>
  );
}
