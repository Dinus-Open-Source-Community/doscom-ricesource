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
import { getRiceById } from "@/actions/rice";

export default async function RiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const rice = await getRiceById(id);

  if (!rice) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Image Section */}
        <div>
          {(() => {
            // Parse image_url if it's a string
            let images: string[] = [];
            if (typeof rice.image_url === "string") {
              try {
                images = JSON.parse(rice.image_url);
              } catch {
                images = [];
              }
            } else if (Array.isArray(rice.image_url)) {
              images = rice.image_url;
            }

            return (
              <ImageGallery
                images={
                  images.length > 0 ? images : ["/image/placeholder-card.png"]
                }
                alt={rice.judul}
              />
            );
          })()}
        </div>

        {/* Info Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{rice.judul}</CardTitle>
              <p className="text-muted-foreground">
                by {rice.author ? rice.author : "Doscom"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{rice.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Desktop Environment</h3>
                  <p>{rice.desktop_environment ?? "Unknown"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Distro</h3>
                  <p>{rice.distro ?? "Unknown"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Window Manager</h3>
                  <p>{rice.windows_manager ?? "Unknown"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Terminal</h3>
                  <p>{rice.terminal ?? "Unknown"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Shell</h3>
                  <p>{rice.shell ?? "Unknown"}</p>
                </div>
              </div>
              {rice.github ? (
                <Link
                  href={rice.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    View on GitHub
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  No GitHub Link
                </Button>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <LikeButton initialLikes={rice.like} riceId={rice.id} />
              <BookmarkButton riceId={rice.id} />
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection riceId={rice.id} />
    </div>
  );
}
