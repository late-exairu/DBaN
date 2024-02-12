import axios from "axios";
import {
  type GameData,
  type ApiResponse,
  type Screenshot,
  type Store,
  type Platform,
  type StoreSingle,
  type Genre,
} from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getAboveRateGames = async (page: number, sortBy: string) => {
  return axios
    .get(
      `https://api.rawg.io/api/games?metacritic=90,100&platforms=4${
        sortBy ? "&ordering=" + sortBy : ""
      }${page ? "&page=" + page : null}&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<GameData>;
    });
};

const getAllTimeTopGames = async (page: number, sortBy: string) => {
  return axios
    .get(
      `https://api.rawg.io/api/games?${sortBy ? "&ordering=" + sortBy : ""}${
        page ? "&page=" + page : null
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<GameData>;
    });
};

const getGameSearchResult = async (searchString: string) => {
  return axios
    .get(
      `https://api.rawg.io/api/games?${
        searchString ? "&search=" + searchString : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<GameData>;
    });
};

const getGameData = (id: number): Promise<GameData> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as GameData;
    });
};

const getGameScreenshots = (id: number): Promise<ApiResponse<Screenshot>> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<Screenshot>;
    });
};

const getGameSeries = (id: number): Promise<ApiResponse<GameData>> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<GameData>;
    });
};

const getGameStores = (id: number): Promise<ApiResponse<Store>> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/stores?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<Store>;
    });
};

const getGenres = (): Promise<ApiResponse<Genre>> => {
  return axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<Genre>;
    });
};

const getPlatforms = (): Promise<ApiResponse<Platform>> => {
  return axios
    .get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<Platform>;
    });
};

const getStores = (): Promise<ApiResponse<StoreSingle>> => {
  return axios
    .get(`https://api.rawg.io/api/stores?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<StoreSingle>;
    });
};

export {
  getAboveRateGames,
  getAllTimeTopGames,
  getGameSearchResult,
  getGameData,
  getGameScreenshots,
  getGameSeries,
  getGameStores,
  getGenres,
  getPlatforms,
  getStores,
};
