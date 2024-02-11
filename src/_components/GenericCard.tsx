import Image from "next/image";
import Link from "next/link";
import { type GenericCard } from "@/types";

export default function GenericCard({ generic }: { generic: GenericCard }) {
  if (!generic) return null;

  return (
    <div className="relative overflow-hidden rounded-md text-white">
      <Image
        className="absolute inset-0 scale-[101%] object-cover object-center brightness-[60%] duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-[70%]"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={generic.image_background ?? "/game-image-placeholder.png"}
        alt={generic.name}
      />
      <div className="relative px-6 pb-6 pt-4 text-sm">
        <h3 className="z-10 my-10 text-center text-2xl font-bold">
          {generic.name}
        </h3>

        <p className="text-sm font-bold">Popular titles:</p>

        <div className="flex flex-col">
          {generic.games?.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="mt-1 font-medium hover:underline"
            >
              {game.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
