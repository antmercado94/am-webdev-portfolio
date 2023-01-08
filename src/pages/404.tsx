import { useEffect } from "react";
import { navigate } from "@reach/router";

export default () => {
  /* redirect 404 */
  useEffect(() => {
    navigate("/about/");
  }, []);
  return null;
};
