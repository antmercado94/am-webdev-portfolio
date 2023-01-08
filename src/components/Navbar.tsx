import React, { useEffect } from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

type Props = {
  currentPage: number;
  location: {
    state: {
      resetLandingAnimation: boolean;
    };
    pathname: string;
  };
};

const Navbar: React.FC<Props> = ({ currentPage, location }) => {
  const navItems = ["home", "about", "projects", "contact", "blog"];

  /* framer motion variants - nav item  */
  const navItemInitialDuration = 0.1;
  const navItemActiveDuration = 0.5;
  const navItemVariants = {
    /** initial */
    initial: {
      opacity: 0.65,
      color: "#EBD3D3",
      transition: { duration: navItemInitialDuration },
    },
    /** active */
    active: {
      opacity: 1,
      color: "#cfa242",
      textShadow: !isMobile ? "0px 0px 2px #cfa242" : "",
      transition: { duration: navItemActiveDuration },
    },
  };

  /* framer motion variants - desktop active nav item  */
  const desktopAnimateDuration = 0.5;
  const desktopActiveNavItemVariants = {
    /** initial left */
    initialLeft: {
      opacity: 0,
      x: -45,
    },
    /** initial right */
    initialRight: {
      opacity: 0,
      x: 25,
    },
    /** animate left */
    animateLeft: {
      opacity: 1,
      x: -15,
      transition: {
        x: { duration: desktopAnimateDuration },
      },
    },
    /** animate right */
    animateRight: {
      opacity: 1,
      x: 5,
      transition: {
        x: { duration: desktopAnimateDuration },
      },
    },
  };

  useEffect(() => {
    if (!location.state) return;
    /* set location state that resets initial landing animations */
    location.state.resetLandingAnimation = false;
  }, []);

  return (
    <motion.nav>
      <div className="pages-nav-wrapper">
        <>
          <div className="mobile-nav neon-container neon-container--mn sm:hidden">
            <ul className={`mr-[1.3rem] text-navNs neon-sign neon-sign--mn`}>
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={navItemVariants}
                  initial="initial"
                  animate={currentPage === index ? "active" : "initial"}
                  className={`${currentPage === index ? "current" : ""}`}
                  whileHover={{
                    color: "#cfa242",
                    opacity: 1,
                    transition: { duration: 0.1 },
                  }}
                >
                  <Link
                    to={`/${index !== 0 ? item : ""}`}
                    state={{
                      resetLandingAnimation: index !== 0 ? false : true,
                    }}
                  >
                    {item.charAt(0)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div className="desktop-nav hidden sm:block">
            <ul className="mr-7 font-heading text-right uppercase lg:mr-8 ">
              {navItems.map((item, index) => (
                <span key={index} className="w-full flex justify-end">
                  <Link
                    to={`/${index !== 0 ? item : ""}`}
                    state={{
                      resetLandingAnimation: index !== 0 ? false : true,
                    }}
                  >
                    <motion.li
                      variants={navItemVariants}
                      initial="initial"
                      animate={currentPage === index ? "active" : "initial"}
                      className={`${index === 1 || index === 3 ? "mr-4" : ""}${
                        index === 2 ? "mr-8" : ""
                      } ${currentPage === index ? "current" : ""}`}
                      whileHover={{
                        color: "#cfa242",
                        opacity: 1,
                        transition: { duration: 0.1 },
                      }}
                    >
                      <motion.span
                        className="absolute font-normal text-themeMagenta text-shadow--magenta"
                        variants={desktopActiveNavItemVariants}
                        initial="initialLeft"
                        animate={
                          currentPage === index ? "animateLeft" : "initialLeft"
                        }
                      >
                        {"<"}
                      </motion.span>
                      {item}
                      <motion.span
                        className="absolute font-normal text-themeMagenta text-shadow--magenta"
                        variants={desktopActiveNavItemVariants}
                        initial="initialRight"
                        animate={
                          currentPage === index
                            ? "animateRight"
                            : "initialRight"
                        }
                      >
                        {"/>"}
                      </motion.span>
                    </motion.li>
                  </Link>
                </span>
              ))}
            </ul>
          </motion.div>
        </>
      </div>
    </motion.nav>
  );
};

export default Navbar;
