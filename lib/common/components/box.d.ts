import { ICanvasSize } from "../types";
import { CanvasParent } from "./parent";
export declare class CanvasBox extends CanvasParent {
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasBoxCompact(): void;
