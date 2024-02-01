"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/state/store";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAboveRateGames } from "@/utils/apiUtils";
import { type ResponseData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Search() {
  const isSearchResultVisible = useStore(
    (state) => state.isSearchResultVisible,
  );
  const showSearchResult = useStore((state) => state.showSearchResult);
  const hideSearchResult = useStore((state) => state.hideSearchResult);

  const { data, isLoading, error } = useQuery<ResponseData>({
    queryKey: ["aboveRateGames", 1],
    queryFn: () => getAboveRateGames(1),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
  });

  console.log(isSearchResultVisible);

  return (
    <div className="w-full">
      <Input
        onFocus={() => {
          showSearchResult();
        }}
        type="text"
        placeholder="Search"
      />

      <div
        className={`${
          isSearchResultVisible ? "visible opacity-100" : "invisible opacity-0"
        } fixed bottom-0 left-0 right-0 top-[52px] border-t border-gray-200 bg-white/95 transition-all`}
      >
        <div className="container relative">
          <Button
            onClick={() => hideSearchResult()}
            variant="outline"
            size="icon"
            className={`absolute right-2 top-2 z-10 h-10 w-10 md:right-10 md:top-5`}
          >
            <Cross1Icon className="h-5 w-5 fill-foreground" />
          </Button>

          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && data?.results.length >= 0 && (
            <ScrollArea className="h-[calc(100dvh_-_52px)] pr-4">
              <ul className="flex flex-col gap-2 py-2">
                {data?.results.map((game) => (
                  <li key={game.id}>
                    <Link
                      href={`/games/${game.id}`}
                      className="flex items-center gap-2 rounded-md text-xs font-medium transition-colors duration-300 ease-in-out hover:bg-accent"
                    >
                      <div className="relative size-16 shrink-0 md:size-20">
                        <Image
                          className="inset-0 rounded-md object-cover"
                          src={
                            game.background_image ??
                            "/game-image-placeholder.png"
                          }
                          alt={game.name}
                          sizes="256px"
                          fill={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="mb-1 text-sm font-medium md:text-base md:leading-tight">
                          {game.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {game.released
                            ? formatDate(game.released)
                            : "No release date"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
