import { CanvasPathElement } from "./path";
export declare class CanvasRoundRectElement extends CanvasPathElement {
    width: number;
    height: number;
    radius: number;
    constructor();
    protected Draw_(): void;
}
export declare function CanvasRoundRectCompact(): void;
