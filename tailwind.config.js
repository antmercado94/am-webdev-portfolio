/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "360px",
        xs: "385px",
        xs2: "480px",
        xs3: "530px",
        smHeight: { raw: "(min-width: 640px) and (max-height: 620px)" },
        mdHeight: { raw: "(min-width: 640px) and (max-height: 700px)" },
        xsHeight: { raw: "(max-width: 640px) and (max-height: 640px)" },
        xsHeightMobile: { raw: "(max-width: 640px) and (max-height: 620px)" },
        smHeightMobile: {
          raw: "(min-width: 385px) and (max-height: 720px) and (max-width: 639.9px)",
        },
        xxl: {
          raw: "(min-width: 1600px) and (min-height: 900px)",
        },
        xxxl: {
          raw: "(min-width: 2500px) and (min-height: 1200px)",
        },
      },
      aspectRatio: {
        project: "15 / 8",
        excerpt: "21 / 9",
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        content: ["Arimo", "sans-serif"],
      },
      fontSize: {
        ns: "0.55em",
        navNs: "0.55em",
      },
      colors: {
        themeMagenta: "#B8287E",
        themeYellow: "#CFA242",
        themeTeal: "#087265",
        containerBlue: "#0F1028",
        cardGrey: "#26273D",
        offWhite: "#EBD3D3",
      },
      dropShadow: {
        magenta: "0px 0px 3.16853px #B8287E",
        magentaBottom: "0px 0px 2px #B8287E",
        teal: "0px 0px 3.16853px #087265",
        tealBottom: "0px 0px 2px #087265",
        yellow: "0px 0px 2px #CFA242",
      },
      boxShadow: {
        magenta: "0px 0px 3px #B8287E",
        teal: "0px 0px 3px #087265",
      },
      gridTemplateRows: {
        projects: "repeat(4, 6.8em)",
        projectsSm: "repeat(2, auto)",
        blogs: "repeat(4, 7em)",
      },
      gridTemplateColumns: {
        landing: "4fr 5fr",
        landingSm: "min(49%, 24rem) 49%",
        projectsSm: "repeat(2, auto)",
      },
      width: {
        projects: "min(100%, 13rem)",
        listArrow: ".75em",
      },
      keyframes: {
        blink: {
          to: { visibility: "hidden" },
        },
      },
      animation: {
        blink: "blink 1.5s steps(5, start) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
