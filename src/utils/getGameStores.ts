import axios from "axios";
import { type GameStoresRes } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getGameStores = (id: number): Promise<GameStoresRes> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/stores?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameStoresRes;
    });
};

export default getGameStores;
