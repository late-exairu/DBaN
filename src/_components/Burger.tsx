"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

type BurgerProps = {
  className?: string;
};

export default function Burger(props: BurgerProps) {
  const { className } = props;

  return (
    <Button
      variant="outline"
      size="icon"
      className={twMerge(`shrink-0`, className)}
    >
      <HamburgerMenuIcon className="h-5 w-5" />
    </Button>
  );
}
