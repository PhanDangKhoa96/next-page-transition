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

const getPath = (element: HTMLDivElement) => {
    const path = element.querySelector("path")!;

    return path;
};

export const layerLeave = (
    next: () => void,
    element: HTMLDivElement | null
) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const path = getPath(element);
        const pageTitleSplit = getPageTitle(element);

        gsap.set(pageTitleSplit.words, {opacity: 1});

        gsap.timeline({
            onComplete: next,
            defaults: {ease: "power1.inOut", duration: 0.5},
        })
            .fromTo(
                element,
                {y: "-100%"},
                {
                    y: 0,
                }
            )
            .fromTo(
                path,
                {
                    attr: {
                        d: "M 0 0 V 70 Q 50 100 100 70 V 0 z",
                    },
                },
                {
                    attr: {
                        d: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
                    },
                },
                "<0.25"
            )
            .fromTo(
                pageTitleSplit.words,
                {yPercent: 150},
                {yPercent: 0, stagger: 0.1}
            );
    }, element);

    return () => {
        ctx.revert();
    };
};

export const layerEnter = (
    next: () => void,
    element: HTMLDivElement | null
) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const path = getPath(element);
        const pageTitleSplit = getPageTitle(element);

        gsap.timeline({
            defaults: {ease: "power1.inOut", duration: 0.5},
            onComplete: next,
        })
            .fromTo(
                pageTitleSplit.words,
                {yPercent: 0},
                {
                    yPercent: -100,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.inOut",
                }
            )
            .fromTo(
                path,
                {
                    attr: {
                        d: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
                    },
                },
                {
                    attr: {
                        d: "M 0 0 V 25 Q 50 0 100 25 V 0 z",
                    },
                    ease: "power1.in",
                    duration: 0.4,
                }
            )
            .to(path, {
                attr: {
                    d: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
                },
                ease: "power2.out",
                duration: 0.4,
            })
            .fromTo(
                element,
                {y: 0},
                {
                    y: "-100%",
                },
                "<50%"
            );
    }, element);

    return () => {
        ctx.revert();
    };
};
