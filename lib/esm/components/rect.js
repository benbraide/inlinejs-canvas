import { CanvasFullShapeElement } from "./full-shape";
import { RegisterCustomElement } from "@benbraide/inlinejs-element";
export class CanvasRectElement extends CanvasFullShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetUnscaledOffsetPosition_();
        if (!('fillRect' in ctx)) { // Must be Path2D
            ctx.rect(position.x, position.y, this.width, this.height);
            return;
        }
        (this.mode === 'fill' || this.mode === 'both') && ctx.fillRect(position.x, position.y, this.width, this.height);
        (this.mode === 'stroke' || this.mode === 'both') && ctx.strokeRect(position.x, position.y, this.width, this.height);
    }
}
export function CanvasRectCompact() {
    RegisterCustomElement(CanvasRectElement, 'canvas-rect');
}
