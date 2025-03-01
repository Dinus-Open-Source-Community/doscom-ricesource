"use client";

import { useState } from "react";
import BookmarkButton from "@/components/bookmark-button";
import { AuthDialog } from "@/components/unauthorized-modal";

interface BookmarkButtonWrapperProps {
  riceId: number;
  variant: "text" | "icon";
  isBookmarked: boolean;
  token: string | null;
}

export default function BookmarkButtonWrapper({
  riceId,
  variant,
  isBookmarked,
  token,
}: BookmarkButtonWrapperProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <BookmarkButton
        riceId={riceId}
        variant={variant}
        isBookmarked={isBookmarked}
        token={token}
        onUnauthorized={() => setIsDialogOpen(true)}
      />
      <AuthDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLoginRedirect={handleLoginRedirect}
      />
    </>
  );
}
