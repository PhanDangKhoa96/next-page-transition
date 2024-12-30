import type {Metadata} from "next";
import "./globals.css";
import {LenisProvider} from "./_components/LenisProvider";
import {GsapProvider} from "./_components/GsapProvider";
import {TransitionProvider} from "./_components/TransitionProvider";
import {Roboto} from "next/font/google";

export const metadata: Metadata = {
    title: "Khoa Phan Playground",
    description: "Khoa Phan's Playground",
};

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-roboto",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${roboto.variable}`}>
            <body className={`antialiased`}>
                <TransitionProvider>
                    <LenisProvider>{children}</LenisProvider>
                    <GsapProvider scrollTrigger />
                </TransitionProvider>
            </body>
        </html>
    );
}
