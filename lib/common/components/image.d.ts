import { IElementScope } from "@benbraide/inlinejs";
import { ICanvasSize } from "../types";
import { CanvasFullShapeElement } from "./full-shape";
export declare class CanvasImageElement extends CanvasFullShapeElement {
    protected object_: HTMLImageElement | null;
    protected size_: {
        width: string;
        height: string;
    };
    src: string;
    UpdateWidthProperty(value: string): void;
    UpdateHeightProperty(value: string): void;
    constructor();
    protected HandleElementScopeDestroyed_(scope: IElementScope): void;
    protected AttributeChanged_(name: string): void;
    protected ShouldRefreshOnChange_(name: string): boolean;
    protected Render_(ctx: CanvasRenderingContext2D | Path2D): void;
    protected ResolveSize_(): ICanvasSize;
    protected ResolvePart_(value: string, target: number): number;
}
export declare function CanvasImageCompact(): void;
