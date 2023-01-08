import React, { useContext } from "react";
import { navigate } from "gatsby";
import { AnimationContext } from "../../context/AnimationContext";

const MouseScroll = () => {
  const { setLandingAnimation } = useContext(AnimationContext);

  const handleClick = () => {
    setLandingAnimation("animateTo");
    navigate("/about");
  };

  return (
    <div
      className="opacity-25 scale-90 transition-all cursor-pointer hover:opacity-100 hover:scale-100 hover:animate-pulse icon-scroll"
      onClick={() => handleClick()}
    ></div>
  );
};

export default MouseScroll;
