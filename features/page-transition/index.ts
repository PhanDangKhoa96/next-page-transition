import {layerEnter, layerLeave} from "./layer";

export type TransitionType = "layer" | "";

const getTransitionFunctions = (transitionType: TransitionType) => {
    switch (transitionType) {
        case "layer":
            return {enter: layerEnter, leave: layerLeave};

        default:
            return {enter: () => {}, leave: () => {}};
    }
};

export default getTransitionFunctions;
