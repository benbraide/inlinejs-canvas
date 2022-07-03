import { ICanvasComponent, ICanvasSize } from "../types";
import { CanvasAttributed } from "./attributed";
export declare class CanvasSurface extends CanvasAttributed<HTMLCanvasElement> implements ICanvasComponent {
    private ctx_;
    private withMouse_;
    private mouseOffset_;
    private rendered_;
    private queued_;
    constructor();
    GetComponentChildren(): ICanvasComponent[];
    Render(): void;
    Refresh(): void;
    GetSize(): ICanvasSize;
    GetNative(): HTMLCanvasElement | undefined;
    protected AttributeChanged_(name: string): void;
    private FindWithMouse_;
    private UpdateWithMouse_;
    private RemoveWithMouse_;
}
export declare function CanvasSurfaceCompact(): void;
