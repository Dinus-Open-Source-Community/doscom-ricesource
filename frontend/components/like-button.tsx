"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  initialLikes: number;
  riceId: number;
}

export default function LikeButton({ initialLikes, riceId }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [disable, setDisable] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    // In a real application, you would send a request to your API here
    // For now, we'll just update the state locally
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
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
      disabled={disable}
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
