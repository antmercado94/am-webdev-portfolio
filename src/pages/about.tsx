import React from "react";
import { graphql, PageProps } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { isMobile } from "react-device-detect";
import { gatsbyImageDataQuery } from "../types/queries";
import Arrow from "../components/assets/Arrow";

const About: React.FC<PageProps<gatsbyImageDataQuery>> = ({ data }) => {
  const meImg = getImage(data.file.childImageSharp.gatsbyImageData)!;

  return (
    <section>
      <div className="content-wrapper">
        <div className="about sm:grid">
          <div className="about__text sm:col-start-2">
            <div className="my-3 sm:my-2 flex justify-center text-center sm:justify-start sm:text-left">
              <div className="about__me">
                <h1 className="heading text-offWhite md:mb-1">about me</h1>
                <p className="font-content text-themeMagenta">
                  Hello, my name is{" "}
                  <span className="font-heading text-offWhite text-shadow--yellow ">
                    Antonio Mercado
                  </span>
                  . I am a full-stack{" "}
                  <span className="font-heading text-themeYellow text-shadow--yellow">
                    web developer
                  </span>{" "}
                  who is passionate about{" "}
                  <span className="font-heading text-themeTeal text-shadow--teal">
                    building cool things
                  </span>{" "}
                  for the web, all the while continuing to build upon my skills
                  with every new project.
                </p>
              </div>
            </div>
            <div className="my-3 sm:my-2 text-center about__skills sm:text-left">
              <h2 className="heading text-offWhite md:mb-1">skills & tech</h2>
              <div className="gap-8 flex justify-center capitalize sm:justify-start">
                <ul className="text-left font-content list">
                  <div>
                    <li>HTML</li>
                    <li>CSS/SASS</li>
                    <li>Bootstrap</li>
                    <li>JavaScript</li>
                  </div>
                  <span>
                    <Arrow />
                  </span>
                </ul>
                <ul className="text-left font-content list">
                  <div>
                    <li>React</li>
                    <li>Gatsby</li>
                    <li>Node.js</li>
                    <li>TypeScript</li>
                  </div>
                  <span>
                    <Arrow />
                  </span>
                </ul>
              </div>
            </div>
          </div>
          <div className="about__img sm:col-start-1 sm:row-start-1">
            <div className="flex justify-center img sm:justify-start">
              <div
                className={`img__container neon-container ${
                  !isMobile ? "neon-container--shadow" : ""
                } neon-container--about`}
              >
                <span
                  className={`font-bold text-themeMagenta img__sign neon-sign ${
                    !isMobile ? "neon-sign--shadow text-shadow--magenta" : ""
                  }`}
                >
                  dev
                  <span className="text-offWhite">_</span>
                </span>
                <div className="relative w-full top-4 right-4 border rounded-[var(--container-border-radius)] border-themeYellow bg-containerBlue sm:top-4 sm:right-4 md:top-5 md:right-5">
                  <div className="relative w-3/4 top-4 right-4 shadow-md sm:w-full sm:top-4 sm:right-4 md:top-5 md:right-5">
                    <GatsbyImage
                      className="w-full aspect-[2/3] rounded-[var(--container-border-radius)]"
                      objectFit="cover"
                      objectPosition="center 15%"
                      image={meImg}
                      alt="Me"
                    />
                    <span className="block absolute top-0 w-full h-full opacity-20 z-10 bg-containerBlue"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

export const query = graphql`
  query meImg {
    file(relativePath: { eq: "png/me.png" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
  }
`;
