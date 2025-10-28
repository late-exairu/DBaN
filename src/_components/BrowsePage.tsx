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
    const queryFnParams: [number, string, string] = [page, sortBy, ""];
    queryFnParams[browseCategory.subcategoryArrPosition] = categoryId;
    return queryFnParams;
  }

  const categories = {
    platforms: {
      titleTemplate: (subcategoryValue: string) =>
        `Games for ${subcategoryValue}`,
      detailsQueryKey: ["platformDetails", subcategory],
      detailsGetFn: getPlatformDetails,
      subcategoryArrPosition: 2, // api query param position.
      // 0 - page,
      // 1 - sortBy,
      // 2 - platform id,
      // 3 - genre id,
      // 4 - store id,
      // 5 - tag id,
      // 6 - publisher id,
      // 7 - developer id.
    },
    genres: {
      titleTemplate: (subcategoryValue: string) => `${subcategoryValue} Games`,
      detailsQueryKey: ["genreDetails", subcategory],
      detailsGetFn: getGenreDetails,
      subcategoryArrPosition: 3,
    },
    stores: {
      titleTemplate: (subcategoryValue: string) =>
        `Games Available at ${subcategoryValue}`,
      detailsQueryKey: ["storeDetails", subcategory],
      detailsGetFn: getStoreDetails,
      subcategoryArrPosition: 4,
    },
    tags: {
      titleTemplate: (subcategoryValue: string) => `${subcategoryValue} Games`,
      detailsQueryKey: ["tagDetails", subcategory],
      detailsGetFn: getTagDetails,
      subcategoryArrPosition: 5,
    },
    publishers: {
      titleTemplate: (subcategoryValue: string) =>
        `Published by ${subcategoryValue}`,
      detailsQueryKey: ["publisherDetails", subcategory],
      detailsGetFn: getPublisherDetails,
      subcategoryArrPosition: 6,
    },
    developers: {
      titleTemplate: (subcategoryValue: string) =>
        `Developed by ${subcategoryValue}`,
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
        {categoryDetails?.data?.name && (
          <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
            {browseCategory.titleTemplate(categoryDetails?.data?.name)}
          </h3>
        )}

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
