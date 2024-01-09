import axios from "axios";
import { type ResponseData } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getAboveRateGames = async () => {
  return axios
    .get(
      `https://api.rawg.io/api/games?metacritic=90,100&platforms=4&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ResponseData;
    });
};

export default getAboveRateGames;
