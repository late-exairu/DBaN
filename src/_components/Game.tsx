"use client";

import useGetGameData from "@/utils/useGetGameData";

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

  if (!data) return <div>No game</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold sm:text-4xl xl:text-5xl">
        {gameData.name}
      </h1>

      <div
        className=""
        dangerouslySetInnerHTML={{ __html: gameData.description }}
      ></div>
    </div>
  );
}
