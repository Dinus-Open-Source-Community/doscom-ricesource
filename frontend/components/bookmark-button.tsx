"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  riceId: number;
  variant: "text" | "icon";
}

export default function BookmarkButton({
  riceId,
  variant,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleBookmark = async () => {
    // In a real application, you would send a request to your API here
    // For now, we'll just update the state locally
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsDisabled(false);
    }
  }, []);

  return (
    <Button
      variant="ghost"
      disabled={isDisabled}
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
