import { CanvasAlignmentType, ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasTransformElement } from "./transform";
export declare class CanvasRotateElement extends CanvasTransformElement {
    angle: string;
    horizontalOrigin: CanvasAlignmentType;
    verticalOrigin: CanvasAlignmentType;
    constructor();
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected ComputeDisplacement_(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasPosition;
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected GetOriginPoint_(ctx: CanvasRenderingContext2D | null): {
        x: number;
        y: number;
    };
}
export declare function CanvasRotateCompact(): void;
