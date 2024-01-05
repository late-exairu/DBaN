"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import MetacriticScore from "@/components/ui/metacriticScore";

type Game = {
  slug: string;
  name: string;
  body: string;
  background_image: string;
  metacritic: number;
};

export default function Cards() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get(
        "https://api.rawg.io/api/games?key=ebdbda7ab7dd4812a327a511ec96ad1e&metacritic=95,100&platforms=4",
      ),
  });

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
            <h3 className="text-xl font-bold">{game.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
