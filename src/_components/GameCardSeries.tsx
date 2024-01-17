import React from "react";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { type GameData } from "@/types";

export default function GameCardSeries(props: GameData) {
  const { name, background_image, released, id } = props;

  return (
    <Link
      href={`/games/${id}`}
      className="flex items-center gap-2 rounded-md text-xs font-medium transition-colors duration-300 ease-in-out hover:bg-accent"
    >
      <div className="relative size-16 shrink-0 md:size-20">
        <Image
          className="inset-0 rounded-md object-cover"
          src={background_image}
          alt={name}
          sizes="256px"
          fill={true}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">
          {released ? formatDate(released) : "No release date"}
        </p>
      </div>
    </Link>
  );
}
