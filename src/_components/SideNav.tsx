"use client";

import Link from "next/link";
import { useStore } from "@/state/store";
import { useActivePath } from "@/utils/useActivePath";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      { name: "Tags", href: "/tags" },
      { name: "Developers", href: "/developers" },
      { name: "Publishers", href: "/publishers" },
    ],
  },
  {
    title: "Platforms",
    items: [
      { name: "PC", href: "/platforms/pc" },
      { name: "PlayStation", href: "/platforms/playstation4" },
      { name: "Xbox One", href: "/platforms/xbox-one" },
      { name: "Nintendo Switch", href: "/platforms/nintendo-switch" },
      { name: "iOS", href: "/platforms/ios" },
      { name: "Android", href: "/platforms/android" },
    ],
  },
  {
    title: "Genres",
    items: [
      { name: "Action", href: "/genres/action" },
      { name: "Adventure", href: "/genres/adventure" },
      { name: "RPG", href: "/genres/role-playing-games-rpg" },
      { name: "Shooter", href: "/genres/shooter" },
      { name: "Simulation", href: "/genres/simulation" },
      { name: "Strategy", href: "/genres/strategy" },
      { name: "Sports", href: "/genres/sports" },
      { name: "Puzzle", href: "/genres/puzzle" },
      { name: "Fighting", href: "/genres/fighting" },
      { name: "Racing", href: "/genres/racing" },
    ],
  },
];

export default function SideNav(props: SideNavProps) {
  const { className } = props;
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const checkActivePath = useActivePath();
  const closeMenu = useStore((state) => state.closeMenu);

  return (
    <aside
      className={`${className} ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } fixed inset-0 left-auto z-10 min-h-svh w-full min-w-44 bg-white px-5 shadow transition-transform sm:w-auto lg:relative lg:inset-auto lg:block lg:min-h-0 lg:translate-x-0 lg:bg-transparent lg:px-0 lg:shadow-none`}
    >
      <nav className="sticky top-[84px] my-5">
        <ScrollArea className="h-[calc(100vh_-_84px)]">
          {menu.map((group) => (
            <div key={group.title} className="mb-5">
              <h3 className="text-xl font-black lg:text-2xl">
                <Link
                  href={group.href ?? ""}
                  onClick={() => closeMenu()}
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
                    onClick={() => closeMenu()}
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
        </ScrollArea>
      </nav>
    </aside>
  );
}
