// Basic Types
type Platform = {
  id: number;
  slug: string;
  name: string;
  image_background?: string;
  description?: string;
};

type Developer = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background?: string;
  description?: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
  description?: string;
};

type Publisher = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description?: string;
};

type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type GameStore = {
  id: number;
  url: string;
  store: Store;
};

type Store = {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
  description?: string;
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
  reddit_url: string;
  background_image: string;
  background_image_additional?: string;
  metacritic: number;
  id: number;
  website: string;
  esrb_rating: EsrbRating;
  playtime: number;
  released: string;
  platforms: PlatformList[];
  stores: GameStore[];
  developers: Developer[];
  genres: Genre[];
  tags: Tag[];
  publishers: Publisher[];
};

type BrowseCard = {
  id: number;
  name: string;
  slug: string;
  image_background?: string;
  games?: GameData[];
  games_count?: number;
};

type EsrbRating = {
  id: number;
  name: string;
  slug: string;
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

export type {
  ReactQueryResponse,
  ApiResponse,
  GameData,
  PlatformList,
  Platform,
  GameRequirements,
  Screenshot,
  Genre,
  GameStore,
  BrowseCard,
  Store,
  Tag,
  Developer,
  Publisher,
};
