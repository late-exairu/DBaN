"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cards from "@/components/Cards";
import Pager from "@/components/Pager";
import PageBgImage from "@/components/PageBgImage";
import { getGames, getGenreDetails } from "@/utils/apiUtils";
import { type ApiResponse, type GameData, type Platform } from "@/types";

type Props = {
  genres: string;
};

export default function BrowsePage(props: Props) {
  const { genres } = props;
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
    queryKey: ["games", page, sortBy, genres],
    queryFn: () => getGames(page, sortBy, undefined, genres),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  const genreDetails = useQuery<Platform>({
    queryKey: ["genreDetails", genres],
    queryFn: () => getGenreDetails(genres),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  genreDetails.error ? `Error: ${genreDetails?.error?.message}` : null;
  genreDetails.isLoading ? "Loading..." : null;

  return (
    <>
      <PageBgImage background={genreDetails?.data?.image_background} />
      <main className="flex flex-1 flex-col">
        <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
          {genreDetails?.data?.name} Games
        </h3>

        {genreDetails?.data?.description && (
          <div
            className="mb-3 text-sm md:mb-4"
            dangerouslySetInnerHTML={{
              __html: genreDetails?.data?.description,
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
    </>
  );
}
