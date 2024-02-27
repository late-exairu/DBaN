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
  getTagDetails,
  getStoreDetails,
  getPublisherDetails,
  getDeveloperDetails,
} from "@/utils/apiUtils";
import { type ApiResponse, type GameData, type Platform } from "@/types";

type Props = {
  category:
    | "genres"
    | "platforms"
    | "stores"
    | "tags"
    | "publishers"
    | "developers";
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
    platforms: {
      detailsQueryKey: ["platformDetails", subcategory],
      detailsGetFn: getPlatformDetails,
      subcategoryArrPosition: 2, // api query param position. 0 is page, 1 is sortBy. 2 is platform id. 3 is genre id. 4 is store id. 5 is tag id. 6 is publisher id. 7 is developer id.
    },
    genres: {
      detailsQueryKey: ["genreDetails", subcategory],
      detailsGetFn: getGenreDetails,
      subcategoryArrPosition: 3,
    },
    stores: {
      detailsQueryKey: ["storeDetails", subcategory],
      detailsGetFn: getStoreDetails,
      subcategoryArrPosition: 4,
    },
    tags: {
      detailsQueryKey: ["tagDetails", subcategory],
      detailsGetFn: getTagDetails,
      subcategoryArrPosition: 5,
    },
    publishers: {
      detailsQueryKey: ["publisherDetails", subcategory],
      detailsGetFn: getPublisherDetails,
      subcategoryArrPosition: 6,
    },
    developers: {
      detailsQueryKey: ["developerDetails", subcategory],
      detailsGetFn: getDeveloperDetails,
      subcategoryArrPosition: 7,
    },
  };

  const browseCategory = categories[category];

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
