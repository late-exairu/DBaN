"use client";

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

type Props = {
  data: ResponseData | undefined;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: { message: string } | null;
  sortBy: string;
  handleSortByChange: (value: string) => void;
};

export default function Cards(props: Props) {
  const { isLoading, error, data, sortBy, handleSortByChange } = props;

  const handleOrderChange = (value: string) => {
    handleSortByChange(value);
  };

  const handleCardStyleChange = (value: string) => {
    localStorage.setItem("cardStyle", value);
  };

  const cardStyle =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("cardStyle") ?? "grid"
      : "grid";

  if (isLoading) return <Preloader />;
  if (error) return <div>{`Error: ${error.message}`}</div>;
  if (!data) return <div>No games</div>;

  const games = data?.results;

  return (
    <Tabs
      onValueChange={handleCardStyleChange}
      defaultValue={cardStyle}
      className="flex flex-col"
    >
      <div className="flex">
        <Select onValueChange={handleOrderChange} defaultValue={sortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Order by: Release date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-metacritic">Order by: Metacritic</SelectItem>
            <SelectItem value="-released">Order by: Release date</SelectItem>
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
