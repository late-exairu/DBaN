type ResponseData = {
  results: GameData[];
};

type GameData = {
  slug: string;
  name: string;
  body: string;
  background_image: string;
  metacritic: number;
  id: number;
};

export type { ResponseData, GameData };
