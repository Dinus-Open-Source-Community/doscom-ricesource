"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Sort() {
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`/?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="most_liked">Most Liked</SelectItem>
      </SelectContent>
    </Select>
  );
}
