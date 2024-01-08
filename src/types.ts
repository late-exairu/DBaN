type ResponseData = {
  results: GameData[];
};

type GameData = {
  description: string | TrustedHTML;
  slug: string;
  name: string;
  body: string;
  background_image: string;
  metacritic: number;
  id: number;
  released: string;
  platforms: PlatformList[];
  genres: {
    name: string;
    id: number;
  }[];
};

type PlatformList = {
  platform: Platform;
};

type Platform = {
  id: number;
  slug: string;
  name: string;
};

export type { ResponseData, GameData, PlatformList, Platform };
