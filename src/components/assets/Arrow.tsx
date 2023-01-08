import React from "react";
import { isMobile } from "react-device-detect";

type Props = {
  pointedPosition?: "top" | "bottom" | "left" | "right";
  empty?: boolean;
};

const Arrow: React.FC<Props> = ({ pointedPosition, empty = false }) => {
  let position: string = "";
  /* return tailwind transform utility class */
  const setPosition: () => String = () => {
    switch (pointedPosition) {
      case "top":
        position = "-rotate-90";
        break;
      case "bottom":
        position = "rotate-90";
        break;
      case "left":
        position = "rotate-180";
        break;
      case "right":
        break;
      default:
        break;
    }
    return position;
  };

  return (
    <svg
      className={`${setPosition()} ${!isMobile ? " drop-shadow-magenta" : ""}`}
      width="100%"
      height="100%"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.69316 3.76171C8.38712 4.13375 8.38713 5.12884 7.69316 5.50088L2.28164 8.40206C1.62435 8.75444 0.828778 8.27827 0.828778 7.53247L0.828778 1.73012C0.828778 0.984329 1.62435 0.508155 2.28164 0.860538L7.69316 3.76171Z"
        fill={`${empty ? "transparent" : "#EBD3D3"}`}
        stroke="rgb(184, 40, 126)"
        strokeWidth=".25"
      />
    </svg>
  );
};

export default Arrow;
