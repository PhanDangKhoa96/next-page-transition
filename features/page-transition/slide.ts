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

const getColumns = (element: HTMLDivElement) => {
    const columns = element.querySelectorAll(".column")!;

    return columns;
};

export const slideLeave = (
    next: () => void,
    element: HTMLDivElement | null
) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const columns = getColumns(element);
        const pageTitleSplit = getPageTitle(element);

        gsap.set(pageTitleSplit.words, {opacity: 1});
        gsap.set(element, {opacity: 1, pointerEvents: "auto"});

        gsap.timeline({
            onComplete: next,
            defaults: {ease: "power1.inOut", duration: 0.7},
        })
            .fromTo(
                columns,
                {
                    scaleX: 0,
                    transformOrigin: "left",
                },
                {
                    scaleX: 1.1,
                    stagger: 0.05,
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

export const slideEnter = (
    next: () => void,
    element: HTMLDivElement | null
) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const columns = getColumns(element);
        const pageTitleSplit = getPageTitle(element);
        gsap.set(element, {opacity: 1, pointerEvents: "auto"});

        gsap.timeline({
            defaults: {ease: "power1.inOut", duration: 0.7},
            onComplete: () => {
                gsap.set(element, {pointerEvents: "none"});
                next();
            },
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
                columns,
                {scaleX: 1.1},
                {
                    scaleX: 0,
                    stagger: 0.05,
                    transformOrigin: "right",
                }
            )
            .fromTo(element, {opacity: 1}, {opacity: 0});
    }, element);

    return () => {
        ctx.revert();
    };
};
