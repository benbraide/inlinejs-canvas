import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";
export class CanvasLineElement extends CanvasShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        ctx.lineTo(position.x, position.y);
    }
}
export function CanvasLineCompact() {
    RegisterCustomElement(CanvasLineElement, 'canvas-line');
}
