import { ICanvasPosition } from "../types";

export function RotatePoint(point: ICanvasPosition, angle: number): ICanvasPosition{
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: (point.x * cos) + (point.y * sin),
        y: (point.y * cos) - (point.x * sin),
    };
}
