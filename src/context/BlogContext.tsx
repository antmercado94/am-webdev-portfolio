import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { MarkdownRemark } from "../types/queries";
import { Actions, BlogReducer, Data, Edge } from "../reducers/BlogReducer";

interface Props {
  children: React.ReactNode;
}

export interface BlogContextInterface {
  open: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: { data: Data; current: MarkdownRemark | null; edge: Edge | null };
  dispatch: React.Dispatch<Actions>;
  ref: React.RefObject<HTMLDivElement> | null;
}

const initialState = {
  open: false,
  setOpen: () => false,
  state: { data: null!, current: null, edge: null },
  dispatch: () => null,
  ref: null,
};

export const BlogContext = createContext<BlogContextInterface>(initialState);

const BlogContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(BlogReducer, {
    data: null!,
    current: null,
    edge: null,
  });
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* set edges for current blog */
    state.current &&
      dispatch({ type: "GET_EDGE_BLOGS", payload: state.current.id });
    /* scroll when current blog changes */
    open && ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.current]);

  useEffect(() => {
    /* scroll on blog open */
    open && ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [open]);

  return (
    <BlogContext.Provider value={{ open, setOpen, state, dispatch, ref }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
