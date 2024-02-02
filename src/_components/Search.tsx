"use client";

import { Input } from "@/components/ui/input";
import { useStore } from "@/state/store";
import { useDebouncedCallback } from "use-debounce";
import SearchResult from "@/components/SearchResult";

export default function Search() {
  const setSearchString = useStore((state) => state.setSearchString);
  const showSearchResult = useStore((state) => state.showSearchResult);
  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 500);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 2) {
      setSearchString(e.target.value);
      showSearchResult();
    }
  }

  return (
    <div className="w-full">
      <Input
        onChange={(e) => {
          debouncedHandleSearch(e);
        }}
        onFocus={() => showSearchResult()}
        type="text"
        placeholder="Search"
      />

      <SearchResult />
    </div>
  );
}
