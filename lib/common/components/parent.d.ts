import { ICanvasPosition, ICanvasSize } from "../types";
import { CanvasShape } from "./shape";
export declare class CanvasParent extends CanvasShape {
    constructor(state?: Record<string, any>);
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): import("../types").ICanvasFigure | null;
    OffsetPosition(position: ICanvasPosition): ICanvasPosition;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected OffsetPosition_(position: ICanvasPosition): ICanvasPosition;
    protected GetChildSize_(ctx: CanvasRenderingContext2D | null): ICanvasSize;
}
