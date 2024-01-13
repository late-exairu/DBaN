import axios from "axios";
import { type GameScreenshotsRes } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getGameScreenshots = (id: number): Promise<GameScreenshotsRes> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameScreenshotsRes;
    });
};

export default getGameScreenshots;
