import { CanvasFullShapeElement } from "./full-shape";
import { RegisterCustomElement } from "@benbraide/inlinejs-element";
export class CanvasRectElement extends CanvasFullShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetUnscaledOffsetPosition_();
        if (this.mode === 'stroke' && 'strokeRect' in ctx) {
            ctx.strokeRect(position.x, position.y, this.width, this.height);
        }
        else if (this.mode !== 'stroke' && 'fillRect' in ctx) {
            ctx.fillRect(position.x, position.y, this.width, this.height);
        }
        else if ('rect' in ctx) {
            ctx.rect(position.x, position.y, this.width, this.height);
        }
    }
}
export function CanvasRectCompact() {
    RegisterCustomElement(CanvasRectElement, 'canvas-rect');
}
