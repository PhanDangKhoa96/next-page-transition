import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className="">
            <nav className="mx-[2vw] gap-y-5 lg:flex-row flex flex-col justify-between py-[3vh] lg:items-center">
                <Link
                    target="_blank"
                    href="https://www.pldkhoa.dev/"
                    className="text-[8vw] font-black uppercase -tracking-wider lg:text-[2vw]">
                    khoa phan
                </Link>
                <div className="flex flex-col gap-x-2 lg:flex-row lg:items-center">
                    <p>Built with:</p>
                    <Link
                        className="underline hover:no-underline"
                        href={"https://www.lummi.ai/"}>
                        Lumi Image
                    </Link>

                    <Link
                        className="underline hover:no-underline"
                        href={"https://next-transition-router.vercel.app/"}>
                        Next Transition Router
                    </Link>

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
