import React from "react";
import { isMobile } from "react-device-detect";
import { MarkdownRemark } from "../../types/queries";

type Props = {
  current: MarkdownRemark;
};

const Content: React.FC<Props> = ({ current }) => {
  return (
    <article>
      <div
        className={`flex flex-col items-center z-10 single__wrapper neon-container ${
          !isMobile ? "neon-container--shadow" : ""
        } neon-container--single`}
      >
        <div>
          <h2 className="single__title">{current.frontmatter.title}</h2>
          <div
            className="single__content"
            dangerouslySetInnerHTML={{ __html: current.html }}
          ></div>
        </div>
        <div
          className={`absolute top-0 w-full flex justify-center items-center neon-container--single__date ${
            !isMobile ? "neon-container--single__date--shadow" : ""
          }`}
        >
          <span
            className={`absolute font-bold text-themeMagenta single__date neon-sign ${
              !isMobile
                ? "neon-sign--shadow text-shadow--magenta single__date--shadow"
                : ""
            }`}
          >
            {current.frontmatter.date}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Content;
