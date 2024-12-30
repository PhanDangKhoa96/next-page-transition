"use client";

import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {Link} from "next-transition-router";
import Image from "next/image";
import React, {useRef} from "react";
import SplitType, {TargetElement} from "split-type";

export default function HeroDetail() {
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
            className="mx-[2vw] flex min-h-svh flex-col justify-between pb-[2vw] pt-[6vw] lg:min-h-screen">
            <Link href="/">Back</Link>
            <div>
                <div className="mb-[4vw]">
                    <h1 className="page-title mb-3 overflow-hidden font-grotesk text-[5vw] uppercase leading-none opacity-0">
                        Hello world
                    </h1>

                    <div className="divider my-[1vw] h-px w-40 bg-black opacity-0"></div>
                    <div className="grid grid-cols-2 gap-5">
                        <p className="description max-w-xl opacity-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusantium cumque delectus harum tempore
                            tempora quo in enim! Fugit, dicta dolore.
                        </p>

                        <ul className="list text-sm font-light uppercase">
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

                <div className="relative h-[50vh] overflow-hidden">
                    <Image
                        src={"/1.jpeg"}
                        alt="Detail image"
                        fill
                        className="rotate-[3deg] scale-[1.2] object-cover opacity-0"
                    />
                </div>
            </div>
        </section>
    );
}
