import { IGatsbyImageData } from "gatsby-plugin-image";

interface gatsbyImageDataQuery {
  file: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
}

interface GatsbyPublicUrlQuery {
  file: { publicURL: string };
}

interface MarkdownRemark {
  id: string;
  frontmatter: {
    thumb: string;
    title: string;
    slug: string;
    date: string;
    repo: string;
    site: string;
    type: string;
    blog: boolean;
  };
  excerpt: string;
  html: string;
}
