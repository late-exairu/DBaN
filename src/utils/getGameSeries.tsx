import axios from "axios";
import { type GameSeriesRes } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getGameSeries = (id: number): Promise<GameSeriesRes> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameSeriesRes;
    });
};

export default getGameSeries;
