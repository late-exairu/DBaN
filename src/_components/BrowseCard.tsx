import Image from "next/image";
import Link from "next/link";
import { type BrowseCard } from "@/types";

export default function BrowseCard({
  browseCard,
  category,
}: {
  browseCard: BrowseCard;
  category?: string;
}) {
  if (!browseCard) return null;

  return (
    <div className="relative overflow-hidden rounded-md text-white">
      <Image
        className="absolute inset-0 scale-[101%] object-cover object-center brightness-[60%] duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-[70%]"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={browseCard.image_background ?? "/game-image-placeholder.png"}
        alt={browseCard.name}
      />
      <div className="relative px-6 pb-6 pt-4 text-sm">
        <h3 className="z-10 mb-4 mt-2 flex min-h-20 items-center justify-center text-center text-2xl font-bold leading-tight">
          <Link
            href={`/${category}/${browseCard.slug}`}
            className="underline hover:no-underline"
          >
            {browseCard.name}
          </Link>
        </h3>

        <p className="flex items-center justify-between border-b border-background/50 py-1 text-sm font-bold">
          Popular titles:
          {browseCard?.games_count && (
            <span className="text-xs"> ({browseCard?.games_count})</span>
          )}
        </p>

        <div className="flex flex-col">
          {browseCard.games?.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="mt-1 font-medium hover:underline"
            >
              {game.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
