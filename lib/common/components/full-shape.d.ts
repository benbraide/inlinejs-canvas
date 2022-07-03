import { ICanvasPosition } from "../types";
import { CanvasShape } from "./shape";
export declare class CanvasFullShape extends CanvasShape {
    constructor(state?: Record<string, any>);
    ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): boolean;
    protected Paint_(ctx: CanvasRenderingContext2D | Path2D): void;
}
