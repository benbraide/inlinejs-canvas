import { ICanvasPosition } from "../types";

export function ComputeDisplacement(from: ICanvasPosition, to: ICanvasPosition): ICanvasPosition{
    return {
        x: (to.x - from.x),
        y: (to.y - from.y),
    };
}
