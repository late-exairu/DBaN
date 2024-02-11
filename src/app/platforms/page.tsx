import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPlatforms } from "@/utils/apiUtils";
import Platforms from "@/components/Platforms";

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
    queryKey: ["platforms"],
    queryFn: getPlatforms,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative flex w-full flex-col">
        <Platforms />
      </main>
    </HydrationBoundary>
  );
}
