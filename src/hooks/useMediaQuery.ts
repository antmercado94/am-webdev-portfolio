/**
 * Hook returns bool on media query match
 */
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    media.addEventListener("change", () => {
      setMatches(media.matches);
    });
    return () =>
      media.removeEventListener("change", () => {
        setMatches(media.matches);
      });
  }, [matches, query]);

  return matches;
}
