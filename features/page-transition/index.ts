import {layerEnter, layerLeave} from "./layer";
import {slideEnter, slideLeave} from "./slide";

export type TransitionType = "layer" | "slide" | "";

const getTransitionFunctions = (transitionType: TransitionType) => {
    switch (transitionType) {
        case "layer":
            return {enter: layerEnter, leave: layerLeave};

        case "slide":
            return {enter: slideEnter, leave: slideLeave};

        default:
            return {enter: () => {}, leave: () => {}};
    }
};

export default getTransitionFunctions;
