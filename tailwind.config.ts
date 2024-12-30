import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "charleston-green": "#2a2a2a",
                "pale-silver": "#CCC4B9",
            },
            fontFamily: {
                roboto: ["var(--font-roboto)"],
                magely: ["var(--font-magely)"],
                grotesk: ["var(--font-grotesk)"],
            },
        },
    },
    plugins: [],
};
export default config;
