import React, {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { AnimationContext } from "../context/AnimationContext";
import { BlogContext } from "../context/BlogContext";
import { getPageSlug } from "../helpers/getPageSlug";
import { useQuery } from "../hooks/useQuery";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Navbar from "./Navbar";
import Single from "./single/Single";
import Logo from "./assets/Logo";
import MouseScroll from "./assets/MouseScroll";
import pdfDoc from "../documents/AntonioMercado_Resume.pdf";

/* framer motion variants - parent */
const parentToDelay = 1.5,
  parentToDuration = 1.5;
const parentFromDelay = 1,
  parentFromDuration = 1.5;
const parentVariants = {
  /** animate to */
  animateTo: {
    height: "100%",
    transition: {
      ease: "easeInOut",
      duration: parentToDuration,
      delay: parentToDelay,
    },
  },
  /** animate from */
  animateFrom: {
    height: "auto",
    transition: {
      ease: "easeInOut",
      duration: parentFromDuration,
      delay: parentFromDelay,
    },
  },
};

/* framer motion variants - text container */
const textContainerToDuration = 0.5,
  textContainerToDelay = 0.8;
const textContainerFromDelay = 1.6;
const textContainerVariants = {
  /** animate to */
  animateTo: {
    flexGrow: 1,
    opacity: 0,
    transition: {
      duration: textContainerToDuration,
      when: "afterChildren",
      delay: textContainerToDelay,
    },
  },
  /** animate from */
  animateFrom: {
    flexGrow: 0,
    opacity: 1,
    transition: { delay: textContainerFromDelay },
  },
};

/* framer motion variants - text */
const textToDuration = 0.5,
  textToDelay = 0.3;
const textSubToDuration = 0.5,
  textSubToDelay = 0.4;
const textFromDuration = 0.5;
const textSubFromDuration = 0.5;
const textVariants = {
  /** animate to */
  animateTo: {
    y: "100%",
    transition: { duration: textToDuration, delay: textToDelay },
  },
  /** animate subheading to */
  animateSubTo: {
    y: "100%",
    transition: { duration: textSubToDuration, delay: textSubToDelay },
  },
  /** animate from */
  animateFrom: {
    y: 0,
    transition: { duration: textFromDuration },
  },
  /** animate subheading from */
  animateSubFrom: {
    y: 0,
    transition: { duration: textSubFromDuration },
  },
};

/* framer motion variants - nav */
const navToDuration = 1;
const navFromDuration = 0.5;
const navVariants = {
  /** animate to */
  animateTo: {
    opacity: 1,
    transition: { duration: navToDuration },
  },
  /** animate from */
  animateFrom: {
    opacity: 0,
    transition: { duration: navFromDuration },
  },
};

/* framer motion variants - index */
const indexVariants = {
  /** initial */
  initial: {
    opacity: 0,
  },
  /** animate to */
  animateTo: {
    opacity: 1,
  },
};

/* framer motion variants - page content */
const pageContentDuration = 0.25;
const pageContentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: pageContentDuration,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: pageContentDuration,
    },
  },
};

type Props = {
  children: ReactNode;
  location: {
    state: {
      resetLandingAnimation: boolean;
    };
    pathname: string;
  };
};
type PageData = {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
};
type bgQuery = {
  bgIMG: { publicURL: string };
};

