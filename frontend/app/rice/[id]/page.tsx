import { notFound } from "next/navigation";
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
import { ImageGallery } from "@/components/image-gallery";
import { Badge } from "@/components/ui/badge";
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
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          {rice.image_url ? (
            <ImageGallery
              images={[
                rice.image_url,
                "/image/placeholder-card.png",
                "/image/placeholder-card.png",
              ]}
              alt={rice.judul}
            />
          ) : (
            <ImageGallery
              images={[
                "/image/placeholder-card.png",
                "/image/placeholder-card.png",
                "/image/placeholder-card.png",
              ]}
              alt={rice.judul}
            />
          )}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{rice.judul}</CardTitle>
              <p className="text-muted-foreground">
                by Doscom
                {/* {rice.author} */}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{rice.description}</p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    minimalist
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Desktop Environment</h3>
                  <p>
                    GNOME
                    {/* {rice.de} */}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Distro</h3>
                  <p>
                    Ubuntu 22.04
                    {/* {rice.specs.distro} */}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Window Manager</h3>
                  <p>
                    Mutter
                    {/* {rice.specs.wm} */}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Terminal</h3>
                  <p>
                    GNOME Terminal
                    {/* {rice.specs.terminal} */}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Shell</h3>
                  <p>
                    zsh
                    {/* {rice.specs.shell} */}
                  </p>
                </div>
              </div>
              <Link
                href={rice.github ? rice.github : ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  View on GitHub
                </Button>
              </Link>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <LikeButton initialLikes={rice.like} riceId={rice.id} />
              <BookmarkButton riceId={rice.id} />
            </CardFooter>
          </Card>
        </div>
      </div>
      <CommentSection riceId={rice.id} />
    </div>
  );
}
