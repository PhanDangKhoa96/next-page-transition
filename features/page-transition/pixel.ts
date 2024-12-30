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

const getBoxes = (element: HTMLDivElement) => {
    const boxes = element.querySelectorAll(".box")!;

    return boxes;
};

export const pixelLeave = (
    next: () => void,
    element: HTMLDivElement | null
) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const boxes = getBoxes(element);
        const pageTitleSplit = getPageTitle(element);

        gsap.set(pageTitleSplit.words, {opacity: 1});

        gsap.timeline({
            onComplete: next,
            defaults: {ease: "power1.inOut", duration: 0.5},
        })
            .fromTo(element, {opacity: 0}, {opacity: 1, pointerEvents: "auto"})
            .fromTo(
                boxes,
                {
                    scale: 0,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: {
                        grid: [12, 12],
                        each: 0.05,
                        from: "start",
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

export const pixelEnter = (
    next: () => void,
    element: HTMLDivElement | null
) => {
    if (!element) {
        return;
    }

    const ctx = gsap.context(() => {
        const boxes = getBoxes(element);
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
                boxes,
                {
                    scale: 1,
                    opacity: 1,
                },
                {
                    scale: 0,
                    opacity: 0,
                    stagger: {
                        grid: [12, 12],
                        each: 0.05,
                        from: "end",
                    },
                }
            )
            .to(element, {
                opacity: 0,
            });
    }, element);

    return () => {
        ctx.revert();
    };
};
