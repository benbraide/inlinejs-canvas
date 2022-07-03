import { ICanvasPosition, ICanvasSize } from "../types";
import { CanvasParent } from "./parent";
export declare class CanvasAlign extends CanvasParent {
    constructor();
    OffsetPosition(position: ICanvasPosition): ICanvasPosition;
    protected GetParentSize_(): ICanvasSize;
}
export declare function CanvasAlignCompact(): void;
