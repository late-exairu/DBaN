"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import getGameData from "@/utils/getGameData";
import getGameScreenshots from "@/utils/getGameScreenshots";
import getGameStores from "@/utils/getGameStores";
import formatDate from "@/utils/formatDate";
import Preloader from "@/components/Preloader";
import SystemRequirements from "@/components/SystemRequirements";
import GameStores from "@/components/GameStores";
import {
  type GameData,
  type GameScreenshots,
  type GameStoresRes,
} from "@/types";

type GameProps = {
  id: number;
};

export default function Game(props: GameProps) {
  const { id } = props;

  const gameData = useQuery<GameData>({
    queryKey: ["gameData", id],
    queryFn: () => getGameData(id),
    staleTime: 600000, // 10 minutes
  });

  const gameScreenshots = useQuery<GameScreenshots>({
    queryKey: ["gameScreenshots", id],
    queryFn: () => getGameScreenshots(id),
    staleTime: 600000, // 10 minutes
  });

  const gameStores = useQuery<GameStoresRes>({
    queryKey: ["gameStores", id],
    queryFn: () => getGameStores(id),
    staleTime: 600000, // 10 minutes
  });

  if (gameData.isLoading) return <Preloader />;
  if (gameData.error) return <div>{`Error: ${gameData.error.message}`}</div>;
  if (!gameData.data) return <div>No game</div>;

  const data = gameData.data;

  return (
    <div className="mt-2 sm:mt-3 lg:mt-5">
      <h1 className="text-2xl font-black md:text-4xl xl:text-5xl">
        {data.name}
      </h1>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="">
          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            About
          </p>

          <div
            className="prose mt-2 max-w-none"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div className="my-5 grid grid-cols-2 gap-x-4 gap-y-5 text-sm leading-relaxed">
            <div className="">
              <p className="text-sm font-bold text-slate-600">Platforms</p>
              <ul className="">
                {data.platforms.map((platform) => (
                  <li key={platform.platform.id} className="inline-block">
                    {platform.platform.name}
                    {platform !== data.platforms[data.platforms.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Genres</p>
              <ul className="">
                {data.genres.map((genre) => (
                  <li key={genre.id} className="inline-block">
                    {genre.name}
                    {genre !== data.genres[data.genres.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Developers</p>
              <ul className="">
                {data.developers.map((developer) => (
                  <li key={developer.id} className="inline-block">
                    {developer.name}
                    {developer !== data.developers[data.developers.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Publishers</p>
              <ul className="">
                {data.publishers.map((publisher) => (
                  <li key={publisher.id} className="inline-block">
                    {publisher.name}
                    {publisher !== data.publishers[data.publishers.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Stores</p>
              <ul className="">
                {data.stores.map((store) => (
                  <li key={store.store.id} className="inline-block">
                    {store.store.name}
                    {store !== data.stores[data.stores.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Release Date</p>
              <p className="">{formatDate(data.released)}</p>
            </div>

            <div className="col-span-2">
              <p className="text-sm font-bold text-slate-600">Tags</p>
              <ul className="">
                {data.tags.map((tag) => (
                  <li key={tag.id} className="inline-block">
                    {tag.name}
                    {tag !== data.tags[data.tags.length - 1] ? ", " : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            System Requirements
          </p>

          <SystemRequirements platforms={data.platforms} />
        </div>

        <div className="min-w-[300px] flex-1">
          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            Screenshots
          </p>

          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-2">
            {gameScreenshots.data?.results?.map((screenshot) => (
              <Image
                key={screenshot.id}
                className={`h-full w-full rounded-md object-cover object-center`}
                width={300}
                height={169}
                src={screenshot.image}
                alt={data.name}
              />
            ))}
          </div>

          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            Stores
          </p>

          <div className="mt-2">
            {gameStores.isSuccess ? (
              <GameStores
                gameData={data.stores}
                stores={gameStores.data?.results}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
