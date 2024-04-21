import { ICanvasFigure, CanvasPaintModeType, ICanvasPosition } from "../types";
import { CanvasParentElement } from "./parent";
export declare class CanvasPathElement extends CanvasParentElement {
    protected ctx_: Path2D | null;
    mode: CanvasPaintModeType;
    color: string;
    close: boolean;
    lineWidth: number;
    lineCap: CanvasLineCap;
    lineJoin: CanvasLineJoin;
    constructor();
    ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): boolean;
    FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    GetContext(): CanvasRenderingContext2D | Path2D | null;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected Fill_(): void;
    protected Draw_(): void;
    protected Project_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasPathCompact(): void;
