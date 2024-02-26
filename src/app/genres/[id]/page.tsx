import { Suspense } from "react";
import { type Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getGenreDetails } from "@/utils/apiUtils";
import BrowsePage from "@/components/BrowsePage";

type Props = {
  params: { id: string; name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getGenreDetails(params.id);

  return {
    title: `DBaN - ${data.name}`,
  };
}

export async function PageContent(props: { genres: string }) {
  const { genres } = props;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ["games", page, sortBy, genres],
  //   queryFn: () => getGames(page, sortBy, undefined, genres),
  // });

  await queryClient.prefetchQuery({
    queryKey: ["genreDetails", genres],
    queryFn: () => getGenreDetails(genres),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrowsePage genres={genres} />
    </HydrationBoundary>
  );
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  console.log("id", id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent genres={id.toString()} />
    </Suspense>
  );
}
