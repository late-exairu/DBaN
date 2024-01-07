import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getAboveRateGames = async () => {
  await axios.get(
    `https://api.rawg.io/api/games?metacritic=90,100&platforms=4&key=${API_KEY}`,
  );
};

export default getAboveRateGames;
