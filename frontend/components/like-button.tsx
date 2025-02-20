"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { likeConfig } from "@/actions/like";

interface LikeButtonProps {
  initialLikes: number;
  riceId: number;
  initialIsLiked?: boolean; // Add an optional prop to initialize the liked state
}

export default function LikeButton({
  initialLikes,
  riceId,
  initialIsLiked = false, // Default to false if not provided
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false); // Add loading state to prevent multiple clicks
  const [disable, setDisable] = useState(true);

  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    setIsLoading(true); // Disable the button while the request is in progress

    try {
      if (isLiked) {
        await likeConfig(riceId.toString(), token);
        setLikes((prevLikes) => prevLikes - 1); // Use a functional update for consistency
      } else {
        await likeConfig(riceId.toString(), token);
        setLikes((prevLikes) => prevLikes + 1); // Use a functional update for consistency
      }
      setIsLiked((prevIsLiked) => !prevIsLiked); // Toggle the liked state
    } catch (error) {
      console.error("Error liking the config:", error);
    } finally {
      setIsLoading(false); // Re-enable the button after the request completes
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setDisable(false);
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={disable || isLoading} // Disable button if loading or no token
      className={`flex items-center space-x-1 ${
        isLiked ? "text-red-500" : "text-muted-foreground"
      }`}
      onClick={handleLike}
    >
      <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
      <span>{likes}</span>
    </Button>
  );
}
