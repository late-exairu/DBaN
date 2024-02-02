import Link from "next/link";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useStore } from "@/state/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import formatDate from "@/utils/formatDate";
import { type ReactQueryResponse, type ResponseData } from "@/types";

export default function SearchResult(props: ReactQueryResponse<ResponseData>) {
  const { data, isLoading, error } = props;

  const hideSearchResult = useStore((state) => state.hideSearchResult);
  const isSearchResultVisible = useStore(
    (state) => state.isSearchResultVisible,
  );

  return (
    <div
      className={`${
        isSearchResultVisible ? "visible opacity-100" : "invisible opacity-0"
      } fixed bottom-0 left-0 right-0 top-[52px] border-t border-gray-200 bg-white transition-all`}
    >
      <div className="container relative">
        <p className="mt-3 text-base font-medium">
          Search results: {data?.count}
        </p>
        <Button
          onClick={() => hideSearchResult()}
          variant="outline"
          size="icon"
          className={`absolute right-4 top-0 z-10 h-9 w-9 md:right-10`}
        >
          <Cross1Icon className="h-5 w-5 fill-foreground" />
        </Button>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data?.results.length >= 0 && (
          <ScrollArea className="h-[calc(100dvh_-_88px)] pr-4">
            <ul className="flex flex-col gap-2 py-2">
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
