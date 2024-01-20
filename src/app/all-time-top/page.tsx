import Cards from "@/components/Cards";

export default async function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        All time top
      </h3>
      <Cards />
    </main>
  );
}
