"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { bookmarkConfig } from "@/actions/bookmark";
import { AuthDialog } from "./unauthorized-modal";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      setIsDialogOpen(true);
      return;
    }

    try {
      await bookmarkConfig(riceId.toString(), token);
      setIsBookmarked((prev) => !prev); // Toggle bookmark state
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorized") {
        setIsDialogOpen(true);
      } else {
        console.error("Error bookmarking config:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsDisabled(false);
    }
  }, []);

  return (
    <>
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
      <AuthDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLoginRedirect={() => (window.location.href = "/login")}
      />
    </>
  );
}
