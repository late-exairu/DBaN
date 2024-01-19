"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAboveRateGames } from "@/utils/apiUtils";
import Preloader from "@/components/Preloader";
import GameCard from "@/components/GameCard";
import GameCardLine from "@/components/GameCardLine";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type GameData, type ResponseData } from "@/types";

export default function Cards() {
  const [orderBy, setOrderBy] = useState("metacritic");

  const handleOrderChange = (value: string) => {
    setOrderBy(value);
    games && sortGames(value, games);
  };

  const handleCardStyleChange = (value: string) => {
    localStorage.setItem("cardStyle", value);
  };

  const sortGames = (order: string, games: GameData[]) => {
    if (order === "date") {
      return games.sort(
        (a, b) => Date.parse(b.released) - Date.parse(a.released),
      );
    } else if (order === "name") {
      return games.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "metacritic") {
      return games.sort((a, b) => b.metacritic - a.metacritic);
    } else {
      return games;
    }
  };

  const { data, isLoading, error } = useQuery<ResponseData>({
    queryKey: ["aboveRateGames"],
    queryFn: () => getAboveRateGames(),
    staleTime: 600000, // 10 minutes
  });

  const cardStyle =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("cardStyle") ?? "grid"
      : "grid";

  if (isLoading) return <Preloader />;
  if (error) return <div>{`Error: ${error.message}`}</div>;
  if (!data) return <div>No games</div>;

  const games = data?.results;
  games && sortGames(orderBy, games);

  return (
    <Tabs
      onValueChange={handleCardStyleChange}
      defaultValue={cardStyle}
      className="flex flex-col"
    >
      <div className="flex">
        <Select onValueChange={handleOrderChange} defaultValue={orderBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Order by: Release date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metacritic">Order by: Metacritic</SelectItem>
            <SelectItem value="date">Order by: Release date</SelectItem>
            <SelectItem value="name">Order by: Name</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className="mb-4 ml-auto">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="line">Line</TabsTrigger>
        </TabsList>
      </div>

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
