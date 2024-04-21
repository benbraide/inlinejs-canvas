import { CanvasParentElement } from "./parent";
export declare class CanvasGroupElement extends CanvasParentElement {
    constructor();
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasGroupCompact(): void;
