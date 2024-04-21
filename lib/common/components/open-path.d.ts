import { CanvasPaintModeType } from "../types";
import { CanvasParentElement } from "./parent";
export declare class CanvasOpenPathElement extends CanvasParentElement {
    mode: CanvasPaintModeType;
    color: string;
    close: boolean;
    lineWidth: number;
    lineCap: CanvasLineCap;
    lineJoin: CanvasLineJoin;
    constructor();
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected Project_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasOpenPathCompact(): void;
