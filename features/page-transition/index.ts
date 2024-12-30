import {layerEnter, layerLeave} from "./layer";
import {pixelEnter, pixelLeave} from "./pixel";
import {slideEnter, slideLeave} from "./slide";
import {zoomEnter, zoomLeave} from "./zoom";

export type TransitionType = "layer" | "slide" | "pixel" | "zoom" | "";

const getTransitionFunctions = (transitionType: TransitionType) => {
    switch (transitionType) {
        case "layer":
            return {enter: layerEnter, leave: layerLeave};

        case "slide":
            return {enter: slideEnter, leave: slideLeave};

        case "pixel":
            return {enter: pixelEnter, leave: pixelLeave};

        case "zoom":
            return {enter: zoomEnter, leave: zoomLeave};

        default:
            return {enter: () => {}, leave: () => {}};
    }
};

export default getTransitionFunctions;
