import { CanvasShapeElement } from "./shape";
export declare class CanvasClosePathElement extends CanvasShapeElement {
    constructor();
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasClosePathCompact(): void;
