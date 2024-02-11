"use client";

import { useQuery } from "@tanstack/react-query";

import { getGenres } from "@/utils/apiUtils";
import { type GenresRes } from "@/types";
import GenericCard from "./GenericCard";

export default function Genres() {
  const genresData = useQuery<GenresRes>({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 600000, // 10 minutes
  });

  const genres = genresData.data?.results;

  if (genresData.isLoading) return <div>Loading...</div>;
  if (genresData.error) return <div>Error: {genresData.error.message}</div>;
  if (!genres) return <div>No genres</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {genres.map((genre) => (
        <GenericCard key={genre.id} generic={genre} />
      ))}
    </div>
  );
}
