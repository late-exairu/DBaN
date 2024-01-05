import logoMetacritic from "@/public/logo-metacritic.svg";
import Image from "next/image";

type MetacriticScoreProps = {
  score: number;
};

export default function MetacriticScore({ score }: MetacriticScoreProps) {
  return (
    <div className="absolute right-2 top-2 flex w-12 items-center gap-1 rounded-sm bg-slate-100 px-1 text-center font-bold text-slate-900">
      <Image className="h-4 w-4" src={logoMetacritic} alt="Metacritic" />
      {score}
    </div>
  );
}
