import type { Config } from "tailwindcss";

const pxValues = (max: number): Record<string, string> => { // 0 ~ maxValue까지 생성
  return Object.fromEntries(
    Array.from({ length: max + 1 }, (_, i) => [`${i}`, `${i}px`]),
  );
};

const px0_10 = pxValues(10);
const px0_100 = pxValues(100);
const px0_300 = pxValues(300);

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_300,
      minHeight: px0_300,
      spacing: px0_300,
    },
  },
};

export default config;
