"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Preloader from "@/components/Preloader";
import { getGameData } from "@/utils/apiUtils";
import { type GameData } from "@/types";

type GameProps = {
  id: number;
};

export default function GameBg(props: GameProps) {
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
    <div className="absolute inset-0 z-0 opacity-20">
      <Image
        className="inset-0 object-cover grayscale"
        src={
          data.background_image_additional ??
          data.background_image ??
          "/game-image-placeholder.png"
        }
        fill={true}
        alt={data.name}
      />
      <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
