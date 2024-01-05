"use client";

import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/ui/metacriticScore";
import getAboveRateGames from "@/utils/getAboveRateGames";

type Game = {
  slug: string;
  name: string;
  body: string;
  background_image: string;
  metacritic: number;
  id: number;
};

export default function Cards() {
  const { data, isLoading } = getAboveRateGames();

  const games = data?.data.results;

  if (!games) return <div>No games</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game: Game) => (
        <div
          key={game.slug}
          className="relative flex aspect-video overflow-clip rounded-lg bg-white bg-cover bg-center px-4 py-4 text-sm leading-6 shadow-md"
        >
          <Image
            className="absolute inset-0 object-cover object-center brightness-50"
            fill={true}
            sizes="[100, 100]"
            loading="lazy"
            src={game.background_image}
            alt={game.name}
          />

          <MetacriticScore score={game.metacritic} />

          <div className="relative mt-auto text-white">
            <Link href={`/game/${game.id}`}>
              <h3 className="text-xl font-bold">{game.name}</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
