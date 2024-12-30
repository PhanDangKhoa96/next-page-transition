"use client";

import getTransitionFunctions, {
    TransitionType,
} from "@/features/page-transition";
import {TransitionRouter} from "next-transition-router";
import {useRef} from "react";

export function TransitionProvider({children}: {children: React.ReactNode}) {
    const target = useRef<HTMLDivElement | null>(null);
    const simpleLayer = useRef<HTMLDivElement | null>(null);
    const transitionType = useRef<TransitionType>("");

    const leave = (next: () => void, from?: string, to?: string) => {
        console.log("from,to", from, to);
        if (from?.includes("layer") || to?.includes("layer")) {
            transitionType.current = "layer";
            target.current = simpleLayer.current;
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
        </TransitionRouter>
    );
}
