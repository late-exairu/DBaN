import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getGenres } from "@/utils/apiUtils";
import Genres from "@/components/Genres";

// export async function generateMetadata() {
//   return {
//     title: `Genres - DBaN`,
//   };
// }

export default async function page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  await queryClient.fetchQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative flex w-full flex-col">
        <Genres />
      </main>
    </HydrationBoundary>
  );
}
