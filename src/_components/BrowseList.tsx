"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  getGenres,
  getPlatforms,
  getStores,
  getTags,
  getDevelopers,
  getPublishers,
} from "@/utils/apiUtils";
import BrowseCard from "@/components/BrowseCard";
import Pager from "@/components/Pager";
import {
  type ApiResponse,
  type Genre,
  type Platform,
  type Store,
  type Tag,
  type Developer,
  type Publisher,
} from "@/types";

type Props = {
  queryKey: string;
};

type Api = {
  genres: () => Promise<ApiResponse<Genre>>;
  platforms: () => Promise<ApiResponse<Platform>>;
  stores: () => Promise<ApiResponse<Store>>;
  tags: () => Promise<ApiResponse<Tag>>;
  developers: () => Promise<ApiResponse<Developer>>;
  publishers: () => Promise<ApiResponse<Publisher>>;
};

export default function BrowseList(props: Props) {
  const { queryKey } = props;

  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number.parseInt(searchParams.get("page") ?? "1"),
  );

  function handlePageChange(page: number) {
    setPage(page);
  }

  const fnList: Api = {
    genres: getGenres,
    platforms: getPlatforms,
    stores: getStores,
    tags: getTags,
    developers: getDevelopers,
    publishers: getPublishers,
  };

  const { data, isLoading, error } = useQuery<
    ApiResponse<Genre | Platform | Store | Tag | Developer | Publisher>
  >({
    queryKey: [queryKey, page],
    queryFn: fnList[queryKey as keyof Api],
    staleTime: 600000, // 10 minutes
  });

  const genericList = data?.results;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!genericList) return <div>No genres</div>;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {genericList.map((item) => (
          <BrowseCard key={item.id} browseCard={item} />
        ))}
      </div>

      {data?.count && (
        <Pager
          itemsCount={data.count}
          currentPage={page}
          pageSize={12}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
}
