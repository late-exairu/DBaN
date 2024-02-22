"use client";

import Image from "next/image";

type PageBgProps = {
  background: string;
};

export default function PageBgImage(props: PageBgProps) {
  const { background } = props;

  return (
    <div className="absolute inset-0 z-0 opacity-10">
      <Image
        className="inset-0 object-cover grayscale"
        src={background ?? "/game-image-placeholder.png"}
        fill={true}
        alt={background}
      />
      <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
