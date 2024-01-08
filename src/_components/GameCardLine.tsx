import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/ui/metacriticScore";
import Platforms from "@/components/Platforms";
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

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const releaseDate = new Date(Date.parse(released)).toLocaleDateString(
    undefined,
    dateOptions,
  );

  return (
    <Link
      href={`/game/${id}`}
      className="group relative flex overflow-clip rounded-lg bg-slate-950 px-5 py-4 text-sm leading-6 shadow-md transition-[border-radius]"
    >
      <Image
        className="absolute inset-x-0 inset-y-0 scale-[101%] object-cover object-center brightness-75 duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-90 sm:top-[-100px]"
        width={1100}
        height={400}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={background_image}
        alt={name}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black" />

      <MetacriticScore score={metacritic} />

      <div className="relative w-full text-white">
        <Platforms className="mb-1" platforms={platforms} />

        <h3 className="text-lg font-bold sm:text-xl">{name}</h3>

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
