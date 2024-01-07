import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Game from "@/_components/Game";
import GameBg from "@/components/GameBg";
import getGameData from "@/utils/getGameData";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  const data = await queryClient.prefetchQuery({
    queryKey: ["gameData", id],
    queryFn: () => getGameData(id),
    staleTime: 600000, // 10 minutes
  });

  console.log({ data });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameBg id={id} />
      <main className="relative z-10 flex min-h-screen flex-col">
        <div className="container flex flex-col gap-12 py-16 ">
          <Game id={id} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
