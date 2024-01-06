import Cards from "@/components/Cards";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container flex flex-col py-16 ">
        <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
          Top Rated PC Games
        </h3>
        <Cards />
      </div>
    </main>
  );
}
