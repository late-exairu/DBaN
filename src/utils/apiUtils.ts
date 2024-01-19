import axios from "axios";
import {
  type ResponseData,
  type GameData,
  type GameScreenshotsRes,
  type GameSeriesRes,
  type GameStoresRes,
} from "@/types";

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

const getGameData = (id: number): Promise<GameData> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameData;
    });
};

const getGameScreenshots = (id: number): Promise<GameScreenshotsRes> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameScreenshotsRes;
    });
};

const getGameSeries = (id: number): Promise<GameSeriesRes> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameSeriesRes;
    });
};

const getGameStores = (id: number): Promise<GameStoresRes> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/stores?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameStoresRes;
    });
};

export {
  getAboveRateGames,
  getGameData,
  getGameScreenshots,
  getGameSeries,
  getGameStores,
};
