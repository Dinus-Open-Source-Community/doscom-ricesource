import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rice } from "@/types";
import { getAllRices } from "@/actions/rice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./like-button";
import CardBookmarkButton from "./card-bookmark-button";

// This is a mock function. In a real application, you'd fetch this data from an API or database.
async function getRices(search: string, sort: string, page: number) {
  const rices = await getAllRices();
  // Filter by search term
  const filtered = rices.filter(
    (rice: Rice) =>
      rice.judul.toLowerCase().includes(search.toLowerCase()) ||
      rice.description.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = filtered.sort((a: Rice, b: Rice) => {
    if (sort === "oldest") return a.id - b.id;
    if (sort === "most_liked") return b.like_up - a.like_up;
    return b.id - a.id;
  });

  // Paginate
  const perPage = 4;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = sorted.slice(start, end);

  return {
    rices: paginated,
    totalPages: Math.ceil(sorted.length / perPage),
  };
}

export default async function RiceList({
  search,
  sort,
  page,
}: {
  search: string;
  sort: string;
  page: number;
}) {
  const { rices, totalPages } = await getRices(search, sort, page);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {rices.map((rice: Rice) => (
          <Card key={rice.id}>
            <CardHeader>
              <CardTitle>{rice.judul}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={rice.image_url || "/image/placeholder-card.png"}
                alt={rice.judul}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-sm text-muted-foreground">
                    By Doscom
                    {/* By {rice.author} */}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {/* {rice.de} */}
                    GNOME
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <LikeButton initialLikes={rice.like_up} riceId={rice.id} />
                  <CardBookmarkButton riceId={rice.id} />
                </div>
              </div>
              <Link href={`/rice/${rice.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={`/?search=${search}&sort=${sort}&page=${pageNum}`}
          >
            <Button variant={pageNum === page ? "default" : "outline"}>
              {pageNum}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
