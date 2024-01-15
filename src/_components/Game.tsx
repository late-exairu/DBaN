"use client";

import { useQuery } from "@tanstack/react-query";
import SystemRequirements from "@/components/SystemRequirements";
import Preloader from "@/components/Preloader";
import GameStores from "@/components/GameStores";
import Breadcrumb from "@/components/Breadcrumbs";
import getGameData from "@/utils/getGameData";
import getGameScreenshots from "@/utils/getGameScreenshots";
import getGameStores from "@/utils/getGameStores";
import formatDate from "@/utils/formatDate";
import {
  type GameData,
  type GameScreenshotsRes,
  type GameStoresRes,
} from "@/types";
import GameScreenshots from "@/components/GameScreenshots";
import MetacriticScore from "@/components/ui/metacriticScore";

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

  const gameScreenshots = useQuery<GameScreenshotsRes>({
    queryKey: ["gameScreenshots", id],
    queryFn: () => getGameScreenshots(id),
    staleTime: 600000, // 10 minutes
  });

  const gameStores = useQuery<GameStoresRes>({
    queryKey: ["gameStores", id],
    queryFn: () => getGameStores(id),
    staleTime: 600000, // 10 minutes
  });

  const isRequirementsEmpty = gameData.data?.platforms.every(
    (platform) => JSON.stringify(platform.requirements) === "{}",
  );

  if (gameData.isLoading) return <Preloader />;
  if (gameData.error) return <div>{`Error: ${gameData.error.message}`}</div>;
  if (!gameData.data) return <div>No game</div>;

  const game = gameData.data;

  return (
    <div className="mt-2 sm:mt-3 lg:mt-5">
      <div className="my-2 md:mb-4 md:mt-2">
        <Breadcrumb
          id={id}
          gameName={gameData.data.name}
          className=" flex text-xs font-medium uppercase leading-relaxed"
          homeElement={"Home"}
          separator={<span className="mx-1"> / </span>}
          listClasses="hover:underline"
        />
      </div>

      <div className="my-2 flex flex-wrap items-center gap-2 text-xs font-medium uppercase leading-relaxed md:my-4">
        <div
          className="-ml-2 flex items-center justify-center rounded-sm border border-input bg-background px-2"
          title="Release date"
        >
          {formatDate(game.released)}
        </div>
        {game.metacritic && (
          <MetacriticScore
            className="border border-input"
            score={game.metacritic}
          />
        )}
        {game.playtime && (
          <div>
            Average playtime: <span>{game.playtime}</span> hours
          </div>
        )}
      </div>

      <h1 className="text-2xl font-black md:text-4xl xl:text-5xl">
        {game.name}
      </h1>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="">
          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            About
          </p>

          <div
            className="prose mt-2 max-w-none"
            dangerouslySetInnerHTML={{ __html: game.description }}
          />

          <div className="my-5 grid grid-cols-2 gap-x-4 gap-y-5 text-sm leading-relaxed">
            <div className="">
              <p className="text-sm font-bold text-slate-600">Platforms</p>
              <ul className="">
                {game.platforms.map((platform) => (
                  <li key={platform.platform.id} className="inline-block">
                    {platform.platform.name}
                    {platform !== game.platforms[game.platforms.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Genres</p>
              <ul className="">
                {game.genres.map((genre) => (
                  <li key={genre.id} className="inline-block">
                    {genre.name}
                    {genre !== game.genres[game.genres.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Developers</p>
              <ul className="">
                {game.developers.map((developer) => (
                  <li key={developer.id} className="inline-block">
                    {developer.name}
                    {developer !== game.developers[game.developers.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Publishers</p>
              <ul className="">
                {game.publishers.map((publisher) => (
                  <li key={publisher.id} className="inline-block">
                    {publisher.name}
                    {publisher !== game.publishers[game.publishers.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Stores</p>
              <ul className="">
                {game.stores.map((store) => (
                  <li key={store.store.id} className="inline-block">
                    {store.store.name}
                    {store !== game.stores[game.stores.length - 1]
                      ? ", "
                      : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-bold text-slate-600">Release Date</p>
              <p className="">{formatDate(game.released)}</p>
            </div>

            <div className="col-span-2">
              <p className="text-sm font-bold text-slate-600">Tags</p>
              <ul className="">
                {game.tags.map((tag) => (
                  <li key={tag.id} className="inline-block">
                    {tag.name}
                    {tag !== game.tags[game.tags.length - 1] ? ", " : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!isRequirementsEmpty ? (
            <>
              <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
                System Requirements
              </p>
              <SystemRequirements platforms={game.platforms} />
            </>
          ) : null}
        </div>

        <div className="min-w-[300px] flex-1">
          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            Screenshots
          </p>

          <div className="mt-2">
            {gameScreenshots.isSuccess ? (
              <GameScreenshots screenshots={gameScreenshots.data?.results} />
            ) : null}
          </div>

          <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
            Stores
          </p>

          <div className="mt-2">
            {gameStores.isSuccess ? (
              <GameStores
                gameData={game.stores}
                stores={gameStores.data?.results}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
