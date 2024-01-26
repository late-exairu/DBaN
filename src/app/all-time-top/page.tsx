"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTimeTopGames } from "@/utils/apiUtils";
import Cards from "@/components/Cards";
import { type ResponseData } from "@/types";

export default function HomePage() {
  const { data, isLoading, error } = useQuery<ResponseData>({
    queryKey: ["allTimeTopGames"],
    queryFn: () => getAllTimeTopGames(),
    staleTime: 600000, // 10 minutes
  });

  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        All time top
      </h3>
      <Cards data={data} isLoading={isLoading} error={error} />
    </main>
  );
}
