import { CanvasFullShapeElement } from "./full-shape";
export declare class CanvasRectElement extends CanvasFullShapeElement {
    constructor();
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasRectCompact(): void;
