import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AnimationContext } from "../../context/AnimationContext";

/* css filters */
const neonMinitial =
    "brightness(0.1) drop-shadow(0px 0px .25px #B8287E) opacity(.75)",
  neonMshow =
    "drop-shadow(0px 0px 1px #B8287E) blur(.2px) brightness(1) opacity(1)";
const neonYinitial =
    "brightness(0.1) drop-shadow(0px 0px .25px #CFA242) opacity(.75)",
  neonYshow =
    "drop-shadow(0px 0px 1px #CFA242) blur(.2px) brightness(1) opacity(1)";
const neonHide = "brightness(0) blur(.2px)";

/* framer motion variants - logo svg */
const flickerDuration = 1.5,
  flickerDelay = 1.6;
const animateToDuration = 0.5,
  animateToDelay = 1.5;
const animateFromDuration = 0.5;
const svgVariants = {
  /** flicker magenta */
  flickerM: {
    filter: [
      neonMinitial,
      neonHide,
      neonMshow,
      neonHide,
      neonHide,
      neonMshow,
      neonHide,
      neonHide,
      neonMshow,
      neonHide,
      neonMshow,
      neonMshow,
      neonMshow,
      neonMshow,
      "none",
    ],
    transition: {
      duration: flickerDuration,
      delay: flickerDelay,
      ease: "easeInOut",
    },
  },
  /** flicker yellow */
  flickerY: {
    filter: [
      neonYinitial,
      neonHide,
      neonYshow,
      neonHide,
      neonHide,
      neonYshow,
      neonHide,
      neonHide,
      neonYshow,
      neonHide,
      neonYshow,
      neonYshow,
      neonYshow,
      neonYshow,
      "none",
    ],
    transition: {
      duration: flickerDuration,
      delay: flickerDelay,
      ease: "easeInOut",
    },
  },
  /** animate to */
  animateMto: {
    filter: neonMinitial,
    transition: { duration: animateToDuration, delay: animateToDelay },
  },
  animateYto: {
    filter: neonYinitial,
    transition: { duration: animateToDuration, delay: animateToDelay },
  },
  /** animate from */
  animateMfrom: {
    filter: neonMinitial,
    transition: { duration: animateFromDuration },
  },
  animateYfrom: {
    filter: neonYinitial,
    transition: { duration: animateFromDuration },
  },
};

type Props = {
  location: {
    pathname: string;
  };
};

const Logo: React.FC<Props> = ({ location }) => {
  const { landingAnimation, pageReady, setPageReady } =
    useContext(AnimationContext);

  return (
    <motion.svg
      width="100%"
      viewBox="0 0 89 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={
        !landingAnimation && {
          opacity: 0,
        }
      }
      animate={!landingAnimation && { opacity: 1 }}
      onAnimationComplete={() => !landingAnimation && setPageReady(true)}
    >
      <motion.path
        d="M54.8274 17.6339L48.5732 23.2465H36.7856L30.5314 17.6339H54.8274ZM35.5829 41.1128V49.8087L29.3287 55.4258V39.709L31.6739 37.6024L35.5829 41.1128ZM29.3287 33.3363V18.6922L35.5829 24.2281V31.9045L31.6739 35.4978L29.3287 33.3363ZM55.9699 39.707V55.4122L49.7157 49.7992V41.1103L53.6247 37.6024L55.9699 39.707ZM49.7157 31.9214V24.2804L55.9699 18.7454V33.3428L53.6247 35.4978L49.7157 31.9214ZM49.3546 33.7168L52.4822 36.5231L49.3546 39.3294H36.0042L32.8766 36.5231L36.0042 33.7168H49.3546Z"
        fill="#B8287E"
        variants={svgVariants}
        initial={location.pathname !== "/" ? false : ""}
        animate={
          !landingAnimation || (landingAnimation === "animateTo" && pageReady)
            ? "flickerM"
            : landingAnimation === "animateTo"
            ? "animateMto"
            : landingAnimation === "animateFrom" && pageReady
            ? "flickerM"
            : "animateMfrom"
        }
      />
      <motion.path
        d="M87.5926 17.6339L81.3376 23.2467H69.5506L63.2956 17.6339H87.5926ZM68.3474 41.1136V49.8094L62.093 55.4267V39.7095L64.4386 37.6027L68.3474 41.1136ZM62.093 33.3369V18.6924L68.3474 24.2282V31.9049L64.4386 35.4981L62.093 33.3369ZM88.6749 39.7078V55.413L82.4205 49.8001V41.111L86.3293 37.6027L88.6749 39.7078ZM82.4205 31.9395V24.3358L88.6749 18.7995V33.3502L86.3293 35.4981L82.4205 31.9395ZM72.4973 27.3577L75.6547 24.542L78.7518 27.3577V38.4572L75.6547 41.3269L72.4973 38.4572V27.3577Z"
        fill="#B8287E"
        variants={svgVariants}
        initial={location.pathname !== "/" ? false : ""}
        animate={
          !landingAnimation || (landingAnimation === "animateTo" && pageReady)
            ? "flickerM"
            : landingAnimation === "animateTo"
            ? "animateMto"
            : landingAnimation === "animateFrom" && pageReady
            ? "flickerM"
            : "animateMfrom"
        }
      />
      <motion.path
        d="M40.1476 0.43103L29.327 11.1485H24.4842L19.1251 5.73822L24.4842 0.43103H40.1476ZM22.5257 30.4188L18.5071 34.5405L11.809 27.7392V13.2094L17.1673 7.85102L22.5257 13.2094V30.4188ZM16.4463 36.499L11.0879 41.8574H5.8319L0.370422 36.499L5.8319 31.1399H11.0879L16.4463 36.499ZM22.5257 59.7878L17.1673 65.1462L11.809 59.7878V45.258L18.5071 38.5598L22.5257 42.5784V59.7878ZM40.1476 72.5662H24.4842L19.1251 67.2078L24.4842 61.8487H29.327L40.1476 72.5662Z"
        fill="#CFA242"
        variants={svgVariants}
        initial={location.pathname !== "/" ? false : ""}
        animate={
          !landingAnimation || (landingAnimation === "animateTo" && pageReady)
            ? "flickerY"
            : landingAnimation === "animateTo"
            ? "animateYto"
            : landingAnimation === "animateFrom" && pageReady
            ? "flickerY"
            : "animateYfrom"
        }
      />
    </motion.svg>
  );
};

export default Logo;
