"use client";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function getAboveRateGames() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=95,100&platforms=4`,
      ),
  });
  return { data, isLoading };
}
