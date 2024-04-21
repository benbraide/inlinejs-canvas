import { ICanvasFigure, ICanvasPosition, ICanvasScaleValue } from "../types";
import { CanvasTransformElement } from "./transform";
export declare class CanvasScaleElement extends CanvasTransformElement {
    horizontal: number;
    vertical: number;
    constructor();
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): any;
    FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    GetTransformScale(): ICanvasScaleValue;
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasScaleCompact(): void;
