"use client";

import useGetAboveRateGames from "@/utils/useGetAboveRateGames";
import Preloader from "@/components/Preloader";
import GameCard from "@/components/GameCard";
import GameCardLine from "@/components/GameCardLine";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type GameData, type ResponseData } from "@/types";

export default function Cards() {
  const { data, isLoading } = useGetAboveRateGames() as {
    data: { data: ResponseData };
    isLoading: boolean;
  };

  if (isLoading) return <Preloader />;
  if (!data) return <div>No games</div>;

  const games = data?.data.results;

  const handleCardStyleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    localStorage.setItem("cardStyle", target.innerText.toLowerCase());
  };

  const cardStyle = localStorage.getItem("cardStyle") ?? "grid";

  return (
    <Tabs className="flex flex-col" defaultValue={cardStyle}>
      <TabsList className="mb-4 ml-auto">
        <TabsTrigger onClick={(e) => handleCardStyleClick(e)} value="grid">
          Grid
        </TabsTrigger>
        <TabsTrigger onClick={(e) => handleCardStyleClick(e)} value="line">
          Line
        </TabsTrigger>
      </TabsList>
      <TabsContent className="m-0" value="grid">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {games.map((game: GameData) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </TabsContent>
      <TabsContent className="m-0" value="line">
        <div className="flex flex-col gap-4">
          {games.map((game: GameData) => (
            <GameCardLine key={game.id} {...game} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
