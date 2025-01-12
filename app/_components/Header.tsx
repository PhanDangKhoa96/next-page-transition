import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className="fixed left-0 top-0 w-full">
            <nav className="mx-[2vw] flex items-center justify-between py-[1vh]">
                <Link
                    target="_blank"
                    href="https://www.pldkhoa.dev/"
                    className="text-[2vw] font-black uppercase -tracking-wider">
                    khoa phan
                </Link>
                <div className="flex items-center gap-x-2">
                    <p>Built with:</p>
                    <Link
                        className="underline hover:no-underline"
                        href={"https://www.lummi.ai/"}>
                        Lumi Image
                    </Link>
                    |
                    <Link
                        className="underline hover:no-underline"
                        href={"https://next-transition-router.vercel.app/"}>
                        Next Transition Router
                    </Link>
                    |
                    <Link
                        className="underline hover:no-underline"
                        href={"https://gsap.com/"}>
                        GSAP
                    </Link>
                </div>
            </nav>
        </header>
    );
}
