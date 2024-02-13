"use client";

import Link from "next/link";
import { useStore } from "@/state/store";
import { useActivePath } from "@/utils/useActivePath";

type SideNavProps = {
  className?: string;
};

const menu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Top",
    items: [{ name: "All time top", href: "/all-time-top" }],
  },
  {
    title: "Browse",
    items: [
      { name: "Genres", href: "/genres" },
      { name: "Platforms", href: "/platforms" },
      { name: "Stores", href: "/stores" },
    ],
  },
];

export default function SideNav(props: SideNavProps) {
  const { className } = props;
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const checkActivePath = useActivePath();

  return (
    <aside
      className={`${className} ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } fixed inset-0 left-auto z-10 min-h-svh w-full min-w-44 bg-white px-5 shadow transition-transform sm:w-auto lg:relative lg:inset-auto lg:block lg:min-h-0 lg:translate-x-0 lg:bg-transparent lg:px-0 lg:shadow-none`}
    >
      <nav className="sticky top-[84px] my-5">
        {menu.map((group) => (
          <div key={group.title} className="mb-5">
            <h3 className="text-xl font-black lg:text-2xl">
              <Link
                href={group.href ?? ""}
                className={`${
                  group.href &&
                  (checkActivePath(group.href)
                    ? "font-black hover:underline"
                    : "")
                } ${group.href ? "" : "cursor-text"} relative`}
              >
                {group.href && checkActivePath(group.href) ? (
                  <span className="absolute inset-y-1 -left-2 w-1 bg-foreground" />
                ) : null}
                {group.title}
              </Link>
            </h3>
            <ul className="flex flex-col text-lg font-bold lg:text-lg">
              {group.items?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    checkActivePath(item.href) ? "font-black" : ""
                  } relative mt-2 hover:underline`}
                >
                  {checkActivePath(item.href) ? (
                    <span className="absolute inset-y-1 -left-2 w-1 bg-foreground" />
                  ) : null}
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
