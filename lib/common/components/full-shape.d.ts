import { CanvasPaintModeType } from "../types";
import { CanvasShapeElement } from "./shape";
export declare class CanvasFullShapeElement extends CanvasShapeElement {
    width: number;
    height: number;
    mode: CanvasPaintModeType;
    color: string;
    lineWidth: number;
    lineCap: CanvasLineCap;
    lineJoin: CanvasLineJoin;
    constructor();
    protected Paint_(ctx: CanvasRenderingContext2D | Path2D): void;
}
