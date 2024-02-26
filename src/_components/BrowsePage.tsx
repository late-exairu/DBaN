"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cards from "@/components/Cards";
import Pager from "@/components/Pager";
import PageBgImage from "@/components/PageBgImage";
import {
  getGames,
  getGenreDetails,
  getPlatformDetails,
} from "@/utils/apiUtils";
import { type ApiResponse, type GameData, type Platform } from "@/types";

type Props = {
  category: "genres" | "platforms";
  subcategory: string;
};

export default function BrowsePage(props: Props) {
  const { category, subcategory } = props;
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("-metacritic");
  const [page, setPage] = useState(
    Number.parseInt(searchParams.get("page") ?? "1"),
  );

  function getQueryFnParams(
    page: number,
    sortBy: string,
    categoryId: string,
  ): [number, string, string] {
    const queryFnParams: [number, string, string] = [
      page,
      sortBy,
      "" ?? undefined,
    ];
    queryFnParams[browseCategory.subcategoryArrPosition] = categoryId;
    return queryFnParams;
  }

  const categories = {
    genres: {
      title: "genre",
      titles: "genres",
      detailsQueryKey: ["genreDetails", subcategory],
      detailsGetFn: getGenreDetails,
      detailsFnParams: category,
      gamesQueryKey: ["games", page, sortBy, subcategory],
      gamesFnParams: [page, sortBy, undefined, subcategory],
      subcategoryArrPosition: 3,
    },
    platforms: {
      title: "platform",
      titles: "platforms",
      detailsQueryKey: ["platformDetails", subcategory],
      detailsGetFn: getPlatformDetails,
      detailsFnParams: category,
      gamesQueryKey: ["games", page, sortBy, subcategory],
      gamesFnParams: [page, sortBy, subcategory],
      subcategoryArrPosition: 2,
    },
  };

  const browseCategory = categories[category];
  console.log("browseCategory", browseCategory);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleSortByChange(sortBy: string) {
    setSortBy(sortBy);
  }

  const categoryDetails = useQuery<Platform>({
    queryKey: [...browseCategory.detailsQueryKey],
    queryFn: () => browseCategory.detailsGetFn(subcategory),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  const categoryId = categoryDetails?.data?.id?.toString() ?? "";
  const queryFnParams = getQueryFnParams(page, sortBy, categoryId);

  const { data, isLoading, error } = useQuery<ApiResponse<GameData>>({
    queryKey: ["games", page, sortBy, subcategory],
    queryFn: () => getGames(...queryFnParams),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  categoryDetails.error ? `Error: ${categoryDetails?.error?.message}` : null;
  categoryDetails.isLoading ? "Loading..." : null;

  return (
    <>
      <PageBgImage background={categoryDetails?.data?.image_background} />
      <main className="flex flex-1 flex-col">
        <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
          {categoryDetails?.data?.name} Games
        </h3>

        {categoryDetails?.data?.description && (
          <div
            className="mb-3 text-sm md:mb-4"
            dangerouslySetInnerHTML={{
              __html: categoryDetails?.data?.description,
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
