import { ICanvasPosition } from "../types";

export function RotatePoint(point: ICanvasPosition, angle: number): ICanvasPosition{
    return {
        x: ((Math.cos((2 * Math.PI) - angle) * point.x) - (Math.sin((2 * Math.PI) - angle) * point.y)),
        y: ((Math.sin((2 * Math.PI) - angle) * point.x) + (Math.cos((2 * Math.PI) - angle) * point.y)),
    };
}
