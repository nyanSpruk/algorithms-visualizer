import { useEffect, useState } from "react";

export function useScreenSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function update() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return width;
}
