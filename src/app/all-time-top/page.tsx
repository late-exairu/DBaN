"use client";

import { useState, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cards from "@/components/Cards";
import Pager from "@/components/Pager";
import { getAllTimeTopGames } from "@/utils/apiUtils";
import { type ApiResponse, type GameData } from "@/types";

function PageContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("-metacritic");
  const [page, setPage] = useState(
    Number.parseInt(searchParams.get("page") ?? "1"),
  );

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleSortByChange(sortBy: string) {
    setSortBy(sortBy);
  }

  const { data, isLoading, error } = useQuery<ApiResponse<GameData>>({
    queryKey: ["allTimeTopGames", page, sortBy],
    queryFn: () => getAllTimeTopGames(page, sortBy),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        All time top games
      </h3>

      <Cards
        data={data}
        isLoading={isLoading}
        error={error}
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
      />

      <Pager
        data={data}
        currentPage={page}
        handlePageChange={handlePageChange}
      />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
