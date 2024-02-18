"use client";

import { useState, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Pager from "@/components/Pager";
import { getDevelopers } from "@/utils/apiUtils";
import { type ApiResponse, type Developer } from "@/types";
import BrowseList from "@/_components/BrowseList";

function PageContent() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number.parseInt(searchParams.get("page") ?? "1"),
  );

  function handlePageChange(page: number) {
    setPage(page);
  }

  const { data, isLoading, error } = useQuery<ApiResponse<Developer>>({
    queryKey: ["developers", page],
    queryFn: () => getDevelopers(page),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  return (
    <main className="relative flex w-full flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        Developers
      </h3>

      <BrowseList data={data} isLoading={isLoading} error={error} />

      {data?.count && (
        <Pager
          itemsCount={data.count}
          currentPage={page}
          handlePageChange={handlePageChange}
          pageSize={12}
        />
      )}
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
