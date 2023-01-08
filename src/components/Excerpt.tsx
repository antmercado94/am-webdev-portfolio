import React, { useState } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { useQuery } from "../hooks/useQuery";

/* css filters */
const flickerOff = "brightness(0.4)",
  flickerOn = "brightness(1)";

/* framer motion variants - neon sign */
const duration = 0.1;
const flickerDuration = 0.8;
const signVariants = {
  /** initial */
  initial: {
    filter: flickerOff,
    transition: { duration: duration, ease: "easeOut" },
  },
  /** flicker */
  flicker: {
    filter: [
      flickerOn,
      flickerOff,
      flickerOn,
      flickerOff,
      flickerOff,
      flickerOn,
      flickerOn,
      flickerOff,
      flickerOff,
      flickerOn,
      flickerOff,
      flickerOn,
    ],
    transition: {
      duration: flickerDuration,
      ease: "easeInOut",
    },
  },
};

type Props = {
  data: {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
  };
};
type eyeSVG = {
  eye: { publicURL: String };
};

const Excerpt: React.FC<Props> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const post = useQuery("id");

  const svg: eyeSVG = useStaticQuery(graphql`
    query eyeImg {
      eye: file(relativePath: { eq: "svg/hover-eye.svg" }) {
        publicURL
      }
    }
  `);
  const eyeSVG = svg.eye.publicURL;

  const openBlog = () => {
    if (post && post === data.id) return;

    /* set blog url param */
    navigate(`?post=${data.slug}&id=${data.id}/`),
      {
        state: {
          disableScrollUpdate: true,
        },
      };
  };

  return (
    <article onClick={openBlog}>
      <div
        className={`relative min-w-full flex flex-col justify-center items-center excerpt neon-container ${
          !isMobile ? "neon-container--shadow" : ""
        } neon-container--excerpt`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="w-full font-heading font-medium tracking-widest text-themeYellow">
            {data.title}
          </h2>
          <p className="w-full font-content tracking-wide text-offWhite">
            {data.excerpt}
          </p>
          <div
            className={`absolute bottom-0 w-full flex justify-center items-center excerpt__date neon-container--excerpt__date ${
              !isMobile ? "neon-container--excerpt__date--shadow" : ""
            }`}
          >
            <motion.span
              className={`absolute text-ns font-bold text-themeMagenta neon-sign ${
                !isMobile ? "neon-sign--shadow text-shadow--magenta" : ""
              }`}
              variants={signVariants}
              initial="initial"
              animate={
                isHovered || (post && post === data.id) ? "flicker" : "initial"
              }
            >
              {data.date}
            </motion.span>
          </div>
        </div>
        <span className="absolute opacity-0 border-2 rounded border-themeTeal excerpt__hovered">
          <span className="absolute w-full h-full flex justify-center items-center z-20">
            <img
              className="w-[20%] sm:w-[13%] md:w-[10%]"
              src={`${eyeSVG}`}
              alt="View"
            ></img>
          </span>
          <span className="block absolute top-0 w-full h-full opacity-90 z-10 bg-containerBlue"></span>
        </span>
      </div>
    </article>
  );
};

export default Excerpt;
