"use client";

import { useQuery } from "@tanstack/react-query";
import { getStores } from "@/utils/apiUtils";
import { type ApiResponse, type StoreSingle } from "@/types";
import GenericCard from "@/components/GenericCard";

export default function Stores() {
  const storesData = useQuery<ApiResponse<StoreSingle>>({
    queryKey: ["stores"],
    queryFn: getStores,
    staleTime: 600000, // 10 minutes
  });

  const stores = storesData.data?.results;

  if (storesData.isLoading) return <div>Loading...</div>;
  if (storesData.error) return <div>Error: {storesData.error.message}</div>;
  if (!stores) return <div>No genres</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stores.map((stores) => (
        <GenericCard key={stores.id} generic={stores} />
      ))}
    </div>
  );
}
