import { CanvasFullShapeElement } from "./full-shape";
export declare class CanvasArcElement extends CanvasFullShapeElement {
    radius: number;
    constructor();
    protected Paint_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasArcCompact(): void;
