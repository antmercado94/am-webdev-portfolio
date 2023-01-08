import { MarkdownRemark } from "../types/queries";

export type Data = {
  nodes: MarkdownRemark[];
  edges: Edge[];
};

export type Edge = {
  node: { id: string };
  next: { id: string | null; frontmatter: { slug: string } };
  previous: { id: string | null; frontmatter: { slug: string } };
};

export type Actions =
  | { type: "SET_DATA"; payload: Data }
  | { type: "SET_CURRENT_BLOG"; payload: string }
  | { type: "GET_EDGE_BLOGS"; payload: string }
  | { type: "CLEAR_CURRENT_BLOG" };

export const BlogReducer = (
  state: {
    data: Data;
    current: MarkdownRemark | null;
    edge: Edge | null;
  },
  action: Actions
) => {
  switch (action.type) {
    case "SET_DATA":
      /** set all blog data */
      return { ...state, data: action.payload };
    case "SET_CURRENT_BLOG":
      /** set current blog node */
      return {
        ...state,
        current: state.data.nodes.filter(blogNode => {
          return blogNode.id === action.payload;
        })[0],
      };
    case "GET_EDGE_BLOGS":
      /** get edges of current blog */
      return {
        ...state,
        edge: state.data.edges.filter(edge => {
          return edge.node.id === action.payload;
        })[0],
      };
    case "CLEAR_CURRENT_BLOG":
      return { ...state, current: null, edge: null };
    default:
      return state;
  }
};
