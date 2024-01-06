"use client";

import useGetAboveRateGames from "@/utils/useGetAboveRateGames";
import GameCard from "@/components/GameCard";
import { type GameData, type ResponseData } from "@/types";

export default function Cards() {
  const { data, isLoading } = useGetAboveRateGames() as {
    data: { data: ResponseData };
    isLoading: boolean;
  };

  if (!data) return <div>No games</div>;
  if (isLoading) return <div>Loading...</div>;

  const games = data?.data.results;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {games.map((game: GameData) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
