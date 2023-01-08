import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import ReactPaginate from "react-paginate";
import { MarkdownRemark } from "../types/queries";
import Project from "../components/Project";
import Arrow from "../components/assets/Arrow";

type GraphQLResult = {
  allMarkdownRemark: {
    nodes: MarkdownRemark[];
  };
  allFile: {
    nodes: {
      relativePath: string;
      childImageSharp: { gatsbyImageData: IGatsbyImageData };
    }[];
  };
};

const Projects: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const portfolio = data.allMarkdownRemark.nodes;
  const allThumbs = data.allFile.nodes;

  /* pagination */
  const numbersPerPage = 4;
  const pagesVisited = pageNumber * numbersPerPage;
  const displayProjects = portfolio
    .slice(pagesVisited, pagesVisited + numbersPerPage)
    .map(project => {
      let thumb: IGatsbyImageData | null = null;

      allThumbs.forEach(thumbData => {
        /** get thumbnail based on relative path */
        if (thumbData.relativePath !== project.frontmatter.thumb) return;
        thumb = thumbData.childImageSharp.gatsbyImageData;
      });

      const data = {
        id: project.id,
        title: project.frontmatter.title,
        slug: project.frontmatter.slug,
        thumb,
        repo: project.frontmatter.repo,
        site: project.frontmatter.site,
        blog: project.frontmatter.blog,
      };
      return <Project data={data} key={project.id} />;
    });
  const pageCount = Math.ceil(portfolio.length / numbersPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);

    const projects = document.getElementById("projects")!;
    // animate on page change
    projects.classList.remove("projects--animate");
    void projects.offsetWidth;
    projects.classList.add("projects--animate");
  };

  return (
    <section>
      <div className="content-wrapper">
        <div className="flex flex-row-reverse items-center sm:justify-end">
          <div className="flex-grow grid projects" id="projects">
            {displayProjects}
          </div>

          <div className="pagination projects__pagination">
            <ReactPaginate
              previousLabel={
                <span className={`${pageNumber === 0 ? "" : "active"}`}>
                  <Arrow
                    pointedPosition="top"
                    empty={pageNumber === 0 ? true : false}
                  />
                </span>
              }
              nextLabel={
                <span
                  className={`mx-auto ${
                    pageNumber === pageCount - 1 ? "" : "active"
                  }`}
                >
                  <Arrow
                    pointedPosition="bottom"
                    empty={pageNumber === pageCount - 1 ? true : false}
                  />
                </span>
              }
              pageCount={pageCount}
              onPageChange={changePage}
              pageLabelBuilder={page => <span className="hidden"></span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

export const query = graphql`
  query Projects {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "portfolio" } } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          type
          slug
          thumb
          repo
          site
          blog
        }
      }
    }
    allFile(
      filter: {
        extension: { regex: "/(png)/" }
        relativeDirectory: { regex: "/(thumb)/" }
      }
    ) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  }
`;
