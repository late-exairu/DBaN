import Image from "next/image";
import { type Genre } from "@/types";
import Link from "next/link";

export default function GenreCard({ genre }: { genre: Genre }) {
  if (!genre) return null;

  return (
    <div className="relative overflow-hidden rounded-md text-white">
      <Image
        className="absolute inset-0 scale-[101%] object-cover object-center brightness-[60%] duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-[70%]"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={genre.image_background ?? "/game-image-placeholder.png"}
        alt={genre.name}
      />
      <div className="relative px-5 py-4 text-center text-sm">
        <h3 className="z-10 my-10 text-2xl font-bold">{genre.name}</h3>

        <p className="text-base font-bold">Popular titles:</p>

        <div className="flex flex-col">
          {genre.games?.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="mt-1 font-semibold hover:underline"
            >
              {game.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
