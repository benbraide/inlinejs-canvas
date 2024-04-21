import { ICanvasSize } from "../types";
import { CanvasPathElement } from "./path";
export declare class CanvasCircleElement extends CanvasPathElement {
    radius: number;
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetRadius(): number;
    protected Fill_(): void;
}
export declare function CanvasCircleCompact(): void;
