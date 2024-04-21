import { ICanvasAlignment } from "../types";
import { CanvasAlignElement } from "./align";
export declare class CanvasCenterElement extends CanvasAlignElement {
    constructor();
    protected GetAlignment_(): ICanvasAlignment;
}
export declare function CanvasCenterCompact(): void;