const Layout: React.FC<Props> = ({ children, location }) => {
  const [page, setPage] = useState<PageData>({
    currentPage: 0,
    nextPage: 1,
    prevPage: null,
  });
  const [logoAnimationDone, setLogoAnimationDone] = useState(false);
  const [landingFromReady, setLandingFromReady] = useState(false);
  const [landingTextDone, setLandingTextDone] = useState(false);
  const [resetLanding, setResetLanding] = useState(false);
  const [displayNav, setDisplayNav] = useState(false);

  const { open, setOpen } = useContext(BlogContext);
  const {
    pageReady,
    setPageReady,
    wheelReady,
    setWheelReady,
    landingAnimation,
    setLandingAnimation,
    displayIndex,
    setDisplayIndex,
  } = useContext(AnimationContext);

  const post = useQuery("id");

  const isSmall = useMediaQuery("(min-width: 640px)"),
    isSmHeight = useMediaQuery("(min-width: 640px) and (max-height: 620px)"),
    isXsHeightMobile = useMediaQuery(
      "(max-width: 640px) and (max-height: 620px)"
    ),
    isSmHeightMobile = useMediaQuery(
      "(min-width: 385px) and (max-height: 720px) and (max-width: 640px)"
    );

  const data: bgQuery = useStaticQuery(graphql`
    query bg {
      bgIMG: file(relativePath: { eq: "bg/bg.jpg" }) {
        publicURL
      }
    }
  `);
  const bgIMG = data.bgIMG.publicURL;
  const path = location.pathname;

  /* framer motion variants - logo */
  const logoToDuration = 1.5,
    logoToDelay = 1.5;
  const logoFromDuration = 2.5;
  const logoVariants = {
    /** animate to */
    animateTo: {
      flexGrow: 1,
      scale: isSmall ? 0.18 : 0.35,
      originX: "40px",
      originY: "30px",
      transition: {
        ease: "easeInOut",
        duration: logoToDuration,
        delay: logoToDelay,
      },
    },
    /** animate from */
    animateFrom: {
      flexGrow: 0,
      scale: 1,
      originX: 0.05,
      originY: 0.05,
      transition: { ease: "easeInOut", duration: logoFromDuration },
    },
  };

  /* framer motion variants - logo span */
  const growDuration = 0.5,
    growDelay = 1;
  const shrinkDuration = 0.5,
    shrinkDelay = 1;
  const logoSpanVariant = {
    /** grow */
    grow: {
      width: "25.5%",
      transition: { duration: growDuration },
    },
    /** grow to */
    growTo: {
      width: "25.5%",
      transition: { duration: growDuration, delay: growDelay },
    },
    /** shrink */
    shrink: {
      width: 0,
      transition: { duration: shrinkDuration, delay: shrinkDelay },
    },
    /** shrink fast */
    shrinkFast: {
      width: 0,
      transition: { duration: shrinkDuration },
    },
  };

  useLayoutEffect(() => {
    /* hide index page elements when not on index page  */
    setDisplayIndex(location.pathname !== "/" ? false : true);
  }, []);

  useEffect(() => {
    /* start forward animation on initial load when not on index page */
    location.pathname !== "/" && setLandingAnimation("animateTo");
  }, []);

  useEffect(() => {
    /* reset landing page after reverse animation */
    resetLanding && setPageReady(true);
  }, [resetLanding]);

  useEffect(() => {
    let page: PageData = {
      currentPage: 0,
      nextPage: 1,
      prevPage: null,
    };

    /* close blog when not blog index route */
    if (!post) {
      setOpen(false);
    }

    /* set page properties based on path */
    switch (path) {
      case "/":
        break;
      case "/about/":
        page = {
          currentPage: 1,
          nextPage: 2,
          prevPage: 0,
        };
        break;
      case "/projects/":
        page = {
          currentPage: 2,
          nextPage: 3,
          prevPage: 1,
        };
        break;
      case "/contact/":
        page = {
          currentPage: 3,
          nextPage: 4,
          prevPage: 2,
        };
        break;
      case "/blog/":
        page = {
          currentPage: 4,
          nextPage: null,
          prevPage: 3,
        };
        break;
      default:
        break;
    }
    setPage(page);

    /* reset correct animations based on current animation and path */
    if (location.pathname === "/") {
      landingAnimation === "animateTo" && setLandingAnimation("animateFrom");
    }
    if (location.pathname !== "/") {
      if (landingAnimation === "animateFrom" || !landingAnimation) {
        setLogoAnimationDone(false), setLandingAnimation("animateTo");
      }
    }
  }, [location.pathname]);

  /* change page on wheel */
  const wheelEvent = (e: React.WheelEvent<HTMLDivElement>) => {
    if (open) return;
    /** up scroll */
    if (e.deltaY < 0) {
      if (page.prevPage === null) return;
      if (page.currentPage === 1) {
        /** start reverse animation on wheel from about page */
        setLandingAnimation(
          location.pathname !== "/about/" ? "" : "animateFrom"
        );
      }
      navigate(getPageSlug(page.prevPage));
    }
    /** down scroll */
    if (e.deltaY > 0) {
      if (page.nextPage === null) return;
      /** start forward animation on wheel from index page */
      if (page.currentPage === 0) {
        setLandingAnimation("animateTo");
      }
      navigate(getPageSlug(page.nextPage));
    }
  };

  const touchStart = useRef<null | number>(null),
    touchEnd = useRef<null | number>(null);
  const minSwipeDistance = 100;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null; // prevent swipe from initial touch event
    touchStart.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientY;
  };

  /* change page on swipe */
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current! - touchEnd.current!;
    const isTopSwipe = distance > minSwipeDistance;
    const isBottomSwipe = distance < -minSwipeDistance;
    if (open) return;
    /** down swipe */
    if (isBottomSwipe) {
      if (page.prevPage === null) return;
      if (page.currentPage === 1) {
        /** start reverse animation on swipe from about page */
        setLandingAnimation(
          location.pathname !== "/about/" ? "" : "animateFrom"
        );
      }
      navigate(getPageSlug(page.prevPage));
    }
    /** up swipe */
    if (isTopSwipe) {
      if (page.nextPage === null) return;
      /** start forward animation on swipe from index page */
      if (page.currentPage === 0) {
        setLandingAnimation("animateTo");
      }
      navigate(getPageSlug(page.nextPage));
    }
  };

  return (
    <>
      <div
        onWheel={e =>
          !isSmHeightMobile &&
          !isXsHeightMobile &&
          !isSmHeight &&
          wheelReady &&
          wheelEvent(e)
        }
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() =>
          !isSmHeightMobile &&
          !isXsHeightMobile &&
          !isSmHeight &&
          wheelReady &&
          onTouchEnd()
        }
        className={!open ? `h-full w-full fixed` : "min-h-screen"}
        id="main"
        style={{
          backgroundImage: `url(${bgIMG})`,
        }}
      >
        <span className="absolute w-full h-screen z-10 main__bg"></span>
        <div className="absolute w-full h-full flex justify-center items-center overflow-hidden">
          <motion.div
            className="relative w-full flex justify-evenly sm:justify-center sm:gap-[.6em]"
            variants={parentVariants}
            animate={`${landingAnimation}`}
            onAnimationStart={() => (
              setPageReady(false),
              (landingAnimation === "animateFrom" && setDisplayNav(false),
              setLandingTextDone(false)),
              resetLanding && setResetLanding(false)
            )}
            onAnimationComplete={() => {
              landingAnimation === "animateTo" && setDisplayNav(true),
                landingAnimation === "animateFrom" && setResetLanding(true);
            }}
          >
            <motion.span
              className={`pt-2 h-fit z-10 will-change-transform logo ${
                displayNav ? "resScale" : ""
              }`}
              variants={logoVariants}
              onAnimationStart={() => setLogoAnimationDone(false)}
              onAnimationComplete={() => {
                setLogoAnimationDone(
                  landingAnimation === "animateTo" ? true : false
                ),
                  landingAnimation === "animateFrom" &&
                    setLandingFromReady(true);
              }}
            >
              <div
                className={`relative w-fit ${
                  location.pathname !== "/" && pageReady && "cursor-pointer"
                }`}
                onClick={() => {
                  location.pathname !== "/" &&
                    pageReady &&
                    (navigate("/"), setLandingAnimation("animateFrom"));
                }}
              >
                <motion.span
                  className="absolute block bg-themeTeal"
                  variants={logoSpanVariant}
                  initial={{ width: location.pathname !== "/" ? "25.5%" : 0 }}
                  animate={
                    (!landingAnimation && landingTextDone) ||
                    (landingAnimation === "animateFrom" &&
                      pageReady &&
                      landingTextDone)
                      ? "grow"
                      : landingAnimation === "animateTo" && pageReady
                      ? "growTo"
                      : landingAnimation === "animateFrom"
                      ? "shrinkFast"
                      : "shrink"
                  }
                ></motion.span>
                <Logo location={location} />
              </div>
            </motion.span>
            <motion.div
              className="max-w-min flex flex-col justify-center landing-layout__text"
              variants={textContainerVariants}
            >
              <div className="overflow-hidden">
                <motion.h1
                  className="font-heading font-bold text-offWhite will-change-transform"
                  initial={{ y: location.pathname !== "/" ? 0 : "100%" }}
                  variants={textVariants}
                  animate={
                    !landingAnimation
                      ? "animateFrom"
                      : landingAnimation === "animateFrom" &&
                        resetLanding &&
                        landingFromReady
                      ? "animateSubFrom"
                      : "animateTo"
                  }
                >
                  Antonio Mercado
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-content text-themeMagenta will-change-transform"
                  initial={{ y: location.pathname !== "/" ? 0 : "100%" }}
                  variants={textVariants}
                  animate={
                    !landingAnimation
                      ? "animateSubFrom"
                      : landingAnimation === "animateFrom" &&
                        resetLanding &&
                        landingFromReady
                      ? "animateFrom"
                      : "animateSubTo"
                  }
                  onAnimationComplete={() => {
                    landingAnimation === "animateFrom" &&
                      wheelReady &&
                      (setDisplayIndex(true), setLandingTextDone(true)),
                      !landingAnimation && setLandingTextDone(true);
                  }}
                >
                  Web Developer
                </motion.h2>
              </div>
            </motion.div>
            <motion.div
              className={`max-w-[31%] absolute right-0 w-full z-10 sm:overflow-hidden smHeight:overflow-visible ${
                !displayNav ? "-z-10" : ""
              }`}
              variants={navVariants}
              initial={{ opacity: 0 }}
              animate={
                landingAnimation === "animateTo" && logoAnimationDone
                  ? "animateTo"
                  : "animateFrom"
              }
              onAnimationComplete={() =>
                landingAnimation === "animateTo" &&
                displayNav &&
                setPageReady(true)
              }
            >
              <Navbar currentPage={page.currentPage} location={location} />
            </motion.div>
            {displayIndex && (
              <>
                <motion.div
                  className="absolute w-full flex items-center justify-center text-offWhite landing-layout__links sm:justify-end"
                  variants={indexVariants}
                  initial="initial"
                  animate={
                    pageReady &&
                    (landingAnimation === "animateTo" ? "initial" : "animateTo")
                  }
                  onAnimationComplete={() => {
                    landingAnimation === "animateTo" && setDisplayIndex(false);
                  }}
                >
                  <span>
                    <a href="https://github.com/antmercado94" target={"_blank"}>
                      <AiOutlineGithub />
                    </a>
                  </span>
                  <span>
                    <a
                      href="https://twitter.com/firstfoodshop?lang=en"
                      target={"_blank"}
                    >
                      <TiSocialTwitterCircular />
                    </a>
                  </span>
                  <span>
                    <a href={pdfDoc} target={"_blank"}>
                      <HiOutlineInformationCircle />
                    </a>
                  </span>
                </motion.div>
              </>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                className={`content-layout will-change-contents ${
                  !pageReady ? "-z-10" : ""
                }`}
              >
                <motion.div
                  variants={pageContentVariants}
                  initial="hidden"
                  animate={`${pageReady && "visible"}`}
                  exit="exit"
                  onAnimationStart={() => setWheelReady(false)}
                  onAnimationComplete={() => pageReady && setWheelReady(true)}
                >
                  <main>{children}</main>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        {displayIndex && (
          <motion.div
            className="bottom-[5vh] absolute w-fit left-1/2 right-1/2 -translate-x-1/2"
            variants={indexVariants}
            initial="initial"
            animate={
              pageReady &&
              (landingAnimation === "animateTo" || !displayIndex
                ? "initial"
                : "animateTo")
            }
          >
            <MouseScroll />
          </motion.div>
        )}
      </div>
      <div className="bg-containerBlue">
        <Single />
      </div>
    </>
  );
};

export default Layout;
