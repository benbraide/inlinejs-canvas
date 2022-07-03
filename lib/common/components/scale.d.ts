import { ICanvasPosition, ICanvasScaleValue } from "../types";
import { CanvasTransform } from "./transform";
export declare class CanvasScale extends CanvasTransform {
    constructor();
    OffsetPosition(position: ICanvasPosition): ICanvasPosition;
    FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): import("../types").ICanvasFigure | null;
    GetTransformScale(): ICanvasScaleValue;
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasScaleCompact(): void;
