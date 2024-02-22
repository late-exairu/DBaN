"use client";

import { useState, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cards from "@/components/Cards";
import Pager from "@/components/Pager";
import { getGames, getPublisherDetails } from "@/utils/apiUtils";
import { type ApiResponse, type GameData, type Publisher } from "@/types";

type Props = {
  publishers: string;
};

function PageContent(props: Props) {
  const { publishers } = props;
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
    queryKey: ["games", page, sortBy, publishers],
    queryFn: () =>
      getGames(
        page,
        sortBy,
        undefined,
        undefined,
        undefined,
        undefined,
        publishers,
      ),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  const publisherDetails = useQuery<Publisher>({
    queryKey: ["publisherDetails", publishers],
    queryFn: () => getPublisherDetails(publishers),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  publisherDetails.error ? `Error: ${publisherDetails?.error?.message}` : null;
  publisherDetails.isLoading ? "Loading..." : null;

  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        Published by {publisherDetails?.data?.name}
      </h3>

      {publisherDetails?.data?.description && (
        <div
          className="mb-3 text-sm md:mb-4"
          dangerouslySetInnerHTML={{
            __html: publisherDetails?.data?.description,
          }}
        />
      )}

      <Cards
        data={data}
        isLoading={isLoading}
        error={error}
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
      />

      {data?.count && (
        <Pager
          itemsCount={data.count}
          currentPage={page}
          handlePageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent publishers={id.toString()} />
    </Suspense>
  );
}
