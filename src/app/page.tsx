"use client";

import { useState, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cards from "@/components/Cards";
import Pager from "@/components/Pager";
import { getAboveRateGames } from "@/utils/apiUtils";
import { type ResponseData } from "@/types";

function PageContent() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number.parseInt(searchParams.get("page") ?? "1"),
  );

  function handlePageChange(page: number) {
    setPage(page);
  }

  const { data, isLoading, error } = useQuery<ResponseData>({
    queryKey: ["aboveRateGames", page],
    queryFn: () => getAboveRateGames(page),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        Top Rated PC Games
      </h3>
      <Cards data={data} isLoading={isLoading} error={error} />

      <Pager
        data={data}
        currentPage={page}
        handlePageChange={handlePageChange}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
