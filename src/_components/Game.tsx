"use client";

import Preloader from "@/components/Preloader";
import { useQuery } from "@tanstack/react-query";
import getGameData from "@/utils/getGameData";
import { type GameData } from "@/types";

type GameProps = {
  id: number;
};

export default function Game(props: GameProps) {
  const { id } = props;

  const { data, isLoading, error } = useQuery<GameData>({
    queryKey: ["gameData", id],
    queryFn: () => getGameData(id),
    staleTime: 600000, // 10 minutes
  });

  if (isLoading) return <Preloader />;
  if (error) return <div>{`Error: ${error.message}`}</div>;
  if (!data) return <div>No game</div>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold md:text-4xl xl:text-5xl">
        {data.name}
      </h1>
      <div
        className="prose mt-2 max-w-none md:mt-4 xl:mt-5"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
}
