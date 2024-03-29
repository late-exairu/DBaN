"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import SystemRequirements from "@/components/SystemRequirements";
import Preloader from "@/components/Preloader";
import GameStores from "@/components/GameStores";
import Breadcrumb from "@/components/Breadcrumbs";
import GameScreenshots from "@/components/GameScreenshots";
import MetacriticScore from "@/components/MetacriticScore";
import GameSeries from "@/components/GameSeries";
import GamePlatforms from "@/components/GamePlatforms";
import GameTag from "@/components/GameTag";
import FavoriteBtn from "@/components/FavoriteBtn";
import {
  getGameData,
  getGameScreenshots,
  getGameStores,
  getGameSeries,
} from "@/utils/apiUtils";
import formatDate from "@/utils/formatDate";
import {
  type GameData,
  type ApiResponse,
  type Screenshot,
  type GameStore,
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

  const gameScreenshots = useQuery<ApiResponse<Screenshot>>({
    queryKey: ["gameScreenshots", id],
    queryFn: () => getGameScreenshots(id),
    staleTime: 600000, // 10 minutes
  });

  const gameStores = useQuery<ApiResponse<GameStore>>({
    queryKey: ["gameStores", id],
    queryFn: () => getGameStores(id),
    staleTime: 600000, // 10 minutes
  });

  const gameSeries = useQuery<ApiResponse<GameData>>({
    queryKey: ["gameSeries", id],
    queryFn: () => getGameSeries(id),
    staleTime: 600000, // 10 minutes
  });

  const isRequirementsEmpty = gameData.data?.platforms.every(
    (platform) => JSON.stringify(platform.requirements) === "{}",
  );

  if (gameData.isLoading) return <Preloader />;
  if (gameData.error) return <div>{`Error: ${gameData.error.message}`}</div>;
  if (!gameData.data) return <div>No game</div>;

  const game = gameData.data;
  const series = gameSeries.data?.results;

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

        {game.platforms && (
          <GamePlatforms size="large" platforms={game.platforms} />
        )}

        {game.playtime ? (
          <div>
            Average playtime: <span>{game.playtime}</span> hours
          </div>
        ) : null}

        <FavoriteBtn id={id} />
      </div>

      <h1 className="flex justify-between text-2xl font-black md:text-4xl xl:text-5xl">
        {game.name}
      </h1>

      <div className="flex flex-col gap-6 md:flex-row">
        <div>
          {game.background_image && (
            <div className="relative my-2 aspect-video h-auto w-full md:my-4">
              <Image
                className="block rounded-md object-cover"
                src={game.background_image ?? "/game-image-placeholder.png"}
                fill={true}
                sizes="100vw, 50vw"
                alt={game.name}
              />
            </div>
          )}

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
                  <li
                    key={platform.platform.id}
                    className="inline-block whitespace-pre-wrap"
                  >
                    <Link
                      className="underline hover:no-underline"
                      href={`/platforms/${platform.platform.slug}`}
                    >
                      {platform.platform.name}
                    </Link>
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
                  <li
                    key={genre.id}
                    className="inline-block whitespace-pre-wrap"
                  >
                    <Link
                      className="underline hover:no-underline"
                      href={`/genres/${genre.slug}`}
                    >
                      {genre.name}
                    </Link>
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
                  <li
                    key={developer.id}
                    className="inline-block whitespace-pre-wrap"
                  >
                    <Link
                      className="underline hover:no-underline"
                      href={`/developers/${developer.slug}`}
                    >
                      {developer.name}
                    </Link>
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
                  <li
                    key={publisher.id}
                    className="inline-block whitespace-pre-wrap"
                  >
                    <Link
                      className="underline hover:no-underline"
                      href={`/publishers/${publisher.slug}`}
                    >
                      {publisher.name}
                    </Link>
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
                  <li
                    key={store.store.id}
                    className="inline-block whitespace-pre-wrap"
                  >
                    <Link
                      className="underline hover:no-underline"
                      href={`/stores/${store.store.slug}`}
                    >
                      {store.store.name}
                    </Link>
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

            {game.website && (
              <div className="">
                <p className="text-sm font-bold text-slate-600">Website</p>
                <Link
                  className="underline hover:no-underline"
                  href={game.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {game.website}
                </Link>
              </div>
            )}

            {game.esrb_rating && (
              <div className="">
                <p className="text-sm font-bold text-slate-600">ESRB Rating</p>
                <p className="">{game.esrb_rating.name}</p>
              </div>
            )}

            {game.reddit_url && (
              <div className="">
                <p className="text-sm font-bold text-slate-600">Reddit</p>
                <Link
                  className="underline hover:no-underline"
                  href={game.reddit_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {game.reddit_url}
                </Link>
              </div>
            )}

            {game.tags && game.tags.length > 0 && (
              <div className="col-span-2">
                <p className="text-sm font-bold text-slate-600">Tags</p>
                <div className="flex flex-wrap gap-0.5">
                  {game.tags.map((tag) => (
                    <GameTag key={tag.id} {...tag} />
                  ))}
                </div>
              </div>
            )}
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

        <div className="sticky min-w-[300px] flex-1">
          {gameScreenshots.isSuccess &&
            gameScreenshots.data?.results.length > 0 && (
              <>
                <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:hidden md:text-xl xl:mt-5">
                  Screenshots
                </p>

                <div className="mt-2 md:mt-4">
                  {gameScreenshots.isSuccess ? (
                    <GameScreenshots
                      screenshots={gameScreenshots.data?.results}
                    />
                  ) : null}
                </div>
              </>
            )}

          {gameStores.isSuccess && gameStores.data?.results.length > 0 && (
            <>
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
            </>
          )}

          {gameSeries.isFetching ? (
            <Preloader />
          ) : (
            series &&
            series.length > 0 && (
              <>
                <p className="lx:text-2xl mt-2 text-lg font-black md:mt-4 md:text-xl xl:mt-5">
                  More of the series
                </p>
                {series && <GameSeries series={series} />}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
