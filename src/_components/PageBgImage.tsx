"use client";

import Image from "next/image";

type PageBgProps = {
  background?: string;
};

export default function PageBgImage(props: PageBgProps) {
  const { background } = props;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-dvh opacity-10">
      <Image
        className="absolute inset-0 object-cover grayscale"
        src={background ?? "/game-image-placeholder.png"}
        fill={true}
        alt={background ? "Background image" : "Placeholder image"}
      />
      <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
