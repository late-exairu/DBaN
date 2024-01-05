import Game from "@/_components/Game";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  console.log(params);
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container flex flex-col gap-12 py-16 ">
        <Game id={id} />
      </div>
    </main>
  );
}
