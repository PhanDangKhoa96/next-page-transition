import type {Metadata} from "next";
import "./globals.css";
import {LenisProvider} from "./_components/LenisProvider";
import {GsapProvider} from "./_components/GsapProvider";
import {TransitionProvider} from "./_components/TransitionProvider";
import {Roboto} from "next/font/google";
import localFont from "next/font/local";

export const metadata: Metadata = {
    title: "Khoa Phan Playground",
    description: "Khoa Phan's Playground",
};

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-roboto",
});

const magely = localFont({
    src: "./fonts/Magely.otf",
    variable: "--font-magely",
});

const foundersGrotesk = localFont({
    src: [
        {
            path: "./fonts/FoundersGrotesk-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/FoundersGrotesk-Semibold.otf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/FoundersGrotesk-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-grotesk",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${roboto.variable} ${magely.variable} ${foundersGrotesk.variable}`}>
            <body className={`antialiased`}>
                <TransitionProvider>
                    <LenisProvider>{children}</LenisProvider>
                    <GsapProvider scrollTrigger />
                </TransitionProvider>
            </body>
        </html>
    );
}
