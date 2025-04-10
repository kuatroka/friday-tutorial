import React from "react";
import Image, { ImageProps } from "next/image";

interface FixedNextImageProps extends ImageProps {}

export function FixedNextImage(props: FixedNextImageProps) {
  const { onLoadingComplete, ...rest } = props;

  const handleLoadingComplete = (img: HTMLImageElement) => {
    img.removeAttribute("fetchPriority");
    if (onLoadingComplete) {
      onLoadingComplete(img);
    }
  };

  return <Image {...rest} onLoadingComplete={handleLoadingComplete} />;
}
