import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";
export class CanvasClosePathElement extends CanvasShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        ctx.closePath();
    }
}
export function CanvasClosePathCompact() {
    RegisterCustomElement(CanvasClosePathElement, 'canvas-close-path');
}
