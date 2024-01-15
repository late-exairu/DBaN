import logoMetacritic from "@/public/logo-metacritic.svg";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type MetacriticScoreProps = {
  className?: string;
  score: number;
};

type StaticImageData = {
  src: string;
  height: number;
  width: number;
};

export default function MetacriticScore({
  score,
  className,
}: MetacriticScoreProps) {
  return (
    <div
      className={twMerge(
        `flex w-12 items-center gap-1 rounded-sm bg-background px-1 text-center font-bold`,
        className,
      )}
      title="Metacritic score"
    >
      <Image
        className="h-4 w-4"
        src={logoMetacritic as StaticImageData}
        alt="Metacritic"
      />
      {score}
    </div>
  );
}
