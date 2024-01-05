"use client";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function getGameData(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`),
  });
  return { data, isLoading };
}
