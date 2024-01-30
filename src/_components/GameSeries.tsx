"use client";

import { useState, useEffect, forwardRef, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { type GameData } from "@/types";

const SeriesItem = forwardRef(
  (props: GameData, seriesItemRef: React.Ref<HTMLAnchorElement>) => {
    const { name, background_image, released, id } = props;

    return (
      <Link
        ref={seriesItemRef}
        href={`/games/${id}`}
        className="flex items-center gap-2 rounded-md text-xs font-medium transition-colors duration-300 ease-in-out hover:bg-accent"
      >
        <div className="relative size-16 shrink-0 md:size-20">
          <Image
            className="inset-0 rounded-md object-cover"
            src={background_image ?? "/game-image-placeholder.png"}
            alt={name}
            sizes="256px"
            fill={true}
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-1 text-sm font-medium md:text-base md:leading-tight">
            {name}
          </p>
          <p className="text-xs text-gray-500">
            {released ? formatDate(released) : "No release date"}
          </p>
        </div>
      </Link>
    );
  },
);

SeriesItem.displayName = "SeriesItem";

export default function GameSeries(props: { series: GameData[] }) {
  const { series } = props;
  const [isShowAllSeries, setIsShowAllSeries] = useState(false);
  const seriesRef = useRef<HTMLDivElement>(null);
  const seriesItemRef = useRef<HTMLAnchorElement>(null);
  const maxSeries = 5;

  const handleButtonClick = () => {
    setIsShowAllSeries(!isShowAllSeries);
    calcSeriesHeight();
  };

  const calcSeriesHeight = useCallback(() => {
    if (seriesItemRef.current && seriesRef.current) {
      const seriesItemHeight = seriesItemRef.current.offsetHeight;
      const seriesGap = parseInt(
        getComputedStyle(seriesRef.current).getPropertyValue("gap"),
      );
      const seriesMinHeight =
        seriesItemHeight * maxSeries + seriesGap * (maxSeries - 1);
      const seriesMaxHeight =
        seriesItemHeight * series.length + seriesGap * (series.length - 1);

      if (isShowAllSeries) {
        seriesRef.current.style.maxHeight = `${seriesMaxHeight}px`;
        return;
      }

      seriesRef.current.style.maxHeight = `${seriesMinHeight}px`;
    }
  }, [isShowAllSeries, series.length]);

  useEffect(() => {
    calcSeriesHeight();
  }, [calcSeriesHeight]);

  return (
    <div>
      <div
        ref={seriesRef}
        className="mt-2 grid grid-cols-1 gap-2 overflow-clip transition-all duration-300 ease-in-out sm:grid-cols-2 md:grid-cols-1"
      >
        {series.map((game: GameData) => (
          <SeriesItem ref={seriesItemRef} key={game.id} {...game} />
        ))}
      </div>

      {series.length > maxSeries && (
        <Button
          onClick={handleButtonClick}
          className="mt-2 w-full"
          variant="outline"
        >
          {!isShowAllSeries ? "Show more" : "Show less"}
        </Button>
      )}
    </div>
  );
}
