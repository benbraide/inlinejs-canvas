import { CanvasParentElement } from "./parent";
import { ICanvasFigure, ICanvasPosition } from "../types";
export declare class CanvasRelativeElement extends CanvasParentElement {
    direction: 'row' | 'column';
    GetPosition(): ICanvasPosition;
    GetOffsetPosition(ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected OffsetPosition_(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected ApplyOffset_(position: ICanvasPosition, ctx?: CanvasRenderingContext2D): ICanvasPosition;
}
export declare function CanvasRelativeCompact(): void;
