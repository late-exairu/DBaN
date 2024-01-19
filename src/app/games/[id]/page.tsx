import { type Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Game from "@/components/Game";
import GameBg from "@/components/GameBg";
import {
  getGameData,
  getGameScreenshots,
  getGameStores,
} from "@/utils/apiUtils";

type Props = {
  params: { id: string; name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getGameData(parseInt(params.id));

  return {
    title: `DBaN - ${data.name}`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  await queryClient.fetchQuery({
    queryKey: ["gameData", id],
    queryFn: () => getGameData(id),
  });

  await queryClient.prefetchQuery({
    queryKey: ["gameScreenshots", id],
    queryFn: () => getGameScreenshots(id),
  });

  await queryClient.prefetchQuery({
    queryKey: ["gameStores", id],
    queryFn: () => getGameStores(id),
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ["gameSeries", id],
  //   queryFn: () => getGameSeries(id),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameBg id={id} />
      <main className="relative flex flex-col">
        <Game id={id} />
      </main>
    </HydrationBoundary>
  );
}
