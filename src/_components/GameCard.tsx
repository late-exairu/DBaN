import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/MetacriticScore";
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
  const infoRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleMouseLeave();
  }, []);

  const handleMouseOver = () => {
    if (descriptionRef.current && infoRef.current) {
      infoRef.current.style.transform = `translateY(-8px)`;
      infoRef.current.classList.add("transition-transform", "duration-300");
    }
  };

  const handleMouseLeave = () => {
    if (descriptionRef.current && infoRef.current) {
      infoRef.current.style.transform = `translateY(${descriptionRef.current.clientHeight}px)`;
    }
  };

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
      onMouseOver={() => handleMouseOver()}
      onMouseLeave={() => handleMouseLeave()}
      href={`/games/${id}`}
      className="group relative flex aspect-video overflow-clip rounded-lg bg-background px-5 py-4 text-sm leading-6 shadow-md transition-[border-radius]"
    >
      <Image
        className="absolute inset-0 scale-[101%] object-cover object-center brightness-[60%] duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-[70%]"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={background_image ?? "/game-image-placeholder.png"}
        alt={name}
      />

      <MetacriticScore className="absolute right-2 top-2" score={metacritic} />

      <div
        ref={infoRef}
        className="relative mt-auto w-full text-white ease-in-out will-change-transform"
      >
        <Platforms className="mb-2" platforms={platforms} />
        <h3 className="text-lg font-bold sm:text-xl">{name}</h3>

        <div
          ref={descriptionRef}
          className="relative top-2 text-xs opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        >
          <div className="flex gap-1 py-0.5">
            <span className="">Released:</span>
            <span className="">{releaseDate}</span>
          </div>

          <div className="flex gap-1 py-0.5">
            <span className="">Genres:</span>
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
