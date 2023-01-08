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
