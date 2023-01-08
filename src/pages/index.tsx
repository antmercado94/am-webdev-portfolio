import React, { useContext, useEffect } from "react";
import { AnimationContext } from "../context/AnimationContext";

type Props = {
  location: {
    state: {
      resetLandingAnimation: boolean;
    };
  };
};

const Home: React.FC<Props> = ({ location }) => {
  const { setLandingAnimation } = useContext(AnimationContext);

  useEffect(() => {
    if (!location.state) return;
    /* set reverse animation from nav link */
    location.state.resetLandingAnimation && setLandingAnimation("animateFrom");
  }, []);
  return <></>;
};

export default Home;
