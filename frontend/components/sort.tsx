"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortProps {
  onSort: (value: string) => void;
}

export default function Sort({ onSort }: SortProps) {
  return (
    <Select onValueChange={onSort}>
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
