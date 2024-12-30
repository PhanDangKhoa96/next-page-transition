"use client";

import getTransitionFunctions, {
    TransitionType,
} from "@/features/page-transition";
import {TransitionRouter} from "next-transition-router";
import {useRef} from "react";

export function TransitionProvider({children}: {children: React.ReactNode}) {
    const target = useRef<HTMLDivElement | null>(null);
    const simpleLayer = useRef<HTMLDivElement | null>(null);
    const slideLayer = useRef<HTMLDivElement | null>(null);
    const pixelLayer = useRef<HTMLDivElement | null>(null);
    const zoomLayer = useRef<HTMLDivElement | null>(null);

    const transitionType = useRef<TransitionType>("");

    const leave = (next: () => void, from?: string, to?: string) => {
        if (from?.includes("layer") || to?.includes("layer")) {
            transitionType.current = "layer";
            target.current = simpleLayer.current;
        }

        if (from?.includes("slide") || to?.includes("slide")) {
            transitionType.current = "slide";
            target.current = slideLayer.current;
        }

        if (from?.includes("pixel") || to?.includes("pixel")) {
            transitionType.current = "pixel";
            target.current = pixelLayer.current;
        }

        if (from?.includes("zoom") || to?.includes("zoom")) {
            transitionType.current = "zoom";
            target.current = zoomLayer.current;
        }

        return getTransitionFunctions(transitionType.current).leave(
            next,
            target.current
        );
    };

    const enter = (next: () => void) => {
        if (!transitionType.current) {
            return;
        }
        return getTransitionFunctions(transitionType.current).enter(
            next,
            target.current
        );
    };

    return (
        <TransitionRouter auto={true} leave={leave} enter={enter}>
            <main>{children}</main>

            {/* Layer transition */}
            <div
                ref={simpleLayer}
                className="fixed inset-0 z-50 -translate-y-full">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none">
                    <path
                        className="fill-charleston-green"
                        vectorEffect="non-scaling-stroke"
                        d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
                    />
                </svg>

                <div className="absolute inset-0 grid place-items-center">
                    <h1 className="page-title overflow-hidden font-roboto text-[5vw] uppercase text-white">
                        Layer Effect
                    </h1>
                </div>
            </div>

            {/* Slide transition */}
            <div
                ref={slideLayer}
                className="fixed inset-0 z-50 overflow-hidden opacity-0 pointer-events-none">
                <div className="grid h-full w-full grid-cols-12">
                    {[...Array(12)].map((_, i) => (
                        <div className="relative h-full w-full" key={i}>
                            {/* 101% to remove anti aliasing */}
                            <div className="bg-charleston-green w-[101%)] column absolute inset-0"></div>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 grid place-items-center">
                    <h1 className="page-title overflow-hidden font-roboto text-[5vw] uppercase text-white">
                        Slide Effect
                    </h1>
                </div>
            </div>

            {/* Pixel transition */}
            <div
                ref={pixelLayer}
                className="pointer-events-none fixed inset-0 z-50 opacity-0">
                <div className="grid h-full w-full grid-cols-12 grid-rows-12">
                    {[...Array(12 * 12)].map((_, i) => (
                        <div
                            className="bg-charleston-green box h-full w-full"
                            key={i}></div>
                    ))}
                </div>

                <div className="absolute inset-0 grid place-items-center">
                    <h1 className="page-title overflow-hidden font-roboto text-[5vw] uppercase text-white">
                        Pixel Effect
                    </h1>
                </div>
            </div>

            {/* Layer transition */}
            <div
                ref={zoomLayer}
                className="bg-charleston-green fixed inset-0 z-50 translate-y-full">
                <div className="absolute inset-0 grid place-items-center">
                    <h1 className="page-title overflow-hidden font-roboto text-[5vw] uppercase text-white">
                        Zoom Effect
                    </h1>
                </div>
            </div>
        </TransitionRouter>
    );
}
