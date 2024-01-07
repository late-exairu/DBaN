"use client";

import useGetAboveRateGames from "@/utils/useGetAboveRateGames";
import Preloader from "@/components/Preloader";
import GameCard from "@/components/GameCard";
import { type GameData, type ResponseData } from "@/types";

export default function Cards() {
  const { data, isLoading } = useGetAboveRateGames() as {
    data: { data: ResponseData };
    isLoading: boolean;
  };

  if (isLoading) return <Preloader />;
  if (!data) return <div>No games</div>;

  const games = data?.data.results;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {games.map((game: GameData) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
