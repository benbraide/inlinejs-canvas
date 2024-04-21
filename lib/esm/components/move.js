import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";
export class CanvasMoveElement extends CanvasShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetUnscaledOffsetPosition_();
        ctx.moveTo(position.x, position.y);
    }
}
export function CanvasMoveCompact() {
    RegisterCustomElement(CanvasMoveElement, 'canvas-move');
}
