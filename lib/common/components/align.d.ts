import { ICanvasPosition } from "../types";
import { CanvasParent } from "./parent";
export declare class CanvasAlign extends CanvasParent {
    constructor();
    OffsetPosition(position: ICanvasPosition): ICanvasPosition;
}
export declare function CanvasAlignCompact(): void;
