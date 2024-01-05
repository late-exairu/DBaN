"use client";
import getGameData from "@/utils/getGame";

export default function Game(props) {
  const { id } = props;
  const { data, isLoading } = getGameData(id);

  console.log(data);

  if (!data) return <div>No game</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
