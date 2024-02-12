import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getStores } from "@/utils/apiUtils";
import Stores from "@/components/Stores";

export default async function page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  await queryClient.fetchQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative flex w-full flex-col">
        <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
          Stores
        </h3>

        <Stores />
      </main>
    </HydrationBoundary>
  );
}
