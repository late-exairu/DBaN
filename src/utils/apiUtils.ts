import axios from "axios";
import {
  type GameData,
  type ApiResponse,
  type Screenshot,
  type GameStore,
  type Platform,
  type Store,
  type Genre,
  type Tag,
  type Developer,
  type Publisher,
} from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getAboveRateGames = async (page: number, sortBy: string) => {
  return axios
    .get(
      `https://api.rawg.io/api/games?page_size=24&metacritic=90,100&platforms=4${
        sortBy ? "&ordering=" + sortBy : ""
      }${page ? "&page=" + page : ""}&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<GameData>;
    });
};

const getAllTimeTopGames = async (page: number, sortBy: string) => {
  return axios
    .get(
      `https://api.rawg.io/api/games?page_size=24&${
        sortBy ? "&ordering=" + sortBy : ""
      }${page ? "&page=" + page : ""}&key=${API_KEY}`,
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
      }&page_size=24&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<GameData>;
    });
};

const getGames = async (
  page: number,
  sortBy?: string,
  platforms?: string,
  genres?: string,
  stores?: string,
  tags?: string,
  publishers?: string,
  developers?: string,
) => {
  return axios
    .get(
      `https://api.rawg.io/api/games?page_size=24${
        sortBy ? "&ordering=" + sortBy : ""
      }${page ? "&page=" + page : ""}${
        platforms ? "&platforms=" + platforms : ""
      }${genres ? "&genres=" + genres : ""}${
        stores ? "&stores=" + stores : ""
      }${tags ? "&tags=" + tags : ""}${
        publishers ? "&publishers=" + publishers : ""
      }${developers ? "&developers=" + developers : ""}&key=${API_KEY}`,
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

const getGameStores = (id: number): Promise<ApiResponse<GameStore>> => {
  return axios
    .get(`https://api.rawg.io/api/games/${id}/stores?key=${API_KEY}`)
    .then((res) => {
      return res.data as ApiResponse<GameStore>;
    });
};

const getGenres = (page?: number): Promise<ApiResponse<Genre>> => {
  return axios
    .get(
      `https://api.rawg.io/api/genres?page_size=12${
        page ? "&page=" + page : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<Genre>;
    });
};

const getPlatforms = (page?: number): Promise<ApiResponse<Platform>> => {
  return axios
    .get(
      `https://api.rawg.io/api/platforms?page_size=12${
        page ? "&page=" + page : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<Platform>;
    });
};

const getStores = (page?: number): Promise<ApiResponse<Store>> => {
  return axios
    .get(
      `https://api.rawg.io/api/stores?page_size=12${
        page ? "&page=" + page : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<Store>;
    });
};

const getTags = (page?: number): Promise<ApiResponse<Tag>> => {
  return axios
    .get(
      `https://api.rawg.io/api/tags?page_size=12${
        page ? "&page=" + page : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<Tag>;
    });
};

const getDevelopers = (page?: number): Promise<ApiResponse<Developer>> => {
  return axios
    .get(
      `https://api.rawg.io/api/developers?page_size=12${
        page ? "&page=" + page : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<Developer>;
    });
};

const getPublishers = (page?: number): Promise<ApiResponse<Publisher>> => {
  return axios
    .get(
      `https://api.rawg.io/api/publishers?page_size=12${
        page ? "&page=" + page : ""
      }&key=${API_KEY}`,
    )
    .then((res) => {
      return res.data as ApiResponse<Publisher>;
    });
};

const getPlatformDetails = (id: string): Promise<Platform> => {
  return axios
    .get(`https://api.rawg.io/api/platforms/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as Platform;
    });
};

const getGenreDetails = (id: string): Promise<Genre> => {
  return axios
    .get(`https://api.rawg.io/api/genres/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as Genre;
    });
};

const getStoreDetails = (id: string): Promise<Store> => {
  return axios
    .get(`https://api.rawg.io/api/stores/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as Store;
    });
};

const getTagDetails = (id: string): Promise<Tag> => {
  return axios
    .get(`https://api.rawg.io/api/tags/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as Tag;
    });
};

const getPublisherDetails = (id: string): Promise<Publisher> => {
  return axios
    .get(`https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as Publisher;
    });
};

const getDeveloperDetails = (id: string): Promise<Developer> => {
  return axios
    .get(`https://api.rawg.io/api/developers/${id}?key=${API_KEY}`)
    .then((res) => {
      return res.data as Developer;
    });
};

export {
  getAboveRateGames,
  getAllTimeTopGames,
  getGames,
  getGameSearchResult,
  getGameData,
  getGameScreenshots,
  getGameSeries,
  getGameStores,
  getGenres,
  getPlatforms,
  getStores,
  getTags,
  getDevelopers,
  getPublishers,
  getPlatformDetails,
  getGenreDetails,
  getStoreDetails,
  getTagDetails,
  getPublisherDetails,
  getDeveloperDetails,
};
