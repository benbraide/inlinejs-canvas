import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasAlignElement } from "./align";
export class CanvasCenterElement extends CanvasAlignElement {
    constructor() {
        super();
    }
    GetAlignment_() {
        return {
            horizontal: 'center',
            vertical: 'center',
        };
    }
}
export function CanvasCenterCompact() {
    RegisterCustomElement(CanvasCenterElement, 'canvas-center');
}
