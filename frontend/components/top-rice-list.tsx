"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./like-button";
import { Rice } from "@/types";
import BookmarkButtonWrapper from "./bookmark-button-wrapper";
import { getAllBookmarks } from "@/actions/bookmark";
import { logout } from "@/actions/auth";

interface RiceListProps {
  initialRices: Rice[];
  token: string | null;
}

export default function TopRiceList({ initialRices, token }: RiceListProps) {
  const [bookmarkedRices, setBookmarkedRices] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!token) return;

      try {
        const bookmarks = await getAllBookmarks(token);
        const bookmarkedIds = new Set(bookmarks.map((bm) => bm.config_id));
        setBookmarkedRices(bookmarkedIds);
        console.log(bookmarkedIds);
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          await logout();
          window.location.reload();
        }
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [token]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {initialRices.map((rice) => {
          const images: string[] =
            typeof rice.image_url === "string"
              ? JSON.parse(rice.image_url)
              : rice.image_url;

          return (
            <Card key={rice.id}>
              <CardHeader>
                <CardTitle>{rice.judul}</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(images) && images.length > 0 ? (
                  <Image
                    src={images[0]}
                    alt={rice.judul}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md"
                  />
                ) : (
                  <Image
                    src="/image/placeholder-card.png"
                    alt={rice.judul}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      By {rice.author || "Anonymous"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      DE : {rice.desktop_environment || "Unknown"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LikeButton initialLikes={rice.like} riceId={rice.id} token={token} />
                    <BookmarkButtonWrapper
                      riceId={rice.id}
                      variant="icon"
                      token={token}
                      isBookmarked={bookmarkedRices.has(rice.id)} // Pass isBookmarked prop
                    />
                  </div>
                </div>
                <Link href={`/ricesource/rice/${rice.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
