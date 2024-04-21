import { ICanvasSize } from "../types";
import { CanvasPathElement } from "./path";
export declare class CanvasEllipseElement extends CanvasPathElement {
    xRadius: number;
    yRadius: number;
    angle: string;
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    protected Fill_(): void;
}
export declare function CanvasEllipseCompact(): void;
