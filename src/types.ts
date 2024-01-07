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
};

export type { ResponseData, GameData };
