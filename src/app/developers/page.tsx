"use server";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDevelopers } from "@/utils/apiUtils";
import GenericCardsList from "@/components/GenericCardsList";

export default async function page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  await queryClient.fetchQuery({
    queryKey: ["developers"],
    queryFn: getDevelopers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative flex w-full flex-col">
        <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
          Developers
        </h3>

        <GenericCardsList queryKey={"developers"} />
      </main>
    </HydrationBoundary>
  );
}
