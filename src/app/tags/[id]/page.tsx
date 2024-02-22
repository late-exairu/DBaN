"use client";

import { useState, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cards from "@/components/Cards";
import Pager from "@/components/Pager";
import { getGames, getTagDetails } from "@/utils/apiUtils";
import { type ApiResponse, type GameData, type Platform } from "@/types";

type Props = {
  tags: string;
};

function PageContent(props: Props) {
  const { tags } = props;
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
    queryKey: ["games", page, sortBy, tags],
    queryFn: () =>
      getGames(page, sortBy, undefined, undefined, undefined, tags),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  const tagDetails = useQuery<Platform>({
    queryKey: ["tagsDetails", tags],
    queryFn: () => getTagDetails(tags),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  tagDetails.error ? `Error: ${tagDetails?.error?.message}` : null;
  tagDetails.isLoading ? "Loading..." : null;

  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        {tagDetails?.data?.name} Games
      </h3>

      {tagDetails?.data?.description && (
        <div
          className="mb-3 text-sm md:mb-4"
          dangerouslySetInnerHTML={{
            __html: tagDetails?.data?.description,
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
      <PageContent tags={id.toString()} />
    </Suspense>
  );
}
