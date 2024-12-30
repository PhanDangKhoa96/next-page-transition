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
                gray: "#F5F7F8",
                yellow: "#F4CE14",
                sage: "#495E57",
                "outer-space": "#45474B",
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
