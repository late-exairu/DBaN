import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type GameStoresProps = {
  stores: Array<{
    id: number;
    url: string;
  }>;
  gameData: Array<{
    id: number;
    store: {
      id: number;
      name: string;
    };
  }>;
};

export default function GameStores(props: GameStoresProps) {
  const { stores, gameData } = props;

  console.log({ gameData }, { stores });

  const storeMap = new Map(stores.map((store) => [store.id, store]));

  const mergedData = gameData
    .filter((game) => storeMap.has(game.id))
    .map((game) => {
      const store = storeMap.get(game.id)!;
      return {
        ...game,
        url: store.url,
      };
    });

  console.log({ mergedData });

  return (
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-2">
      {mergedData.map((store) => (
        <li key={store.id}>
          <Link
            href={store.url}
            target="_blank"
            rel="noreferrer"
            className={`${buttonVariants({ variant: "outline" })} w-full`}
          >
            {store.store.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
