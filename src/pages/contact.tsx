import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { post } from "../helpers/httpPost";
import { AnimationContext } from "../context/AnimationContext";

/* css filters */
const flickerOff = "brightness(0.3) blur(.4px)";
const flickerOn = "brightness(1) drop-shadow(0px 0px 2px #CFA242) blur(.4px)";

/* framer motion variants - submit button */
const duration = 0.1;
const flickerDuration = 0.8;
const submitVariants = {
  /** initial */
  initial: {
    filter: flickerOff,
    transition: { duration: duration, ease: "easeOut" },
  },
  /** flicker */
  flicker: {
    filter: [
      flickerOn,
      flickerOff,
      flickerOn,
      flickerOff,
      flickerOff,
      flickerOn,
      flickerOn,
      flickerOff,
      flickerOff,
      flickerOn,
      flickerOff,
      flickerOn,
    ],
    transition: {
      duration: flickerDuration,
      ease: "easeInOut",
    },
  },
};

const Contact: React.FC = () => {
  const { setWheelReady } = useContext(AnimationContext);
  const [messageFocus, setMessageFocus] = useState(false);
  const [valid, setValid] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState({ message: "" });
  const [error, setError] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    server: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  useEffect(() => {
    /* visual check */
    if (
      !formData.name ||
      !formData.email.match(emailRegex) ||
      !formData.subject ||
      !formData.message
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [formData]);

  useEffect(() => {
    /* disable wheel if textarea focused or has val */
    messageFocus && setWheelReady(false);
  }, [messageFocus]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiURL = `${
      process.env.NODE_ENV !== "production"
        ? "http://localhost:5000"
        : process.env.GATSBY_API_URL
    }/contact`;
    const btn = document.getElementById("btnSubmit")!,
      inputs = document.querySelectorAll("input"),
      textArea = document.querySelector("textarea")!;
    /* req info */
    const options = {
      endpoint: apiURL,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(formData),
    };

    setPending(true);
    /** fetch POST req */
    post(options)
      .then(res => {
        btn.setAttribute("disabled", "");
        if (res.errors) throw res.errors;

        setPending(false);
        setError({ name: "", email: "", subject: "", message: "", server: "" });
        setFormData({ name: "", email: "", subject: "", message: "" });

        setSuccess({ message: "Email has been sent!" });

        inputs.forEach(input => {
          input.value = "";
        });
        textArea.value = "";
        setMessageFocus(false);
        btn.removeAttribute("disabled");
        setWheelReady(true);
      })
      .catch(err => {
        setPending(false);
        setError(err);
        setSuccess({ message: "" });
        btn.removeAttribute("disabled");
      });
  };

  return (
    <section>
      <div className="content-wrapper">
        <div className="contact">
          <form
            onSubmit={e => handleSubmit(e)}
            className="flex flex-col"
            noValidate
          >
            <div className="relative input-container">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  className="focus:outline-none font-content bg-transparent text-offWhite"
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <span className="absolute bottom-1 uppercase opacity-50 tracking-wider -z-10 text-offWhite contact__label focus:text-themeYellow focus:text-shadow--yellow">
                  name
                </span>
                <span
                  className={`border-b-[calc(var(--container-border-width))] border-themeMagenta ${
                    !isMobile ? "drop-shadow-magentaBottom" : ""
                  }`}
                ></span>
              </div>
              {error.name && <div className="error">{error.name}</div>}
            </div>
            <div className="relative input-container">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  className="font-content bg-transparent text-offWhite focus:outline-none"
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <span className="absolute bottom-1 uppercase opacity-50 tracking-wider -z-10 text-offWhite contact__label">
                  email
                </span>
                <span
                  className={`border-b-[calc(var(--container-border-width))] border-themeMagenta ${
                    !isMobile ? "drop-shadow-magentaBottom" : ""
                  }`}
                ></span>
              </div>
              {error.email && <div className="error">{error.email}</div>}
            </div>
            <div className="relative input-container">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  className="font-content bg-transparent text-offWhite focus:outline-none"
                  onChange={e =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
                <span className="absolute bottom-1 uppercase opacity-50 tracking-wider -z-10 text-offWhite contact__label">
                  subject
                </span>
                <span
                  className={`border-b-[calc(var(--container-border-width))] border-themeMagenta ${
                    !isMobile ? "drop-shadow-magentaBottom" : ""
                  }`}
                ></span>
              </div>
              {error.subject && <div className="error">{error.subject}</div>}
            </div>
            <div
              className={`flex justify-center contact__textarea neon-container ${
                !isMobile ? "neon-container--shadow" : ""
              } neon-container--contact`}
              data-focus={`${messageFocus}`}
            >
              <div
                className={`w-full h-auto neon-container__inner--left ${
                  !isMobile ? "neon-container__inner--left--shadow" : ""
                }`}
              >
                <div className="textarea__container">
                  <textarea
                    onFocus={() => setMessageFocus(true)}
                    onBlur={() => {
                      !formData.message
                        ? (setMessageFocus(false), setWheelReady(true))
                        : setMessageFocus(true);
                    }}
                    onChange={e =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    name=""
                    id=""
                    placeholder="..."
                    className="focus:outline-none resize-none bg-transparent text-offWhite"
                  ></textarea>
                </div>
              </div>
              <span
                className={`rotate-90 absolute absolute-centered absolute-centered--contact text-themeMagenta contact__sign neon-sign ${
                  !isMobile ? "neon-sign--shadow text-shadow--magenta" : ""
                }`}
              >
                message
              </span>
            </div>
            <div
              className={`flex ${
                error.message || error.server || success.message || pending
                  ? "justify-between"
                  : "justify-end"
              } w-full`}
            >
              {!pending && error.message && (
                <div className="error--textarea">{error.message}</div>
              )}
              {!pending && error.server && (
                <div className="error--textarea">{error.server}</div>
              )}
              {!pending && success.message && (
                <div className="success">{success.message}</div>
              )}
              {pending && (
                <div className="success animate-pulse text-sm leading-none">
                  &bull;&bull;&bull;&bull;
                </div>
              )}

              <motion.button
                id="btnSubmit"
                className="font-heading uppercase tracking-widest text-themeYellow"
                disabled={!valid ? true : false}
                variants={submitVariants}
                initial="initial"
                animate={valid ? "flicker" : "initial"}
              >
                send
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
