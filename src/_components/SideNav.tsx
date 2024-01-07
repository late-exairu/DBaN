import Link from "next/link";

export default function SideNav() {
  return (
    <aside className="relative z-10 hidden min-w-44 lg:block">
      <ul className="my-5 flex flex-col gap-2 text-2xl font-black">
        <Link href="/">Home</Link>
      </ul>
    </aside>
  );
}
