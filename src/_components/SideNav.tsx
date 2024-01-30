"use client";

import Link from "next/link";
import { useStore } from "@/state/store";

type SideNavProps = {
  className?: string;
};

export default function SideNav(props: SideNavProps) {
  const { className } = props;
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <aside
      className={`${className} ${isMenuOpen ? "translate-x-0" : "translate-x-full"} fixed inset-0 left-auto z-10 min-h-svh w-full min-w-44 bg-white px-5 shadow transition-transform sm:w-auto lg:relative lg:block lg:translate-x-0 lg:bg-transparent lg:px-0 lg:shadow-none `}
    >
      <ul className="sticky top-[84px] my-5 flex flex-col gap-2 text-lg font-black lg:text-2xl">
        <Link href="/">Home</Link>
        <Link href="/all-time-top">All time top</Link>
      </ul>
    </aside>
  );
}
