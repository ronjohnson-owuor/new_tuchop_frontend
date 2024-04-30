import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     
    },
    colors:{
      primary:"#F56E00",
      accent:"#F59300",
      lText:"#050316",
      lBackground:"#FBFBFE",
      lSecondary:"#F2F2F2",
      gray:"#6e6e6e",
      // dark theme colors
      dText:"#EAE9FC",
      dBackground:"#05070E",
      dSecondary:"#1D1D1D",
      // common colors
      error:"crimson",
      sucess:"#09FF2E",
      transparent:"transparent"
      
    }
  },
  plugins: [],
  darkMode:'class',
};
export default config;
