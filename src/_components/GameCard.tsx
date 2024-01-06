import Link from "next/link";
import Image from "next/image";
import MetacriticScore from "@/components/ui/metacriticScore";
import { type GameData } from "@/types";

export default function GameCard(props: GameData) {
  const { slug, name, background_image, metacritic, id } = props;

  return (
    <div
      key={slug}
      className="relative flex aspect-video overflow-clip rounded-lg bg-white bg-cover bg-center px-4 py-4 text-sm leading-6 shadow-md"
    >
      <Image
        className="absolute inset-0 object-cover object-center brightness-50"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        loading="lazy"
        src={background_image}
        alt={name}
      />

      <MetacriticScore score={metacritic} />

      <div className="relative mt-auto text-white">
        <Link href={`/game/${id}`}>
          <h3 className="text-xl font-bold">{name}</h3>
        </Link>
      </div>
    </div>
  );
}
