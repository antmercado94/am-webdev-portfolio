import React from "react";
import BlogContextProvider from "./src/context/BlogContext";
import AnimationContextProvider from "./src/context/AnimationContext";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";

/* context */
export const wrapRootElement = ({ element }) => (
  <BlogContextProvider>
    <AnimationContextProvider>{element}</AnimationContextProvider>
  </BlogContextProvider>
);

/* persistent layout */
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

/* maintain scroll position */
export const shouldUpdateScroll = ({ routerProps }) => {
  return false;
};

export const onInitialClientRender = () => {
  document.getElementById("___loader")!.style.opacity = "0";
  document.getElementById("___loader")!.style.visibility = "hidden";

  if (document.getElementById("___loader")!.style.visibility === "hidden") {
    setTimeout(() => {
      document.getElementById("___loader")!.style.display = "none";
    }, 200);
  }
};
