import type { Config } from "tailwindcss";
import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

const config: Config = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    spacing: Array.from({ length: 100 }).reduce(
      (map: ResolvableTo<KeyValuePair<string, string>>, _, index) => {
        map[index] = `${index}px`;
        return map;
      },
      {},
    ) as ResolvableTo<KeyValuePair<string, string>>,
  },
  plugins: [require("daisyui")],
};
export default config;
