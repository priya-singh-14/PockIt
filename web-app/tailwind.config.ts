import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["Pixelify Sans"],
        inconsolata: ["Inconsolata"],
      },
      colors: {
        primary: "#A69583",
        tan: "#8D7C6A",
        starYellow: "#EFC188",
        whitePrimary: "#FFF6EE",
        lightGrey: "#D9D9D9",
      },
      fontSize: {
        h1: [
          "40px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
          },
        ],
        h2: [
          "32px",
          {
            lineHeight: "1.3",
            fontWeight: "400",
          },
        ],
        h3: [
          "22px",
          {
            lineHeight: "1.3",
            fontWeight: "400",
          },
        ],
        h4: [
          "24px",
          {
            lineHeight: "1.4",
            fontWeight: "400",
          },
        ],
        h5: [
          "20px",
          {
            lineHeight: "1.4",
            fontWeight: "400",
          },
        ],
        p: [
          "18px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        li: [
          "20px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
      },
      animation: {
        spin: 'spin 10s linear infinite',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }, 
      }
    },
  },
  plugins: [],
};

export default config;
