import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useStore } from "@/state/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import formatDate from "@/utils/formatDate";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getGameSearchResult } from "@/utils/apiUtils";
import { type ResponseData } from "@/types";

export default function SearchResult() {
  // const [activeIndex, setActiveIndex] = useState(-1);
  // const [focusableElements, setFocusableElements] =
  useState<NodeListOf<Element> | null>(null);

  const searchString = useStore((state) => state.searchString);
  const hideSearchResult = useStore((state) => state.hideSearchResult);
  const isSearchResultVisible = useStore(
    (state) => state.isSearchResultVisible,
  );
  const ref = useRef<HTMLUListElement | null>(null);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") hideSearchResult();
  };

  // const handleArrowUp = (e: React.KeyboardEvent) => {
  //   const total = data?.results.length;
  //   setActiveIndex(activeIndex - 1 < 0 ? total : activeIndex - 1);
  //   console.log(
  //     "UP",
  //     { activeIndex },
  //     { total },
  //     { focusableElements },
  //     { ref },
  //   );
  //   focusableElements[activeIndex]?.focus();
  //   return e.preventDefault();
  // };

  // const handleArrowDown = (e: React.KeyboardEvent) => {
  //   const total = data?.results.length;
  //   setActiveIndex(activeIndex + 1 >= total ? 0 : activeIndex + 1);
  //   console.log(
  //     "DOWN",
  //     { activeIndex },
  //     { total },
  //     { focusableElements },
  //     { ref },
  //   );
  //   focusableElements[activeIndex]?.focus();
  //   return e.preventDefault();
  // };

  const keyListenersMap = new Map([
    ["Escape", handleEscape],
    // [38, handleArrowUp],
    // [40, handleArrowDown],
  ]);

  const handleKeydown = (e: KeyboardEvent | null) => {
    if (!e) return;
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.key);

    // call the listener if it exists
    return listener && listener(e);
  };

  const { data, isLoading, error } = useQuery<ResponseData>({
    queryKey: ["gameSearchResult", searchString],
    queryFn: () => getGameSearchResult(searchString),
    placeholderData: keepPreviousData,
    staleTime: 600000, // 10 minutes
    enabled: searchString.length > 2,
  });

  // useEffect(() => {
  //   console.log("querySelectorAll update");
  //   if (ref.current) {
  //     // Select all focusable elements within ref
  //     setFocusableElements(ref.current.querySelectorAll("a[href]"));
  //   }
  //   console.log("QUERY", { activeIndex }, { focusableElements }, { ref });
  // }, [data?.results]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`${
        isSearchResultVisible ? "visible opacity-100" : "invisible opacity-0"
      } fixed bottom-0 left-0 right-0 top-[52px] border-t border-gray-200 bg-white transition-all`}
    >
      <div className="container relative">
        <p className="mt-3 text-sm md:text-base">
          Start typing to see game suggestions.{" "}
          {data?.count && data?.count > 0 ? " Results: " + data?.count : ""}
        </p>
        <Button
          onClick={() => hideSearchResult()}
          variant="outline"
          size="icon"
          className={`absolute right-4 top-0 z-10 h-9 w-9 md:right-10`}
        >
          <Cross1Icon className="h-5 w-5 fill-foreground" />
        </Button>

        {!data && (
          <p className="text-sm md:text-base">
            Use escape (
            <kbd className="rounded-sm bg-muted px-1 text-muted-foreground">
              Esc
            </kbd>
            ) to close search.
          </p>
        )}

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data?.results.length >= 0 && (
          <ScrollArea className="h-[calc(100dvh_-_88px)] pr-4">
            <ul className="flex flex-col gap-2 py-2" ref={ref}>
              {data?.results.map((game) => (
                <li key={game.id}>
                  <Link
                    onClick={() => hideSearchResult()}
                    href={`/games/${game.id}`}
                    className="flex items-center gap-2 rounded-md text-xs font-medium transition-colors duration-300 ease-in-out hover:bg-accent"
                  >
                    <div className="relative size-16 shrink-0 md:size-20">
                      <Image
                        className="inset-0 rounded-md object-cover"
                        src={
                          game.background_image ?? "/game-image-placeholder.png"
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
  );
}
