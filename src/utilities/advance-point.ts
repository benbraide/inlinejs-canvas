import { ICanvasPosition } from "../types";

export function AdvancePoint(point: ICanvasPosition, angle: number, distance: number): ICanvasPosition{
    return {
        x: (point.x + (distance * Math.cos(angle))),
        y: (point.y + (distance * Math.sin(angle))),
    };
}
