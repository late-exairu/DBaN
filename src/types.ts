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

type Platform = {
  id: number;
  name: string;
  slug: string;
};

type PlatformList = {
  platform: Platform;
}[];

export type { ResponseData, GameData, PlatformList };
