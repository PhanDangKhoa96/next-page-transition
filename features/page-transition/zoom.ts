import gsap from "gsap";
import SplitType, {TargetElement} from "split-type";

const getPageTitle = (element: HTMLDivElement) => {
    const pageTitle = element.querySelector(".page-title")! as TargetElement;
    const pageTitleSplit = new SplitType(pageTitle, {
        types: "words,chars",
        wordClass: "overflow-hidden",
    });

    return pageTitleSplit;
};

const getMainTag = () => {
    const main = document.querySelector("main");

    return main;
};

export const zoomLeave = (next: () => void, element: HTMLDivElement | null) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const pageTitleSplit = getPageTitle(element);
        const main = getMainTag();

        gsap.set(pageTitleSplit.words, {opacity: 1});

        gsap.timeline({
            onComplete: next,
            defaults: {ease: "power1.inOut", duration: 0.5},
        })
            .fromTo(
                main,
                {
                    scale: 1,
                    backgroundColor: "white",
                    filter: "brightness(1)",
                },
                {scale: 0.9, filter: "brightness(0.7)"}
            )
            .fromTo(
                element,
                {y: "100%"},
                {
                    y: 0,
                },
                "<50%"
            )
            .fromTo(
                pageTitleSplit.words,
                {yPercent: -100},
                {yPercent: 0, stagger: 0.1}
            );
    }, element);

    return () => {
        ctx.revert();
    };
};

export const zoomEnter = (next: () => void, element: HTMLDivElement | null) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const pageTitleSplit = getPageTitle(element);
        const main = getMainTag();

        gsap.timeline({
            defaults: {ease: "power1.inOut", duration: 0.5},
            onComplete: next,
        })
            .fromTo(
                pageTitleSplit.words,
                {yPercent: 0},
                {
                    yPercent: 150,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.inOut",
                }
            )
            .fromTo(
                element,
                {y: 0},
                {
                    y: "100%",
                }
            )
            .fromTo(
                main,
                {
                    scale: 0.9,
                    backgroundColor: "white",
                    filter: "brightness(0.7)",
                },
                {scale: 1, filter: "brightness(1)"},
                "<50%"
            );
    }, element);

    return () => {
        ctx.revert();
    };
};
