"use client";

import {pages} from "@/data/pages";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {Link} from "next-transition-router";
import Image from "next/image";
import React, {useRef} from "react";
import SplitType, {TargetElement} from "split-type";

interface PageContentType {
    pageContent?: (typeof pages)[number];
}

export default function DetailPage({pageContent}: PageContentType) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const pageTitle = sectionRef.current!.querySelector(
                ".page-title"
            )! as TargetElement;
            const desc = sectionRef.current!.querySelector(
                ".description"
            )! as TargetElement;

            const pageTitleSplit = new SplitType(pageTitle, {
                types: "lines,words,chars",
                lineClass: "overflow-hidden",
            });

            const descSplit = new SplitType(desc, {
                types: "lines,words,chars",
                lineClass: "overflow-hidden",
            });

            const tl = gsap.timeline({
                paused: true,
                defaults: {ease: "expo.out", duration: 1.5},
                delay: 1.5,
            });

            tl.set([pageTitle, desc], {opacity: 1});
            tl.set(".subpage-image", {opacity: 1});
            tl.set(".divider", {
                opacity: 1,
                transformOrigin: "left",
            });

            tl.fromTo(
                [pageTitleSplit.words, descSplit.words],
                {
                    yPercent: 100,
                },
                {
                    yPercent: 0,
                    stagger: 0.05,
                }
            )
                .fromTo(".divider", {scaleX: 0}, {scaleX: 1, stagger: 0.1}, "<")
                .fromTo(".list li span", {y: "100%"}, {y: 0, stagger: 0.1}, "<")
                .to("img", {scale: 1, opacity: 1, rotate: 0}, "<");

            tl.play();
        },
        {scope: sectionRef}
    );

    return (
        <section
            ref={sectionRef}
            className="mx-[2vw] flex flex-col items-start justify-between gap-y-12 pb-[5vw] lg:gap-y-20 lg:pb-[2vw]">
            <Link
                href="/"
                className="inline-flex items-center gap-x-3 font-light uppercase">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-10"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M5.5 8.5L2 12l3.5 3.5l.707-.707L3.914 12.5H22v-1H3.914l2.293-2.293L5.5 8.5Z"></path>
                </svg>
                Back to homepage
            </Link>
            <div className="w-full">
                <div className="mb-[4vw]">
                    <h1 className="page-title mb-3 overflow-hidden font-grotesk text-[8vw] uppercase leading-none opacity-0 lg:text-[5vw]">
                        {pageContent?.title}
                    </h1>

                    <div className="divider my-[2vh] h-px w-20 bg-black opacity-0 lg:my-[1vw] lg:w-40"></div>
                    <div className="grid gap-5 lg:grid-cols-2">
                        <p className="description max-w-xl opacity-0">
                            {pageContent?.description}
                        </p>

                        <ul className="list flex justify-between text-sm font-light uppercase lg:block">
                            <li className="overflow-hidden">
                                <span className="inline-block">Research</span>
                            </li>
                            <li className="overflow-hidden">
                                <span className="inline-block">Strategy</span>
                            </li>
                            <li className="overflow-hidden">
                                <span className="inline-block">Design</span>
                            </li>
                            <li className="overflow-hidden">
                                <span className="inline-block">
                                    Development
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="relative h-[50vh] w-full overflow-hidden">
                    <Image
                        src={pageContent?.image || "/1.jpeg"}
                        alt="Detail image"
                        fill
                        sizes="100vw"
                        priority
                        className="rotate-[3deg] scale-[1.2] object-cover opacity-0"
                    />
                </div>
            </div>
        </section>
    );
}
