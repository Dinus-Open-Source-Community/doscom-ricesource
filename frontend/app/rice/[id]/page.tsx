import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LikeButton from "@/components/like-button";
import CommentSection from "@/components/comment-section";
import BookmarkButton from "@/components/bookmark-button";
import { getRiceById } from "@/actions/rice";

export default async function RiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const rice = await getRiceById(params.id);

  if (!rice) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{rice.judul}</CardTitle>
          <p className="text-muted-foreground">
            {/* by {rice.author} */}
            by Doscom
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Image
            src={rice.image_url || "/image/placeholder-card.png"}
            alt={rice.judul}
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg"
          />
          <p>{rice.description}</p>
          <div className="flex items-center space-x-4">
            <span className="font-bold">DE:</span>
            <span>
              {/* {rice.de} */}
              GNOME
            </span>
          </div>

          {rice.github && (
            <Link href={rice.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">View on GitHub</Button>
            </Link>
          )}
          <Link href={"doscom.org"} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">View on GitHub</Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <LikeButton initialLikes={rice.like} riceId={rice.id} />
          <BookmarkButton riceId={rice.id} />
        </CardFooter>
      </Card>
      <CommentSection riceId={rice.id} />
    </div>
  );
}
