"use client";

import Preloader from "@/components/Preloader";
import BrowseCard from "@/components/BrowseCard";
import {
  type ApiResponse,
  type Genre,
  type Developer,
  type Platform,
  type Publisher,
  type Store,
  type Tag,
} from "@/types";

type Props = {
  data:
    | ApiResponse<Genre | Developer | Platform | Publisher | Store | Tag>
    | undefined;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: { message: string } | null;
  category?: string;
};

export default function BrowseList(props: Props) {
  const { isLoading, error, data, category } = props;

  if (isLoading) return <Preloader />;
  if (error) return <div>{`Error: ${error.message}`}</div>;
  if (!data) return <div>No games</div>;

  const browseList = data?.results;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {browseList.map((item) => (
        <BrowseCard key={item.id} browseCard={item} category={category} />
      ))}
    </div>
  );
}
