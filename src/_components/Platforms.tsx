"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatforms } from "@/utils/apiUtils";
import { type PlatformsRes } from "@/types";
import GenericCard from "@/components/GenericCard";

export default function Platforms() {
  const platformsData = useQuery<PlatformsRes>({
    queryKey: ["platforms"],
    queryFn: getPlatforms,
    staleTime: 600000, // 10 minutes
  });

  const platforms = platformsData.data?.results;

  if (platformsData.isLoading) return <div>Loading...</div>;
  if (platformsData.error)
    return <div>Error: {platformsData.error.message}</div>;
  if (!platforms) return <div>No genres</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {platforms.map((platforms) => (
        <GenericCard key={platforms.id} generic={platforms} />
      ))}
    </div>
  );
}
