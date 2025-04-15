"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { likeConfig } from "@/actions/like";
import { AuthDialog } from "./unauthorized-modal";

interface LikeButtonProps {
  initialLikes: number;
  riceId: number;
  initialIsLiked?: boolean;
  token: string | null;
}

export default function LikeButton({
  initialLikes,
  riceId,
  initialIsLiked = false,
  token,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive disabled state from token presence and loading state
  const isDisabled = !token || isLoading;

  const handleLike = async () => {
    if (!token) {
      setIsDialogOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await likeConfig(riceId.toString(), token);
      if (isLiked) {
        setLikes(prev => prev - 1);
      } else {
        setLikes(prev => prev + 1);
      }
      setIsLiked(prev => !prev);
    } catch (error) {
      setIsDialogOpen(true);
      setError("Failed to like the config");
      console.error("Error liking the config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        disabled={isDisabled}
        className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-muted-foreground"
          }`}
        onClick={handleLike}
      >
        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        <span>{likes}</span>
      </Button>
      <AuthDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLoginRedirect={() => (window.location.href = "/login")}
      />
    </>
  );
}