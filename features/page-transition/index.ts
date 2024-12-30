import {layerEnter, layerLeave} from "./layer";
import {pixelEnter, pixelLeave} from "./pixel";
import {slideEnter, slideLeave} from "./slide";

export type TransitionType = "layer" | "slide" | "pixel" | "";

const getTransitionFunctions = (transitionType: TransitionType) => {
    switch (transitionType) {
        case "layer":
            return {enter: layerEnter, leave: layerLeave};

        case "slide":
            return {enter: slideEnter, leave: slideLeave};

        case "pixel":
            return {enter: pixelEnter, leave: pixelLeave};

        default:
            return {enter: () => {}, leave: () => {}};
    }
};

export default getTransitionFunctions;
