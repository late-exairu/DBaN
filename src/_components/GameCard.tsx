import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/ui/metacriticScore";
import { type GameData } from "@/types";

export default function GameCard(props: GameData) {
  const { slug, name, background_image, metacritic, id } = props;

  return (
    <Link
      href={`/game/${id}`}
      className="group relative flex aspect-video overflow-clip rounded-lg bg-white bg-cover bg-center px-4 py-4 text-sm leading-6 shadow-md"
    >
      <Image
        className="absolute inset-0 scale-[101%] object-cover object-center brightness-50 transition duration-300 ease-in-out will-change-transform group-hover:scale-110 group-hover:brightness-75"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={background_image}
        alt={name}
      />

      <MetacriticScore score={metacritic} />

      <div className="relative mt-auto text-white">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    </Link>
  );
}
