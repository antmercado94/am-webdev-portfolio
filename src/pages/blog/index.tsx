import React, { useContext, useEffect, useState } from "react";
import { graphql, PageProps } from "gatsby";
import ReactPaginate from "react-paginate";
import { MarkdownRemark } from "../../types/queries";
import { Edge } from "../../reducers/BlogReducer";
import { BlogContext } from "../../context/BlogContext";
import { AnimationContext } from "../../context/AnimationContext";
import { useQuery } from "../../hooks/useQuery";
import Excerpt from "../../components/Excerpt";
import Arrow from "../../components/assets/Arrow";

type GraphQLResult = {
  allMarkdownRemark: {
    nodes: MarkdownRemark[];
    edges: Edge[];
  };
};

const Blogs: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { setOpen, dispatch } = useContext(BlogContext);
  const { wheelReady } = useContext(AnimationContext);
  const post = useQuery("id");
  const blogs = data.allMarkdownRemark.nodes;

  useEffect(() => {
    /* open blog on refresh if url param contains post id */
    if (post) {
      setOpen(wheelReady ? true : false);
    }
  }, [wheelReady]);

  useEffect(() => {
    /* set all initial blog data */
    blogs && dispatch({ type: "SET_DATA", payload: data.allMarkdownRemark });
  }, []);

  useEffect(() => {
    /* set current blog */
    if (post) {
      dispatch({ type: "SET_CURRENT_BLOG", payload: post });
      wheelReady && setOpen(true);
    }
  }, [post]);

  /* pagination */
  const numbersPerPage = 4;
  const pagesVisited = pageNumber * numbersPerPage;
  const displayBlogs = blogs
    .slice(pagesVisited, pagesVisited + numbersPerPage)
    .map(blog => {
      const data = {
        id: blog.id,
        title: blog.frontmatter.title,
        date: blog.frontmatter.date,
        slug: blog.frontmatter.slug,
        excerpt: blog.excerpt,
      };
      return <Excerpt data={data} key={blog.id} />;
    });
  const pageCount = Math.ceil(blogs.length / numbersPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);

    const excerpts = document.getElementById("excerpts")!;
    // animate on page change
    excerpts.classList.remove("excerpts-wrapper--animate");
    void excerpts.offsetWidth;
    excerpts.classList.add("excerpts-wrapper--animate");
  };

  return (
    <section>
      <div className="content-wrapper">
        <div className="relative flex items-center justify-center blog sm:justify-start">
          <div
            className="order-2 grid grid-rows-4 items-center excerpts-wrapper"
            id="excerpts"
          >
            {displayBlogs}
          </div>

          <div className="pagination blog__pagination">
            <ReactPaginate
              previousLabel={
                <span className={`${pageNumber === 0 ? "" : "active"}`}>
                  <Arrow
                    pointedPosition="left"
                    empty={pageNumber === 0 ? true : false}
                  />
                </span>
              }
              nextLabel={
                <span
                  className={`${pageNumber === pageCount - 1 ? "" : "active"}`}
                >
                  <Arrow
                    pointedPosition="right"
                    empty={pageNumber === pageCount - 1 ? true : false}
                  />
                </span>
              }
              pageCount={pageCount}
              onPageChange={changePage}
              pageLabelBuilder={page => <span className="hidden"></span>}
              previousLinkClassName={"pagination__previous"}
              nextLinkClassName={"pagination__next"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

export const query = graphql`
  query Blogs {
    allMarkdownRemark(
      filter: { frontmatter: { blog: { eq: true } } }
      sort: { frontmatter: { last_modified: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          slug
        }
        excerpt
        html
      }
      edges {
        node {
          id
        }
        next {
          id
          frontmatter {
            slug
          }
        }
        previous {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  }
`;
