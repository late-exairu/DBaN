import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/MetacriticScore";
import Platforms from "@/components/Platforms";
import formatDate from "@/utils/formatDate";
import { type GameData } from "@/types";

export default function GameCard(props: GameData) {
  const {
    name,
    background_image,
    metacritic,
    id,
    released,
    genres,
    platforms,
  } = props;

  const releaseDate = formatDate(released);

  return (
    <Link
      href={`/games/${id}`}
      className="group relative flex overflow-clip rounded-lg bg-foreground px-4 py-3 text-sm leading-6 shadow-md transition-[border-radius] sm:px-5 sm:py-4"
    >
      <Image
        className="absolute inset-x-0 inset-y-0 scale-[101%] object-cover object-center duration-300 ease-in-out will-change-transform group-hover:scale-110 sm:top-[-100px]"
        width={1100}
        height={400}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 60vw"
        loading="lazy"
        src={background_image}
        alt={name}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/20 opacity-100 transition-opacity group-hover:opacity-75" />

      <MetacriticScore className="absolute right-4 top-4" score={metacritic} />

      <div className="relative w-full text-white">
        <Platforms
          className="absolute bottom-1 right-0"
          platforms={platforms}
        />

        <h3 className="pr-14 text-lg font-bold leading-tight sm:text-xl md:pt-0">
          {name}
        </h3>

        <div className="relative text-xs">
          <div className="flex flex-col gap-1 py-0.5 sm:flex-row">
            <div className="">
              <span className="font-bold">Released:</span>
              <span className="">{releaseDate}</span>
            </div>
            <div className="">
              <span className="font-bold">Genres:</span>
              <span className="">
                {genres.map((genre) => (
                  <span key={genre.id} className="">
                    {genre.name}
                    {genre !== genres[genres.length - 1] ? ", " : null}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
