import React, { useState } from "react";
import Image from "next/image";
import FsLightbox from "fslightbox-react";
import { type Screenshot } from "@/types";

export default function GameScreenshots(props: { screenshots: Screenshot[] }) {
  const { screenshots } = props;

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(number: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-2">
      {screenshots.map((screenshot, index) => (
        <button
          key={screenshot.id}
          onClick={() => openLightboxOnSlide(index + 1)}
        >
          <Image
            className={`h-full w-full rounded-md object-cover object-center`}
            width={300}
            height={169}
            src={screenshot.image}
            alt=""
          />
        </button>
      ))}

      <FsLightbox
        toggler={lightboxController.toggler}
        type="image"
        sources={screenshots.map((screenshot) => screenshot.image)}
        slide={lightboxController.slide}
      />
    </div>
  );
}
