"use client";

import { useQuery } from "@tanstack/react-query";
import { getAboveRateGames } from "@/utils/apiUtils";
import Cards from "@/components/Cards";
import { type ResponseData } from "@/types";

export default function HomePage() {
  const aboveRateGames = useQuery<ResponseData>({
    queryKey: ["aboveRateGames"],
    queryFn: () => getAboveRateGames(),
    staleTime: 600000, // 10 minutes
  });

  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        Top Rated PC Games
      </h3>
      <Cards {...aboveRateGames} />
    </main>
  );
}
