"use client";

import { useStore } from "@/state/store";

export default function Overlay() {
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  return (
    <div
      className={`${
        isMenuOpen ? "visible opacity-90" : "invisible opacity-0"
      } fixed inset-0 z-10 bg-white transition-opacity lg:hidden`}
    >
      Overlay
    </div>
  );
}
