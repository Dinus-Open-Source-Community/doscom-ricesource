import { Rice } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Heart, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface RiceCardProps {
  rice: Rice;
}

export function BookmarkRiceCard({ rice }: RiceCardProps) {
  const imageUrl = (() => {
    try {
      const parsed = JSON.parse(rice.image_url ?? "[]"); // Pastikan ada default value
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed[0]
        : "/image/placeholder-card.png";
    } catch {
      return "/image/placeholder-card.png"; // Fallback jika JSON tidak valid
    }
  })();

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-1/3">
        <Image
          src={imageUrl}
          alt={rice.judul}
          width={300}
          height={200}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between md:w-2/3 p-6">
        <div>
          <CardHeader className="p-0">
            <CardTitle className="text-2xl mb-2">{rice.judul}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-muted-foreground mb-2">By {rice.author}</p>
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="w-4 h-4" />
              <span>{rice.desktop_environment}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{rice.like} likes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bookmark className="w-4 h-4 text-yellow-500 fill-current" />
                <span>Bookmarked</span>
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="p-0 mt-4">
          <Link href={`/rice/${rice.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
