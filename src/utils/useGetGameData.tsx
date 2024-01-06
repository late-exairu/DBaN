"use client";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetGameData(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gameData"],
    queryFn: () =>
      axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`),
    staleTime: 600000, // 10 minutes
  });
  return { data, isLoading, error };
}
