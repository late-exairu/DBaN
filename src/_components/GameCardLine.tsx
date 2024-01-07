import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/ui/metacriticScore";
import { type GameData } from "@/types";

export default function GameCard(props: GameData) {
  const { name, background_image, metacritic, id, released, genres } = props;

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
        className="absolute inset-x-0 top-[-100px] scale-[101%] object-cover object-center brightness-50 duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-75"
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
        <h3 className="text-lg font-bold sm:text-xl">{name}</h3>

        <div className="relative text-xs">
          <div className="flex gap-1 py-0.5">
            <span className="font-bold">Released:</span>
            <span className="">{releaseDate}</span>
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
    </Link>
  );
}
