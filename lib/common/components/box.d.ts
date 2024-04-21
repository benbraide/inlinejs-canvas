import { ICanvasFigure, ICanvasPosition, ICanvasSize } from "../types";
import { CanvasParentElement } from "./parent";
export declare class CanvasBoxElement extends CanvasParentElement {
    width: number;
    height: number;
    constructor();
    FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasBoxCompact(): void;
