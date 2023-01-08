import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { motion } from "framer-motion";
import { Waypoint } from "react-waypoint";
import { BlogContext } from "../../context/BlogContext";
import Content from "./Content";
import Arrow from "../assets/Arrow";

/* framer motion variants - arrow svg */
const duration = 0.5;
const arrowVariant = {
  /** initial */
  initial: { opacity: 0, transition: { duration: duration } },
  /** animate to */
  animateTo: { opacity: [0, 1], transition: { duration: duration } },
  /** animate from */
  animateFrom: { opacity: [0, 0.5], transition: { duration: duration } },
};

type edgeData = {
  id: string | null;
  slug: string;
} | null;

const Blog: React.FC = () => {
  const { open, setOpen, state, dispatch, ref } = useContext(BlogContext);
  const [prev, setPrev] = useState<edgeData>(null),
    [next, setNext] = useState<edgeData>(null);
  const [endOfPage, setEndOfPage] = useState(true);

  useEffect(() => {
    if (!state.edge) return;
    /* set current blog edges */
    setPrev(
      !state.edge.previous
        ? null
        : {
            id: state.edge.previous.id,
            slug: state.edge.previous.frontmatter.slug,
          }
    );
    setNext(
      !state.edge.next
        ? null
        : { id: state.edge.next.id, slug: state.edge.next.frontmatter.slug }
    );
  }, [state.edge]);

  const getPrevBlog = () => {
    if (!prev) return;
    navigate(`?post=${prev.slug}&id=${prev.id}`);
  };

  const getNextBlog = () => {
    if (!next) return;
    navigate(`?post=${next.slug}&id=${next.id}`);
  };

  const closeBlog = () => {
    const main = document.getElementById("main")!;

    setTimeout(() => {
      setOpen(false);
      dispatch({ type: "CLEAR_CURRENT_BLOG" });
      navigate("/blog/", { replace: true });
    }, 500);
    main.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${open ? "block" : "hidden"}`} ref={ref}>
      <Waypoint
        onEnter={() => {
          open && setEndOfPage(false);
        }}
        onLeave={() => {
          open && setEndOfPage(true);
        }}
        bottomOffset="50%"
      >
        <section>
          <div className="mx-1 flex items-baseline justify-around single">
            <motion.div
              key={state.current?.id}
              className="mx-2 mt-12 mb-4 order-2 single__container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {state.current && <Content current={state.current} />}
            </motion.div>

            <div className="order-1 flex justify-center single__edge pagination">
              <motion.span
                onClick={getPrevBlog}
                className={state.edge && !state.edge.previous ? "" : "active"}
                variants={arrowVariant}
                animate={open ? "animateTo" : "initial"}
              >
                <Arrow
                  pointedPosition="left"
                  empty={state.edge && !state.edge.previous ? true : false}
                />
              </motion.span>
            </div>
            <div className="order-3 flex justify-center single__edge pagination">
              <motion.span
                onClick={getNextBlog}
                className={state.edge && !state.edge.next ? "" : "active"}
                variants={arrowVariant}
                animate={open ? "animateTo" : "initial"}
              >
                <Arrow
                  pointedPosition="right"
                  empty={state.edge && !state.edge.next ? true : false}
                />
              </motion.span>
            </div>
          </div>
          <Waypoint
            onEnter={() => {
              open && setEndOfPage(true);
            }}
            onLeave={() => {
              open && setEndOfPage(false);
            }}
          >
            <div className="py-4 flex justify-center single__close pagination">
              <motion.span
                onClick={closeBlog}
                className={`active ${!endOfPage ? "arrow--fixed" : "relative"}`}
                variants={arrowVariant}
                animate={`${endOfPage ? "animateTo" : "animateFrom"}`}
              >
                <Arrow pointedPosition="top" />
              </motion.span>
            </div>
          </Waypoint>
        </section>
      </Waypoint>
    </div>
  );
};

export default Blog;
