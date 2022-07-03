import { ICanvasSize } from "../types";
import { CanvasPath } from "./path";
export declare class CanvasCircle extends CanvasPath {
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    protected Fill_(): void;
}
export declare function CanvasCircleCompact(): void;