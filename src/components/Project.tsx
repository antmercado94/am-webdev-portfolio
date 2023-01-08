import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { AiOutlineGithub, AiOutlineUnorderedList } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";

/* css filters */
const flickerOff = "brightness(0.4)";
const flickerOn = "brightness(1)";

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
    thumb: IGatsbyImageData | null;
    repo: string;
    site: string;
    blog: boolean;
  };
};
type eyeSVG = {
  eye: { publicURL: String };
};

const Project: React.FC<Props> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const thumb = getImage(data.thumb)!;
  const svg: eyeSVG = useStaticQuery(graphql`
    query eyeImg {
      eye: file(relativePath: { eq: "svg/hover-eye.svg" }) {
        publicURL
      }
    }
  `);
  const eyeSVG = svg.eye.publicURL;

  return (
    <div
      className={`flex justify-center items-center projects__container neon-container neon-container--project ${
        !isMobile ? "neon-container--shadow" : ""
      }`}
    >
      <div
        className={`w-full h-full flex items-center rounded-[var(--container-border-radius)] bg-cardGrey neon-container__inner--right ${
          !isMobile ? "neon-container__inner--right--shadow" : ""
        }`}
      >
        {data.site && (
          <a
            href={`${data.site}`}
            target="_blank"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-full flex justify-center items-center container__inner"
          >
            <span className="text-center font-content text-offWhite projects__thumb">
              <GatsbyImage image={thumb} alt={data.title} />
            </span>
            <span className="absolute opacity-0 w-full h-full border-2 rounded border-themeTeal container__hovered">
              <span className="absolute w-full h-full flex justify-center items-center z-20">
                <img className="w-[30%]" src={`${eyeSVG}`} alt="View"></img>
              </span>
              <span className="block absolute top-0 w-full h-full opacity-90 z-10 bg-containerBlue"></span>
            </span>
          </a>
        )}
      </div>
      <motion.span
        className={`absolute absolute-centered text-ns font-bold text-themeMagenta neon-sign ${
          !isMobile ? "neon-sign--shadow text-shadow--magenta" : ""
        }`}
        variants={signVariants}
        initial="initial"
        animate={isHovered ? "flicker" : "initial"}
      >
        project
      </motion.span>
      <div className="project-links">
        {data.repo && (
          <a href={`${data.repo}`} target="_blank">
            <span>
              <AiOutlineGithub />
            </span>
          </a>
        )}
        {data.site && (
          <a href={`${data.site}`} target="_blank">
            <span
              className={`project-links__web ${
                isHovered
                  ? "opacity-100 text-themeYellow drop-shadow-yellow"
                  : ""
              }`}
            >
              <CiGlobe />
            </span>
          </a>
        )}
        {data.blog && (
          <Link to={`/blog/?post=${data.slug}&id=${data.id}/`}>
            <span>
              <AiOutlineUnorderedList />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Project;
