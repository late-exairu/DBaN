"use client";

import useGetGameData from "@/utils/useGetGameData";
import Preloader from "@/components/Preloader";

type GameProps = {
  id: number;
};

type GameData = {
  name: string;
  description: string;
};

export default function Game(props: GameProps) {
  const { id } = props;

  const { data, isLoading } = useGetGameData(id) as {
    data: { data: GameData };
    isLoading: boolean;
  };

  const gameData = data?.data;
  console.log(data);

  if (isLoading) return <Preloader />;
  if (!data) return <div>No game</div>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold md:text-4xl xl:text-5xl">
        {gameData.name}
      </h1>

      <div
        className="prose mt-2 max-w-none md:mt-4 xl:mt-5"
        dangerouslySetInnerHTML={{ __html: gameData.description }}
      ></div>
    </div>
  );
}
