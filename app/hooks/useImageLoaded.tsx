import { useEffect, useState } from "react";

export default function useImageLoaded(src: string) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = function () {
      setLoaded(true);
    };
  }, [src]);
  return [loaded];
}
