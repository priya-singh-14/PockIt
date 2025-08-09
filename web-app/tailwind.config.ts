import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans"],
        inconsolata: ["Inconsolata"],
      },
      colors: {
        whitePrimary: "#FFFFFF",
        blackPrimary: "#05172D",
        greyPrimary: "#5A5A5A",
        blueDark:"#122943"
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
          "24px",
          {
            lineHeight: "1.3",
            fontWeight: "400",
          },
        ],
        h4: [
          "20px",
          {
            lineHeight: "1.4",
            fontWeight: "400",
          },
        ],
        h5: [
          "18px",
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
        lg: "12px",
        md: "6px",
        sm: "4px",
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
