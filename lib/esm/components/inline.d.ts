import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { CanvasParentElement } from "./parent";
export declare class CanvasInlineElement extends CanvasParentElement {
    value: string;
    effect: boolean;
    private effectCalled_;
    constructor();
    protected HandleElementScopeCreatedPostfix_(params: IElementScopeCreatedCallbackParams): void;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasInlineCompact(): void;
