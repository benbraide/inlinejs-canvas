import { ICanvasSize } from "../types";
import { CanvasParent } from "./parent";
export declare class CanvasBox extends CanvasParent {
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
}
export declare function CanvasBoxCompact(): void;
