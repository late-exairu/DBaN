import Cards from "@/components/Cards";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container flex flex-col gap-12 py-16 ">
        <Cards />
      </div>
    </main>
  );
}
