import { ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasParentElement } from "./parent";
export declare class CanvasTransformElement extends CanvasParentElement {
    constructor();
    FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected ComputeDisplacement_(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasPosition;
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected FindFigureWithPoint_(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    protected Translate_(ctx: CanvasRenderingContext2D | Path2D, position?: ICanvasPosition): void;
}
