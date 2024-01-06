"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function useGetAboveRateGames() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["aboveRateGamesData"],
    queryFn: () =>
      axios.get(
        `https://api.rawg.io/api/games&metacritic=90,100&platforms=4?key=${API_KEY}`,
      ),
    staleTime: 600000, // 10 minutes
  });
  return { data, isLoading, error };
}
