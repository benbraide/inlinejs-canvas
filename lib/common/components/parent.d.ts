import { ICanvasFigure, ICanvasPosition, ICanvasSize } from "../types";
import { CanvasShapeElement } from "./shape";
export declare class CanvasParentElement extends CanvasShapeElement {
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected OffsetPosition_(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected GetChildSize_(ctx: CanvasRenderingContext2D | null): ICanvasSize;
}
