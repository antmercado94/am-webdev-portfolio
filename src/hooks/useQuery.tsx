/**
 * Hook returns query param value
 */
import { useLocation } from "@reach/router";

export const useQuery = (queryParam: string) => {
  const search = new URLSearchParams(useLocation().search);
  /* return query with removed/replaced trailing slash */
  return search.get(queryParam)?.replace(/\/$/, "");
};
