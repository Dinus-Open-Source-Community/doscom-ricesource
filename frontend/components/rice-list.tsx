"use client";

import { useState } from "react";
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
import CardBookmarkButton from "./card-bookmark-button";
import Search from "./search";
import Sort from "./sort";
import { Rice } from "@/types";

interface RiceListProps {
  initialRices: Rice[];
}

export default function RiceList({ initialRices }: RiceListProps) {
  const [rices, setRices] = useState(initialRices);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const perPage = 4;

  const filteredRices = rices
    .filter(
      (rice) => rice.judul.toLowerCase().includes(search.toLowerCase())
      // || rice.de.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "oldest") return a.id - b.id;
      if (sort === "most_liked") return b.like - a.like;
      return b.id - a.id;
    });

  const paginatedRices = filteredRices.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(filteredRices.length / perPage);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
        <Search onSearch={handleSearch} />
        <Sort onSort={handleSort} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paginatedRices.map((rice) => (
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
                    {/* {rice.author} */}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    DE : Gnome
                    {/* {rice.de} */}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <LikeButton initialLikes={rice.like} riceId={rice.id} />
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
          <Button
            key={pageNum}
            variant={pageNum === page ? "default" : "outline"}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
      </div>
    </div>
  );
}
