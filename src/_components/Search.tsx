"use client";

import { Input } from "@/components/ui/input";
import { useStore } from "@/state/store";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getGameSearchResult } from "@/utils/apiUtils";
import { type ResponseData } from "@/types";
import { useDebouncedCallback } from "use-debounce";
import SearchResult from "@/components/SearchResult";

export default function Search() {
  const searchString = useStore((state) => state.searchString);
  const setSearchString = useStore((state) => state.setSearchString);
  const showSearchResult = useStore((state) => state.showSearchResult);

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 500);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 2) {
      setSearchString(e.target.value);
      showSearchResult();
    }
  }

  const { data, isLoading, error } = useQuery<ResponseData>({
    queryKey: ["gameSearchResult", searchString],
    queryFn: () => getGameSearchResult(searchString),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  // console.log(isSearchResultVisible);

  return (
    <div className="w-full">
      <Input
        onChange={(e) => {
          debouncedHandleSearch(e);
        }}
        type="text"
        placeholder="Search"
      />

      {data && data?.results.length >= 0 && (
        <SearchResult data={data} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}
