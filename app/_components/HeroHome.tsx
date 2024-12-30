"use client";

import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {Link} from "next-transition-router";
import Image from "next/image";
import {useRef} from "react";
import SplitType, {TargetElement} from "split-type";

const pages = ["layer", "slide", "pixel", "fade"];

export default function HeroHome() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const pageTitle = sectionRef.current!.querySelector(
                ".page-title"
            )! as TargetElement;
            const subpageTitle =
                sectionRef.current!.querySelectorAll(".subpage-title")!;

            const pageTitleSplit = new SplitType(pageTitle, {
                types: "lines,words,chars",
                lineClass: "overflow-hidden",
            });

            const tl = gsap.timeline({
                paused: true,
                defaults: {ease: "expo.out", duration: 1.5},
                delay: 1.5,
            });

            tl.set(pageTitle, {opacity: 1});
            tl.set(".subpage-image", {opacity: 1});
            tl.set(".subpage-divider", {
                opacity: 1,
                transformOrigin: "left",
            });

            tl.fromTo(
                pageTitleSplit.words,
                {
                    yPercent: 100,
                },
                {
                    yPercent: 0,
                    stagger: 0.05,
                }
            )
                .fromTo(
                    ".subpage-image",
                    {scale: 1.2, height: "0%"},
                    {scale: 1, height: "100%", stagger: 0.1},
                    "<"
                )
                .fromTo(
                    ".subpage-divider",
                    {scaleX: 0},
                    {scaleX: 1, stagger: 0.1},
                    "<"
                )
                .fromTo(
                    subpageTitle,
                    {y: 20, opacity: 0},
                    {y: 0, opacity: 1, stagger: 0.1},
                    "<"
                );

            tl.play();
        },
        {scope: sectionRef}
    );
    return (
        <section
            className="flex min-h-svh flex-col justify-end overflow-hidden pb-[2vw] pt-[6vw] lg:min-h-screen"
            ref={sectionRef}>
            <h1 className="page-title mb-[3vw] max-w-6xl overflow-hidden font-roboto text-[6vw] uppercase leading-none opacity-0">
                A digital design studio driven by research & strategy
            </h1>

            <div className="grid grid-cols-4 gap-[1vw]">
                {pages.map((page, index) => {
                    const imageUrl = `/${index + 1}.jpeg`;
                    return (
                        <Link href={`/${page}`} key={index} className="group">
                            <div className="relative aspect-square overflow-hidden transition-all duration-500 group-hover:rounded-[50%]">
                                <Image
                                    src={imageUrl}
                                    alt={page}
                                    fill
                                    sizes="25vw"
                                    className="subpage-image h-0 object-cover opacity-0"
                                />
                            </div>
                            <div className="subpage-divider bg-charleston-green my-3 h-px w-full scale-x-0 opacity-0"></div>
                            <div className="subpage-title font-roboto text-[1.2vw] uppercase opacity-0">
                                {page} Effect
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
