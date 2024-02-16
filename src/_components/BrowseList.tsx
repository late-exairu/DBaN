"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getGenres,
  getPlatforms,
  getStores,
  getTags,
  getDevelopers,
  getPublishers,
} from "@/utils/apiUtils";
import BrowseCard from "@/components/BrowseCard";
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

  const fnList: Api = {
    genres: getGenres,
    platforms: getPlatforms,
    stores: getStores,
    tags: getTags,
    developers: getDevelopers,
    publishers: getPublishers,
  };

  const genericListData = useQuery<
    ApiResponse<Genre | Platform | Store | Tag | Developer | Publisher>
  >({
    queryKey: [queryKey],
    queryFn: fnList[queryKey as keyof Api],
    staleTime: 600000, // 10 minutes
  });

  const genericList = genericListData.data?.results;

  if (genericListData.isLoading) return <div>Loading...</div>;
  if (genericListData.error)
    return <div>Error: {genericListData.error.message}</div>;
  if (!genericList) return <div>No genres</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {genericList.map((item) => (
        <BrowseCard key={item.id} generic={item} />
      ))}
    </div>
  );
}
