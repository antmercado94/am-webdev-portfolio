import React, { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface AnimationContextInterface {
  pageReady: boolean;
  setPageReady: React.Dispatch<React.SetStateAction<boolean>>;
  wheelReady: boolean;
  setWheelReady: React.Dispatch<React.SetStateAction<boolean>>;
  navReady: boolean;
  setNavReady: React.Dispatch<React.SetStateAction<boolean>>;
  landingAnimation: string;
  setLandingAnimation: React.Dispatch<React.SetStateAction<string>>;
  displayIndex: boolean;
  setDisplayIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  pageReady: false,
  setPageReady: () => false,
  wheelReady: false,
  setWheelReady: () => false,
  navReady: false,
  setNavReady: () => false,
  landingAnimation: "",
  setLandingAnimation: () => "",
  displayIndex: false,
  setDisplayIndex: () => false,
};

export const AnimationContext =
  createContext<AnimationContextInterface>(initialState);

const AnimationContextProvider: React.FC<Props> = ({ children }) => {
  const [pageReady, setPageReady] = useState(false);
  const [wheelReady, setWheelReady] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(false);
  const [landingAnimation, setLandingAnimation] = useState("");

  useEffect(() => {
    /* enable/disable mouse wheel navigation */
    setWheelReady(!pageReady ? false : true);
  }, [pageReady]);

  return (
    <AnimationContext.Provider
      value={{
        pageReady,
        setPageReady,
        wheelReady,
        setWheelReady,
        navReady,
        setNavReady,
        landingAnimation,
        setLandingAnimation,
        displayIndex,
        setDisplayIndex,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
