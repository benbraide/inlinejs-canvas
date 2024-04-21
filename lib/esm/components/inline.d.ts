import { CanvasParentElement } from "./parent";
export declare class CanvasInlineElement extends CanvasParentElement {
    value: string;
    effect: boolean;
    constructor();
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasInlineCompact(): void;
