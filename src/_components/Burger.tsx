"use client";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/state/store";

type BurgerProps = {
  className?: string;
};

export default function Burger(props: BurgerProps) {
  const { className } = props;
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const toggleMenuOpen = useStore((state) => state.toggleMenuOpen);

  return (
    <Button
      onClick={() => toggleMenuOpen(isMenuOpen)}
      variant="outline"
      size="icon"
      className={twMerge(`shrink-0`, className)}
    >
      {isMenuOpen ? (
        <Cross1Icon className="h-5 w-5" />
      ) : (
        <HamburgerMenuIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
