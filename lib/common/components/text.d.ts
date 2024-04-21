import { ICanvasPosition, ICanvasSize } from "../types";
import { CanvasFullShapeElement } from "./full-shape";
import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
export declare class CanvasTextElement extends CanvasFullShapeElement {
    protected observer_: globalThis.MutationObserver | null;
    protected font_: string;
    protected size_: ICanvasSize | null;
    fontFamily: string;
    fontSize: string;
    fontStyle: string;
    fontWeight: string;
    lineHeight: string;
    align: CanvasTextAlign;
    baseline: CanvasTextBaseline;
    direction: CanvasDirection;
    value: string;
    cache: boolean;
    constructor();
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): boolean;
    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: (() => void) | undefined): void;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected AttributeChanged_(name: string): void;
    protected ShouldRefreshOnChange_(name: string): boolean;
    protected ApplyStyles_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected ComputeFont_(): string;
    protected ComputeValue_(): string;
}
export declare function CanvasTextCompact(): void;
