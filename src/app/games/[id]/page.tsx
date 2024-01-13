import { type Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Game from "@/_components/Game";
import GameBg from "@/components/GameBg";
import getGameData from "@/utils/getGameData";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `DBaN - ${params.id}`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["gameData", id],
    queryFn: () => getGameData(id),
    staleTime: 600000, // 10 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameBg id={id} />
      <main className="relative flex flex-col">
        <Game id={id} />
      </main>
    </HydrationBoundary>
  );
}
