import { CanvasAlignmentType, ICanvasAlignment, ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasParentElement } from "./parent";
export declare class CanvasAlignElement extends CanvasParentElement {
    horizontal: CanvasAlignmentType;
    vertical: CanvasAlignmentType;
    group: boolean;
    constructor();
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    protected GetAlignment_(): ICanvasAlignment;
}
export declare function CanvasAlignCompact(): void;
