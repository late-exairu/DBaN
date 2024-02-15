"use client";

import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/utils/apiUtils";
import { type ApiResponse, type Tag } from "@/types";
import GenericCard from "@/components/GenericCard";

export default function Tags() {
  const tagsData = useQuery<ApiResponse<Tag>>({
    queryKey: ["tags"],
    queryFn: getTags,
    staleTime: 600000, // 10 minutes
  });

  const tags = tagsData.data?.results;

  if (tagsData.isLoading) return <div>Loading...</div>;
  if (tagsData.error) return <div>Error: {tagsData.error.message}</div>;
  if (!tags) return <div>No genres</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tags.map((tag) => (
        <GenericCard key={tag.id} generic={tag} />
      ))}
    </div>
  );
}
