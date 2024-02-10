// Basic Types
type Platform = {
  id: number;
  slug: string;
  name: string;
};

type Developer = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
};

type Publisher = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games?: GameData[];
};

type Store = {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
};

type Screenshot = {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
};

// Data Structures
type PlatformList = {
  platform: Platform;
  requirements: {
    minimum?: string;
    recommended?: string;
  };
};

// Game Data
type GameData = {
  description: string | TrustedHTML;
  slug: string;
  name: string;
  body: string;
  background_image: string;
  metacritic: number;
  id: number;
  playtime: number;
  released: string;
  platforms: PlatformList[];
  stores: Store[];
  developers: Developer[];
  genres: Genre[];
  tags: Tag[];
  publishers: Publisher[];
};

type GameRequirements = {
  platforms: PlatformList[];
};

// API Responses

type ReactQueryResponse<T> = {
  data: T | undefined;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: { message: string } | null;
};

type ApiResponse<T> = {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: T[];
};
type ResponseData = ApiResponse<GameData>;
type GameScreenshotsRes = ApiResponse<Screenshot>;
type GameStoresRes = ApiResponse<Store>;
type GameSeriesRes = ApiResponse<GameData>;
type GenresRes = ApiResponse<Genre>;

export type {
  ReactQueryResponse,
  ResponseData,
  GameData,
  ApiResponse,
  PlatformList,
  Platform,
  GameScreenshotsRes,
  GameRequirements,
  GameStoresRes,
  GameSeriesRes,
  Screenshot,
  GenresRes,
  Genre,
};
